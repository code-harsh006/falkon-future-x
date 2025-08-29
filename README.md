# Falkon Future X - Next.js Implementation

This is a modern implementation of the Falkon Future X website using cutting-edge technologies:

- [Next.js](https://nextjs.org/) - React framework for production
- [Convex](https://convex.dev/) - Backend-as-a-Service for data storage
- [Clerk](https://clerk.dev/) - Authentication provider
- [shadcn/ui](https://ui.shadcn.com/) - Reusable component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Features

1. Fully responsive design with mobile-first approach
2. Glassmorphism effects throughout the UI
3. Smooth scrolling navigation
4. Form handling with Convex backend
5. Authentication with Clerk
6. Modern UI components from shadcn/ui

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file with your Convex and Clerk credentials:
   ```
   NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/app/` - Next.js app directory with pages and layouts
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions and providers
- `convex/` - Convex functions for backend operations

## Deployment

This application can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or AWS.

For Convex deployment, follow the [Convex deployment documentation](https://docs.convex.dev/production/hosting).