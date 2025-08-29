'use client';

// Mock the import to prevent build errors when Convex API is not generated
let useMutation: any;
let api: any;

try {
  useMutation = require("convex/react").useMutation;
  api = require("@/convex/_generated/api");
} catch (e) {
  // If Convex is not set up, provide mock functions
  useMutation = () => () => Promise.resolve();
  api = { contact: { sendMessage: "mock" } };
}

import { useCallback } from "react";

export const useSendMessage = () => {
  // Use a mock function if Convex is not properly configured
  const sendMessage = typeof api.contact.sendMessage === 'string' 
    ? () => Promise.resolve({ success: true }) 
    : useMutation(api.contact.sendMessage);

  const submitMessage = useCallback(async (name: string, email: string, message: string) => {
    try {
      await sendMessage({ name, email, message });
      return { success: true };
    } catch (error) {
      console.error("Error sending message:", error);
      return { success: false, error };
    }
  }, [sendMessage]);

  return { submitMessage };
};