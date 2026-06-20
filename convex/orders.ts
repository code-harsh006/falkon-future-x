import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const placeOrder = mutation({
  args: {
    userId: v.id("users"),
    projectId: v.id("projects"),
    side: v.union(v.literal("buy"), v.literal("sell")),
    qty: v.number(),
    price: v.number(),
    orderType: v.union(
      v.literal("market"),
      v.literal("limit"),
      v.literal("standing")
    ),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");

    const wallet = await ctx.db
      .query("wallets")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();
    if (!wallet) throw new Error("Wallet not found");

    const totalAmount = args.qty * args.price;
    const platformFee = totalAmount * 0.015;
    const totalWithFee = totalAmount + platformFee;

    // Verify balance for buy orders
    if (args.side === "buy" && wallet.balance < totalWithFee) {
      throw new Error("Insufficient balance");
    }

    // Verify holdings for sell orders
    if (args.side === "sell") {
      const holding = await ctx.db
        .query("holdings")
        .withIndex("by_user_project", (q) =>
          q.eq("userId", args.userId).eq("projectId", args.projectId)
        )
        .unique();

      if (!holding || holding.qty - holding.retiredQty < args.qty) {
        throw new Error("Insufficient holdings");
      }
    }

    const now = Date.now();

    // Lock funds for buy orders
    if (args.side === "buy") {
      await ctx.db.patch(wallet._id, {
        balance: wallet.balance - totalWithFee,
        lockedBalance: wallet.lockedBalance + totalWithFee,
        updatedAt: now,
      });
    }

    // Create order
    const orderId = await ctx.db.insert("orders", {
      userId: args.userId,
      projectId: args.projectId,
      side: args.side,
      qty: args.qty,
      price: args.price,
      orderType: args.orderType,
      status: "pending",
      totalAmount,
      platformFee,
      createdAt: now,
      updatedAt: now,
    });

    // For market orders, fill immediately (simplified matching)
    if (args.orderType === "market") {
      await ctx.db.patch(orderId, {
        status: "filled",
        updatedAt: now,
      });

      if (args.side === "buy") {
        // Unlock funds and deduct
        await ctx.db.patch(wallet._id, {
          lockedBalance: wallet.lockedBalance - totalWithFee,
          updatedAt: now,
        });

        // Update or create holding
        const existingHolding = await ctx.db
          .query("holdings")
          .withIndex("by_user_project", (q) =>
            q.eq("userId", args.userId).eq("projectId", args.projectId)
          )
          .unique();

        if (existingHolding) {
          const newQty = existingHolding.qty + args.qty;
          const newTotalCost = existingHolding.totalCost + totalAmount;
          await ctx.db.patch(existingHolding._id, {
            qty: newQty,
            avgBuyPrice: newTotalCost / newQty,
            totalCost: newTotalCost,
            updatedAt: now,
          });
        } else {
          await ctx.db.insert("holdings", {
            userId: args.userId,
            projectId: args.projectId,
            qty: args.qty,
            avgBuyPrice: args.price,
            totalCost: totalAmount,
            retiredQty: 0,
            createdAt: now,
            updatedAt: now,
          });
        }

        // Decrease project listed volume
        await ctx.db.patch(args.projectId, {
          listedVolume: Math.max(0, project.listedVolume - args.qty),
          updatedAt: now,
        });
      } else {
        // Sell: reduce holdings, add funds
        const holding = await ctx.db
          .query("holdings")
          .withIndex("by_user_project", (q) =>
            q.eq("userId", args.userId).eq("projectId", args.projectId)
          )
          .unique();

        if (holding) {
          await ctx.db.patch(holding._id, {
            qty: holding.qty - args.qty,
            updatedAt: now,
          });
        }

        // Credit seller wallet
        await ctx.db.patch(wallet._id, {
          balance: wallet.balance + totalAmount - platformFee,
          updatedAt: now,
        });

        // Increase project listed volume
        await ctx.db.patch(args.projectId, {
          listedVolume: project.listedVolume + args.qty,
          updatedAt: now,
        });
      }

      // Log activity
      await ctx.db.insert("activities", {
        userId: args.userId,
        type: "order_filled",
        title: `${args.side === "buy" ? "Bought" : "Sold"} credits`,
        description: `${args.qty} tCO2e of ${project.name} at $${args.price}/unit`,
        metadata: { orderId, projectId: args.projectId },
        createdAt: now,
      });
    }

    return orderId;
  },
});

export const cancelOrder = mutation({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");
    if (order.status !== "pending") throw new Error("Order cannot be cancelled");

    const now = Date.now();

    await ctx.db.patch(args.orderId, {
      status: "cancelled",
      updatedAt: now,
    });

    // Unlock funds for buy orders
    if (order.side === "buy") {
      const wallet = await ctx.db
        .query("wallets")
        .withIndex("by_user", (q) => q.eq("userId", order.userId))
        .unique();

      if (wallet) {
        await ctx.db.patch(wallet._id, {
          balance: wallet.balance + order.totalAmount + order.platformFee,
          lockedBalance: wallet.lockedBalance - (order.totalAmount + order.platformFee),
          updatedAt: now,
        });
      }
    }
  },
});

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();
  },
});

export const getOpenOrders = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .order("desc")
      .collect();
  },
});

export const getOrderHistory = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) =>
        q.or(
          q.eq(q.field("status"), "filled"),
          q.eq(q.field("status"), "cancelled")
        )
      )
      .order("desc")
      .collect();
  },
});