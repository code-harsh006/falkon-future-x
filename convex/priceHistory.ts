import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByProject = query({
  args: {
    projectId: v.id("projects"),
    interval: v.union(
      v.literal("1D"),
      v.literal("1W"),
      v.literal("1M"),
      v.literal("3M"),
      v.literal("1Y"),
      v.literal("ALL")
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const intervalMs: Record<string, number> = {
      "1D": 24 * 60 * 60 * 1000,
      "1W": 7 * 24 * 60 * 60 * 1000,
      "1M": 30 * 24 * 60 * 60 * 1000,
      "3M": 90 * 24 * 60 * 60 * 1000,
      "1Y": 365 * 24 * 60 * 60 * 1000,
      ALL: 5 * 365 * 24 * 60 * 60 * 1000,
    };

    const since = now - intervalMs[args.interval];

    return await ctx.db
      .query("priceHistory")
      .withIndex("by_project_time", (q) =>
        q.eq("projectId", args.projectId).gte("timestamp", since)
      )
      .order("asc")
      .collect();
  },
});

export const recordPrice = mutation({
  args: {
    projectId: v.id("projects"),
    price: v.number(),
    volume: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("priceHistory", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

export const getLatest = query({
  args: { projectIds: v.array(v.id("projects")) },
  handler: async (ctx, args) => {
    const results = await Promise.all(
      args.projectIds.map(async (projectId) => {
        const latest = await ctx.db
          .query("priceHistory")
          .withIndex("by_project", (q) => q.eq("projectId", projectId))
          .order("desc")
          .first();

        return {
          projectId,
          price: latest?.price ?? 0,
          timestamp: latest?.timestamp ?? 0,
        };
      })
    );

    return results;
  },
});