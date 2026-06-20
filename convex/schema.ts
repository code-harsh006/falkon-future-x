import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ── Users (synced from Clerk) ──
  users: defineTable({
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
    kycVerified: v.boolean(),
    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  // ── Projects (carbon credit sources) ──
  projects: defineTable({
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
    rating: v.number(),
    verificationStatus: v.union(
      v.literal("pending"),
      v.literal("under_review"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    methodology: v.optional(v.string()),
    vintageYear: v.optional(v.number()),
    baselineEmissions: v.number(),
    projectEmissions: v.number(),
    expectedCredits: v.number(),
    readinessScore: v.number(),
    evidenceCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_seller", ["sellerId"])
    .index("by_verification", ["verificationStatus"])
    .index("by_created", ["createdAt"]),

  // ── Orders ──
  orders: defineTable({
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
    status: v.union(
      v.literal("pending"),
      v.literal("filled"),
      v.literal("cancelled"),
      v.literal("rejected")
    ),
    totalAmount: v.number(),
    platformFee: v.number(),
    backendOrderId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),

  // ── Holdings (user portfolio) ──
  holdings: defineTable({
    userId: v.id("users"),
    projectId: v.id("projects"),
    qty: v.number(),
    avgBuyPrice: v.number(),
    totalCost: v.number(),
    retiredQty: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"])
    .index("by_user_project", ["userId", "projectId"]),

  // ── Wallets ──
  wallets: defineTable({
    userId: v.id("users"),
    balance: v.number(),
    lockedBalance: v.number(),
    currency: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"]),

  // ── Watchlists ──
  watchlists: defineTable({
    userId: v.id("users"),
    name: v.string(),
    projectIds: v.array(v.id("projects")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"]),

  // ── Evidence (for project verification) ──
  evidence: defineTable({
    projectId: v.id("projects"),
    uploadedBy: v.id("users"),
    type: v.union(
      v.literal("photo"),
      v.literal("document"),
      v.literal("gps"),
      v.literal("video")
    ),
    url: v.string(),
    caption: v.optional(v.string()),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_uploader", ["uploadedBy"]),

  // ── Verification Requests (auditor queue) ──
  verificationRequests: defineTable({
    projectId: v.id("projects"),
    requestedBy: v.id("users"),
    assignedTo: v.optional(v.id("users")),
    status: v.union(
      v.literal("pending"),
      v.literal("under_review"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("info_requested")
    ),
    comment: v.optional(v.string()),
    decisionComment: v.optional(v.string()),
    decidedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_status", ["status"])
    .index("by_assigned", ["assignedTo"])
    .index("by_created", ["createdAt"]),

  // ── Waste Records ──
  wasteRecords: defineTable({
    userId: v.id("users"),
    wasteType: v.string(),
    plasticType: v.optional(v.string()),
    source: v.string(),
    quantity: v.number(),
    unit: v.string(),
    facility: v.string(),
    location: v.string(),
    carbonCreditsGenerated: v.number(),
    emissionsReduced: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("verified"),
      v.literal("rejected")
    ),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  // ── Activity Log ──
  activities: defineTable({
    userId: v.id("users"),
    type: v.string(),
    title: v.string(),
    description: v.string(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_type", ["type"])
    .index("by_created", ["createdAt"]),

  // ── Price History (for charts) ──
  priceHistory: defineTable({
    projectId: v.id("projects"),
    price: v.number(),
    volume: v.number(),
    timestamp: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_project_time", ["projectId", "timestamp"]),

  // ── Notifications ──
  notifications: defineTable({
    userId: v.id("users"),
    type: v.string(),
    title: v.string(),
    message: v.string(),
    read: v.boolean(),
    actionUrl: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_read", ["userId", "read"]),

  // ── Messages (contact form - legacy) ──
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),

  // ── Documents (uploaded files, certs, EPR docs) ──
  documents: defineTable({
    userId: v.id("users"),
    projectId: v.optional(v.id("projects")),
    name: v.string(),
    type: v.union(
      v.literal("certificate"),
      v.literal("epr_doc"),
      v.literal("contract"),
      v.literal("photo"),
      v.literal("report"),
      v.literal("other")
    ),
    fileUrl: v.string(),
    fileSize: v.number(),
    mimeType: v.string(),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"])
    .index("by_type", ["type"]),

  // ── Backend sync log (tracks FastAPI calls) ──
  backendSyncLog: defineTable({
    endpoint: v.string(),
    method: v.string(),
    status: v.number(),
    responseTime: v.number(),
    error: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_created", ["createdAt"]),
});