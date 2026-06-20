import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

export const upsertUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.union(
      v.literal("farmer"),
      v.literal("waste"),
      v.literal("industry"),
      v.literal("auditor"),
      v.literal("investor"),
      v.literal("admin")
    ),
    organization: v.optional(v.string()),
    phone: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        email: args.email,
        role: args.role,
        organization: args.organization,
        phone: args.phone,
        avatarUrl: args.avatarUrl,
        lastActiveAt: Date.now(),
      });
      return existing._id;
    }

    const userId = await ctx.db.insert("users", {
      ...args,
      kycVerified: false,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });

    // Create wallet for new user
    await ctx.db.insert("wallets", {
      userId,
      balance: 0,
      lockedBalance: 0,
      currency: "USD",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Create default watchlist
    await ctx.db.insert("watchlists", {
      userId,
      name: "My Watchlist",
      projectIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Log activity
    await ctx.db.insert("activities", {
      userId,
      type: "user_registered",
      title: "Account created",
      description: `New ${args.role} account registered`,
      createdAt: Date.now(),
    });

    return userId;
  },
});

export const updateRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(
      v.literal("farmer"),
      v.literal("waste"),
      v.literal("industry"),
      v.literal("auditor"),
      v.literal("investor"),
      v.literal("admin")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      role: args.role,
      lastActiveAt: Date.now(),
    });
  },
});

export const listByRole = query({
  args: {
    role: v.union(
      v.literal("farmer"),
      v.literal("waste"),
      v.literal("industry"),
      v.literal("auditor"),
      v.literal("investor"),
      v.literal("admin")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", args.role))
      .collect();
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});