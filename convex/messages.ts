import { query } from "./_generated/server";

export const getAllMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").collect();
  },
});