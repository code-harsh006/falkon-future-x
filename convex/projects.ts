import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    category: v.optional(
      v.union(
        v.literal("tree"),
        v.literal("biochar"),
        v.literal("waste"),
        v.literal("solar"),
        v.literal("transit")
      )
    ),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("under_review"),
        v.literal("approved"),
        v.literal("rejected")
      )
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let results;

    if (args.category) {
      results = await ctx.db
        .query("projects")
        .withIndex("by_category", (idx) => idx.eq("category", args.category!))
        .order("desc")
        .collect();
    } else if (args.status) {
      results = await ctx.db
        .query("projects")
        .withIndex("by_verification", (idx) =>
          idx.eq("verificationStatus", args.status!)
        )
        .order("desc")
        .collect();
    } else {
      results = await ctx.db
        .query("projects")
        .withIndex("by_created")
        .order("desc")
        .collect();
    }

    return args.limit ? results.slice(0, args.limit) : results;
  },
});

export const get = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});

export const getBySeller = query({
  args: { sellerId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_seller", (q) => q.eq("sellerId", args.sellerId))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    category: v.union(
      v.literal("tree"),
      v.literal("biochar"),
      v.literal("waste"),
      v.literal("solar"),
      v.literal("transit")
    ),
    sellerId: v.id("users"),
    description: v.string(),
    location: v.string(),
    locationLat: v.optional(v.number()),
    locationLng: v.optional(v.number()),
    listedVolume: v.number(),
    pricePerUnit: v.number(),
    methodology: v.optional(v.string()),
    vintageYear: v.optional(v.number()),
    baselineEmissions: v.number(),
    projectEmissions: v.number(),
    expectedCredits: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const projectId = await ctx.db.insert("projects", {
      ...args,
      rating: 0,
      verificationStatus: "pending",
      readinessScore: 92,
      evidenceCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    // Create pending credit entry
    const serialPrefix = args.category.slice(0, 4).toUpperCase();
    await ctx.db.insert("holdings", {
      userId: args.sellerId,
      projectId,
      qty: 0,
      avgBuyPrice: 0,
      totalCost: 0,
      retiredQty: 0,
      createdAt: now,
      updatedAt: now,
    });

    // Log activity
    await ctx.db.insert("activities", {
      userId: args.sellerId,
      type: "project_created",
      title: "Project registered",
      description: `${args.name} entered verification queue`,
      metadata: { projectId },
      createdAt: now,
    });

    // Create verification request
    await ctx.db.insert("verificationRequests", {
      projectId,
      requestedBy: args.sellerId,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });

    return projectId;
  },
});

export const update = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
    listedVolume: v.optional(v.number()),
    pricePerUnit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { projectId, ...updates } = args;
    await ctx.db.patch(projectId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const verify = mutation({
  args: {
    projectId: v.id("projects"),
    approve: v.boolean(),
    auditorId: v.id("users"),
    comment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");

    const newStatus = args.approve ? "approved" : "rejected";

    await ctx.db.patch(args.projectId, {
      verificationStatus: newStatus,
      updatedAt: Date.now(),
    });

    // Update verification request
    const verificationRequest = await ctx.db
      .query("verificationRequests")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .first();

    if (verificationRequest) {
      await ctx.db.patch(verificationRequest._id, {
        status: newStatus,
        assignedTo: args.auditorId,
        decisionComment: args.comment,
        decidedAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    // If approved, issue credits to seller
    if (args.approve) {
      const existingHolding = await ctx.db
        .query("holdings")
        .withIndex("by_user_project", (q) =>
          q.eq("userId", project.sellerId).eq("projectId", args.projectId)
        )
        .unique();

      if (existingHolding) {
        await ctx.db.patch(existingHolding._id, {
          qty: project.expectedCredits,
          avgBuyPrice: project.pricePerUnit,
          totalCost: project.expectedCredits * project.pricePerUnit,
          updatedAt: Date.now(),
        });
      }
    }

    // Log activity
    await ctx.db.insert("activities", {
      userId: args.auditorId,
      type: "project_verified",
      title: `Project ${newStatus}`,
      description: `${project.name} was ${newStatus} by auditor`,
      metadata: { projectId: args.projectId, approve: args.approve },
      createdAt: Date.now(),
    });

    // Create notification for project owner
    await ctx.db.insert("notifications", {
      userId: project.sellerId,
      type: "verification_result",
      title: `Project ${newStatus}`,
      message: args.approve
        ? `Your project "${project.name}" has been approved and credits issued.`
        : `Your project "${project.name}" was rejected. ${args.comment || ""}`,
      read: false,
      actionUrl: `/platform/projects`,
      createdAt: Date.now(),
    });
  },
});

export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("projects").collect();
    const lower = args.query.toLowerCase();
    return all.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.location.toLowerCase().includes(lower)
    );
  },
});

export const getStats = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    const total = projects.length;
    const pending = projects.filter(
      (p) => p.verificationStatus === "pending"
    ).length;
    const approved = projects.filter(
      (p) => p.verificationStatus === "approved"
    ).length;
    const totalVolume = projects.reduce((sum, p) => sum + p.listedVolume, 0);
    const avgPrice =
      projects.length > 0
        ? projects.reduce((sum, p) => sum + p.pricePerUnit, 0) / projects.length
        : 0;

    return { total, pending, approved, totalVolume, avgPrice };
  },
});