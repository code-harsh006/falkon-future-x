"use client";

// Placeholder hook — will use Convex when backend is deployed
export function usePriceFeed(projectIds: string[]) {
  return projectIds.map((id) => ({
    projectId: id,
    price: 0,
    dayChange: 0,
    dayChangePercent: 0,
  }));
}