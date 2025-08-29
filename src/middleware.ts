import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Check if we have valid Clerk credentials
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Function to handle requests when Clerk is not configured
function skipAuthMiddleware(req: NextRequest) {
  // Simply continue without authentication
  return NextResponse.next();
}

// Export the middleware
export default function middleware(req: NextRequest) {
  // If we don't have valid Clerk credentials, skip authentication
  if (!publishableKey || publishableKey === 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
    console.warn('Clerk publishable key not found or is still the placeholder value. Skipping authentication middleware.');
    return skipAuthMiddleware(req);
  }
  
  // If we have valid credentials, use the Clerk middleware
  return clerkMiddleware((auth, req) => {
    // This is where you would add custom logic for route protection
    // For now, we're just continuing with the default behavior
    return NextResponse.next();
  })(req);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};