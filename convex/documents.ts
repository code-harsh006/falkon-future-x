import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByUser = query({
  args: {
    userId: v.id("users"),
    type: v.optional(
      v.union(
        v.literal("certificate"),
        v.literal("epr_doc"),
        v.literal("contract"),
        v.literal("photo"),
        v.literal("report"),
        v.literal("other")
      )
    ),
  },
  handler: async (ctx, args) => {
    let q = ctx.db
      .query("documents")
      .withIndex("by_user", (idx) => idx.eq("userId", args.userId));

    if (args.type) {
      const docs = await q.collect();
      return docs.filter((d) => d.type === args.type);
    }

    return await q.order("desc").collect();
  },
});

export const getByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();
  },
});

export const upload = mutation({
  args: {
    userId: v.id("users"),
    projectId: v.optional(v.id("projects")),
    name: v.string(),
    type: v.union(
      v.literal("certificate"),
      v.literal("epr_doc"),
      v.literal("contract"),
      v.literal("photo"),
      v.literal("report"),
      v.literal("other")
    ),
    fileUrl: v.string(),
    fileSize: v.number(),
    mimeType: v.string(),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const docId = await ctx.db.insert("documents", {
      ...args,
      createdAt: Date.now(),
    });

    await ctx.db.insert("activities", {
      userId: args.userId,
      type: "document_uploaded",
      title: "Document uploaded",
      description: `${args.name} (${args.type})`,
      metadata: { documentId: docId },
      createdAt: Date.now(),
    });

    return docId;
  },
});

export const remove = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.documentId);
    if (!doc) throw new Error("Document not found");
    await ctx.db.delete(args.documentId);
  },
});

export const getCount = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const docs = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    return docs.length;
  },
});
