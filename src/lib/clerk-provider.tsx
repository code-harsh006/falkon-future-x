'use client';

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ReactNode } from 'react';
import { ConvexClientProvider } from '@/lib/convex-client';

export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  // Check if we have the required environment variables
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // If we don't have the publishable key or it's still the placeholder value, 
  // render children with just Convex (no Clerk)
  if (!publishableKey || publishableKey === 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
    console.warn('Clerk publishable key not found or is still the placeholder value. Running without authentication.');
    return <ConvexClientProvider>{children}</ConvexClientProvider>;
  }

  // Validate the publishable key format
  if (!publishableKey.startsWith('pk_')) {
    console.warn('Invalid Clerk publishable key format. Running without authentication.');
    return <ConvexClientProvider>{children}</ConvexClientProvider>;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        variables: {
          colorPrimary: '#10b981', // Green from the original site
        },
      }}
    >
      <ConvexClientProvider>
        <ConvexProviderWithClerk useAuth={useAuth}>
          {children}
        </ConvexProviderWithClerk>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}