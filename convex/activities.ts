import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByUser = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const activities = await ctx.db
      .query("activities")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return args.limit ? activities.slice(0, args.limit) : activities;
  },
});

export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const activities = await ctx.db
      .query("activities")
      .withIndex("by_created")
      .order("desc")
      .collect();

    return args.limit ? activities.slice(0, args.limit) : activities;
  },
});

export const log = mutation({
  args: {
    userId: v.id("users"),
    type: v.string(),
    title: v.string(),
    description: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("activities", {
      ...args,
      createdAt: Date.now(),
    });
  },
});