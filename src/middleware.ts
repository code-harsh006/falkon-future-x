import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
]);

let clerkMiddlewareHandler: any = null;

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const hasKeys =
    !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !!process.env.CLERK_SECRET_KEY;

  if (!hasKeys) {
    console.warn("Clerk environment variables are missing. Skipping Clerk middleware.");
    return NextResponse.next();
  }

  if (!clerkMiddlewareHandler) {
    clerkMiddlewareHandler = clerkMiddleware(async (auth, req) => {
      const { userId } = await auth();

      // If user is signed in and trying to access a public page, redirect to platform
      if (userId && isPublicRoute(req)) {
        return NextResponse.redirect(new URL("/platform/dashboard", req.url));
      }

      return NextResponse.next();
    });
  }

  return clerkMiddlewareHandler(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};