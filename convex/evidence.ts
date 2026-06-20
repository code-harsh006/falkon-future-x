import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("evidence")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

export const upload = mutation({
  args: {
    projectId: v.id("projects"),
    uploadedBy: v.id("users"),
    type: v.union(
      v.literal("photo"),
      v.literal("document"),
      v.literal("gps"),
      v.literal("video")
    ),
    url: v.string(),
    caption: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const evidenceId = await ctx.db.insert("evidence", {
      ...args,
      createdAt: Date.now(),
    });

    // Update project evidence count
    const project = await ctx.db.get(args.projectId);
    if (project) {
      await ctx.db.patch(args.projectId, {
        evidenceCount: project.evidenceCount + 1,
        updatedAt: Date.now(),
      });
    }

    return evidenceId;
  },
});