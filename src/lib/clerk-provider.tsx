"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

function ConvexWithClerk({ children }: { children: ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const convex = useMemo(() => {
    if (!convexUrl) return null;
    return new ConvexReactClient(convexUrl);
  }, [convexUrl]);

  if (!convex) return <>{children}</>;

  return (
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      {children}
    </ConvexProviderWithClerk>
  );
}

function ConvexOnly({ children }: { children: ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const convex = useMemo(() => {
    if (!convexUrl) return null;
    return new ConvexReactClient(convexUrl);
  }, [convexUrl]);

  if (!convex) return <>{children}</>;

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const hasClerk =
    pk &&
    pk.startsWith("pk_") &&
    pk !== "pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  if (hasClerk) {
    return (
      <ClerkProvider
        publishableKey={pk}
        appearance={{
          variables: {
            colorPrimary: "#1C9D4B",
            borderRadius: "0.5rem",
          },
          elements: {
            formButtonPrimary: "bg-brand-500 hover:bg-brand-600",
          },
        }}
      >
        <ConvexWithClerk>{children}</ConvexWithClerk>
      </ClerkProvider>
    );
  }

  return <ConvexOnly>{children}</ConvexOnly>;
}