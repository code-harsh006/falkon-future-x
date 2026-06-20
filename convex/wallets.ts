import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("wallets")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();
  },
});

export const addFunds = mutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const wallet = await ctx.db
      .query("wallets")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();

    if (!wallet) throw new Error("Wallet not found");

    await ctx.db.patch(wallet._id, {
      balance: wallet.balance + args.amount,
      updatedAt: Date.now(),
    });

    await ctx.db.insert("activities", {
      userId: args.userId,
      type: "wallet_funded",
      title: "Funds added",
      description: `$${args.amount.toFixed(2)} added to wallet`,
      createdAt: Date.now(),
    });

    return wallet._id;
  },
});

export const getBalance = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const wallet = await ctx.db
      .query("wallets")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();

    if (!wallet) return { balance: 0, lockedBalance: 0, available: 0 };

    return {
      balance: wallet.balance,
      lockedBalance: wallet.lockedBalance,
      available: wallet.balance - wallet.lockedBalance,
    };
  },
});