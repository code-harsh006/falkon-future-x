import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Enrich with project data
    const enriched = await Promise.all(
      holdings.map(async (h) => {
        const project = await ctx.db.get(h.projectId);
        return { ...h, project };
      })
    );

    return enriched;
  },
});

export const retireCredits = mutation({
  args: {
    holdingId: v.id("holdings"),
    quantity: v.number(),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    const holding = await ctx.db.get(args.holdingId);
    if (!holding) throw new Error("Holding not found");

    const available = holding.qty - holding.retiredQty;
    if (available < args.quantity) {
      throw new Error("Insufficient credits to retire");
    }

    const now = Date.now();

    await ctx.db.patch(args.holdingId, {
      retiredQty: holding.retiredQty + args.quantity,
      updatedAt: now,
    });

    const project = await ctx.db.get(holding.projectId);

    // Log activity
    await ctx.db.insert("activities", {
      userId: holding.userId,
      type: "credits_retired",
      title: "Credits retired",
      description: `${args.quantity} tCO2e retired from ${project?.name || "unknown project"}`,
      metadata: {
        holdingId: args.holdingId,
        projectId: holding.projectId,
        quantity: args.quantity,
        reason: args.reason,
      },
      createdAt: now,
    });

    // Create notification
    await ctx.db.insert("notifications", {
      userId: holding.userId,
      type: "retirement_complete",
      title: "Retirement certificate generated",
      message: `${args.quantity} tCO2e credits permanently retired. Certificate available in Documents.`,
      read: false,
      actionUrl: `/platform/credits`,
      createdAt: now,
    });

    return args.holdingId;
  },
});

export const getPortfolioStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    let totalQty = 0;
    let totalCost = 0;
    let totalRetired = 0;
    let totalCurrentValue = 0;

    for (const h of holdings) {
      totalQty += h.qty;
      totalCost += h.totalCost;
      totalRetired += h.retiredQty;

      const project = await ctx.db.get(h.projectId);
      if (project) {
        totalCurrentValue += h.qty * project.pricePerUnit;
      }
    }

    const pnl = totalCurrentValue - totalCost;
    const pnlPercent = totalCost > 0 ? (pnl / totalCost) * 100 : 0;

    return {
      totalCredits: totalQty,
      totalRetired,
      totalCost,
      totalCurrentValue,
      pnl,
      pnlPercent,
      holdingsCount: holdings.length,
    };
  },
});