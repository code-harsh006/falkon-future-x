'use client';

import { useCallback } from "react";

// Mock function for when Convex is not available
const mockSendMessage = () => Promise.resolve({ success: true });

export const useSendMessage = () => {
  const submitMessage = useCallback(async (name: string, email: string, message: string) => {
    try {
      // For now, just return success since Convex is not set up
      console.log('Message received:', { name, email, message });
      return { success: true };
    } catch (error) {
      console.error("Error sending message:", error);
      return { success: false, error };
    }
  }, []);

  return { submitMessage };
};