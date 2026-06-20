import { query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const getPrices = query({
  args: { projectIds: v.array(v.string()) },
  handler: async (ctx, args) => {
    const results = await Promise.all(
      args.projectIds.map(async (id) => {
        try {
          const project = await ctx.db.get(id as Id<"projects">);
          if (project && "pricePerUnit" in project) {
            return {
              projectId: id,
              price: (project as any).pricePerUnit,
              dayChange: 0,
              dayChangePercent: 0,
            };
          }
        } catch {
          // ID might not be valid
        }
        return {
          projectId: id,
          price: 0,
          dayChange: 0,
          dayChangePercent: 0,
        };
      })
    );

    return results;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    return projects.map((p) => ({
      projectId: p._id,
      name: p.name,
      category: p.category,
      price: p.pricePerUnit,
      listedVolume: p.listedVolume,
      rating: p.rating,
    }));
  },
});