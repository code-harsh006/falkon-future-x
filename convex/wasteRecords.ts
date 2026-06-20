import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("wasteRecords")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    userId: v.id("users"),
    wasteType: v.string(),
    plasticType: v.optional(v.string()),
    source: v.string(),
    quantity: v.number(),
    unit: v.string(),
    facility: v.string(),
    location: v.string(),
  },
  handler: async (ctx, args) => {
    // Carbon credit calculation
    const diff = args.wasteType === "agricultural" ? 1.1 : 1.7;
    const emissionsReduced = args.quantity * diff;
    const carbonCreditsGenerated = emissionsReduced / 1000;

    const recordId = await ctx.db.insert("wasteRecords", {
      ...args,
      carbonCreditsGenerated,
      emissionsReduced,
      status: "pending",
      createdAt: Date.now(),
    });

    // Log activity
    await ctx.db.insert("activities", {
      userId: args.userId,
      type: "waste_logged",
      title: "Waste record created",
      description: `${args.quantity.toLocaleString()} ${args.unit} of ${args.wasteType} logged at ${args.facility}`,
      metadata: { recordId, carbonCreditsGenerated },
      createdAt: Date.now(),
    });

    return recordId;
  },
});

export const verify = mutation({
  args: {
    recordId: v.id("wasteRecords"),
    approve: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.recordId, {
      status: args.approve ? "verified" : "rejected",
    });
  },
});