import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getPending = query({
  handler: async (ctx) => {
    const requests = await ctx.db
      .query("verificationRequests")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .order("desc")
      .collect();

    const enriched = await Promise.all(
      requests.map(async (r) => {
        const project = await ctx.db.get(r.projectId);
        const requester = await ctx.db.get(r.requestedBy);
        return { ...r, project, requester };
      })
    );

    return enriched;
  },
});

export const getForAuditor = query({
  args: { auditorId: v.id("users") },
  handler: async (ctx, args) => {
    const requests = await ctx.db
      .query("verificationRequests")
      .withIndex("by_assigned", (q) => q.eq("assignedTo", args.auditorId))
      .order("desc")
      .collect();

    const enriched = await Promise.all(
      requests.map(async (r) => {
        const project = await ctx.db.get(r.projectId);
        return { ...r, project };
      })
    );

    return enriched;
  },
});

export const assign = mutation({
  args: {
    requestId: v.id("verificationRequests"),
    auditorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.requestId, {
      assignedTo: args.auditorId,
      status: "under_review",
      updatedAt: Date.now(),
    });
  },
});

export const decide = mutation({
  args: {
    requestId: v.id("verificationRequests"),
    auditorId: v.id("users"),
    approve: v.boolean(),
    comment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.requestId);
    if (!request) throw new Error("Request not found");

    const newStatus = args.approve ? "approved" : "rejected";

    await ctx.db.patch(args.requestId, {
      status: newStatus,
      assignedTo: args.auditorId,
      decisionComment: args.comment,
      decidedAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Also update the project
    await ctx.db.patch(request.projectId, {
      verificationStatus: newStatus,
      updatedAt: Date.now(),
    });
  },
});

export const requestMoreInfo = mutation({
  args: {
    requestId: v.id("verificationRequests"),
    auditorId: v.id("users"),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.requestId, {
      status: "info_requested",
      assignedTo: args.auditorId,
      decisionComment: args.comment,
      updatedAt: Date.now(),
    });
  },
});