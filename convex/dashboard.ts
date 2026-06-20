import { query } from "./_generated/server";
import { v } from "convex/values";

export const getStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;

    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const projects = await ctx.db.query("projects").collect();

    // Calculate portfolio stats
    let totalCredits = 0;
    let totalCost = 0;
    let totalRetired = 0;
    let totalCurrentValue = 0;

    for (const h of holdings) {
      totalCredits += h.qty;
      totalCost += h.totalCost;
      totalRetired += h.retiredQty;

      const project = await ctx.db.get(h.projectId);
      if (project) {
        totalCurrentValue += h.qty * project.pricePerUnit;
      }
    }

    // Order stats
    const filledOrders = orders.filter((o) => o.status === "filled");
    const pendingOrders = orders.filter((o) => o.status === "pending");

    // Project stats by role
    let roleProjects = projects;
    if (user.role === "farmer" || user.role === "waste") {
      roleProjects = projects.filter(
        (p) => p.sellerId === args.userId
      );
    }

    const pendingProjects = roleProjects.filter(
      (p) => p.verificationStatus === "pending"
    ).length;
    const verifiedProjects = roleProjects.filter(
      (p) => p.verificationStatus === "approved"
    ).length;

    // Wallet
    const wallet = await ctx.db
      .query("wallets")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();

    // Notifications
    const unreadNotifications = await ctx.db
      .query("notifications")
      .withIndex("by_user_read", (q) =>
        q.eq("userId", args.userId).eq("read", false)
      )
      .collect();

    return {
      user: {
        role: user.role,
        name: user.name,
      },
      portfolio: {
        totalCredits,
        totalCost,
        totalRetired,
        totalCurrentValue,
        pnl: totalCurrentValue - totalCost,
        pnlPercent:
          totalCost > 0 ? ((totalCurrentValue - totalCost) / totalCost) * 100 : 0,
      },
      orders: {
        total: orders.length,
        filled: filledOrders.length,
        pending: pendingOrders.length,
      },
      projects: {
        total: roleProjects.length,
        pending: pendingProjects,
        verified: verifiedProjects,
      },
      wallet: {
        balance: wallet?.balance ?? 0,
        lockedBalance: wallet?.lockedBalance ?? 0,
        available: (wallet?.balance ?? 0) - (wallet?.lockedBalance ?? 0),
      },
      notifications: {
        unread: unreadNotifications.length,
      },
    };
  },
});

export const getMarketStats = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    const orders = await ctx.db.query("orders").collect();

    const totalProjects = projects.length;
    const activeProjects = projects.filter(
      (p) => p.verificationStatus === "approved"
    ).length;
    const totalVolume = projects.reduce((sum, p) => sum + p.listedVolume, 0);
    const avgPrice =
      projects.length > 0
        ? projects.reduce((sum, p) => sum + p.pricePerUnit, 0) / projects.length
        : 0;

    const totalOrders = orders.length;
    const filledOrders = orders.filter((o) => o.status === "filled").length;
    const totalTradedVolume = orders
      .filter((o) => o.status === "filled")
      .reduce((sum, o) => sum + o.qty, 0);

    return {
      totalProjects,
      activeProjects,
      totalVolume,
      avgPrice,
      totalOrders,
      filledOrders,
      totalTradedVolume,
    };
  },
});