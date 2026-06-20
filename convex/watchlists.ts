import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserWatchlists = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("watchlists")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const addToWatchlist = mutation({
  args: {
    userId: v.id("users"),
    watchlistId: v.id("watchlists"),
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const watchlist = await ctx.db.get(args.watchlistId);
    if (!watchlist) throw new Error("Watchlist not found");

    if (watchlist.projectIds.includes(args.projectId)) {
      return; // Already in watchlist
    }

    await ctx.db.patch(args.watchlistId, {
      projectIds: [...watchlist.projectIds, args.projectId],
      updatedAt: Date.now(),
    });
  },
});

export const removeFromWatchlist = mutation({
  args: {
    watchlistId: v.id("watchlists"),
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const watchlist = await ctx.db.get(args.watchlistId);
    if (!watchlist) throw new Error("Watchlist not found");

    await ctx.db.patch(args.watchlistId, {
      projectIds: watchlist.projectIds.filter((id) => id !== args.projectId),
      updatedAt: Date.now(),
    });
  },
});

export const getWatchlistProjects = query({
  args: { watchlistId: v.id("watchlists") },
  handler: async (ctx, args) => {
    const watchlist = await ctx.db.get(args.watchlistId);
    if (!watchlist) return [];

    const projects = await Promise.all(
      watchlist.projectIds.map((id) => ctx.db.get(id))
    );

    return projects.filter(Boolean);
  },
});