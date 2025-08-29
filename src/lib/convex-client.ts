'use client';

import * as React from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import type { ReactNode } from "react";

interface ConvexClientProviderProps {
  children: ReactNode;
}

export function ConvexClientProvider({ children }: ConvexClientProviderProps) {
  const [convex, setConvex] = React.useState<ConvexReactClient | null>(null);
  
  React.useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return;
    }
    
    // Check if the environment variable is set
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    
    if (convexUrl) {
      try {
        const client = new ConvexReactClient(convexUrl);
        setConvex(client);
      } catch (error) {
        console.error("Failed to initialize Convex client:", error);
      }
    } else {
      console.warn("Convex URL not found. Running without Convex.");
    }
  }, []);

  // If no Convex URL is provided or initialization failed, just render children without Convex
  if (!convex) {
    return React.createElement(React.Fragment, null, children);
  }

  return React.createElement(
    ConvexProvider,
    { client: convex },
    children
  );
}