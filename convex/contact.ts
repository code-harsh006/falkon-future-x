import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const createdAt = Date.now();
    const messageId = await ctx.db.insert("messages", {
      ...args,
      createdAt,
    });
    return messageId;
  },
});