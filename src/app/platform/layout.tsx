"use client";

import React, { useState, useEffect } from "react";
import { PlatformProvider } from "@/lib/platform-context";
import Sidebar from "@/components/platform/sidebar";
import { usePlatform, UserRole } from "@/lib/platform-context";
import { useRouter } from "next/navigation";
import { useAuth, useUser, UserButton } from "@clerk/nextjs";
import { Leaf, Loader2 } from "lucide-react";

function PlatformShell({ children }: { children: React.ReactNode }) {
  const { userId, isLoading, clerkId, userName, logout } = usePlatform();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink-0 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  // If Clerk is configured and user is not signed in, show sign-in redirect
  if (isSignedIn === false && !clerkId) {
    return <RegistrationFlow />;
  }

  // Show loading while checking auth
  if (isSignedIn === undefined && !clerkId) {
    return (
      <div className="min-h-screen bg-ink-0 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  const displayName = user?.fullName || user?.firstName || userName || "User";

  return (
    <div className="min-h-screen bg-ink-0 text-ink-900 flex flex-col lg:flex-row relative font-sans">
      <Sidebar />
      <div className="flex-1 lg:pl-60 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-ink-300 px-6 py-2.5 flex items-center justify-between text-xs z-30">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="text-ink-700">
              <strong className="text-ink-900">Carbon Sandbox</strong> — Switch
              roles in sidebar to view tailored interfaces
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-ink-500 font-medium">{displayName}</span>
            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            ) : (
              <button
                onClick={logout}
                className="text-ink-500 hover:text-down font-semibold transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <main className="flex-1 p-4 md:p-6 lg:p-8 relative overflow-y-auto min-h-[calc(100vh-80px)]">
          {children}
        </main>
      </div>
    </div>
  );
}

function RegistrationFlow() {
  const { login, role, setRole } = usePlatform();
  const [step, setStep] = useState<"role" | "details">("role");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const roles = [
    {
      value: "farmer" as const,
      label: "Farmer",
      icon: "🌱",
      desc: "Log plantations and earn carbon credits",
    },
    {
      value: "waste" as const,
      label: "Waste Collector",
      icon: "♻️",
      desc: "Log recycling and earn credits",
    },
    {
      value: "industry" as const,
      label: "Industry",
      icon: "🏭",
      desc: "Offset emissions and buy credits",
    },
    {
      value: "auditor" as const,
      label: "Auditor",
      icon: "🔍",
      desc: "Verify projects and approve credits",
    },
    {
      value: "investor" as const,
      label: "Investor",
      icon: "📈",
      desc: "Trade credits and track portfolio",
    },
    {
      value: "admin" as const,
      label: "Admin",
      icon: "⚙️",
      desc: "Manage platform and users",
    },
  ];

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    try {
      const demoClerkId = `demo_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}`;
      await login(demoClerkId, formData.email, formData.name);
      router.push("/platform/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "role") {
    return (
      <div className="min-h-screen bg-ink-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-brand-400" />
            </div>
            <h1 className="text-2xl font-bold text-ink-0 mb-2">
              Falkon Carbon Registry
            </h1>
            <p className="text-sm text-ink-500">
              Select your role to get started
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => handleRoleSelect(r.value)}
                className="bg-ink-800 border border-ink-700 rounded-xl p-6 text-left hover:border-brand-500/50 hover:bg-ink-800/80 transition-all"
              >
                <span className="text-2xl mb-3 block">{r.icon}</span>
                <h3 className="text-sm font-semibold text-ink-0 mb-1">
                  {r.label}
                </h3>
                <p className="text-xs text-ink-500">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-ink-800 border border-ink-700 rounded-xl p-6">
          <div className="text-center mb-6">
            <span className="text-2xl mb-2 block">
              {roles.find((r) => r.value === role)?.icon}
            </span>
            <h2 className="text-lg font-semibold text-ink-0">
              {roles.find((r) => r.value === role)?.label} Registration
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-ink-500 uppercase tracking-wider block mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-3 py-2 bg-ink-900 border border-ink-700 rounded-lg text-sm text-ink-0 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-500 uppercase tracking-wider block mb-1.5">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-3 py-2 bg-ink-900 border border-ink-700 rounded-lg text-sm text-ink-0 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-500 uppercase tracking-wider block mb-1.5">
                Organization (Optional)
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) =>
                  setFormData({ ...formData, organization: e.target.value })
                }
                className="w-full px-3 py-2 bg-ink-900 border border-ink-700 rounded-lg text-sm text-ink-0 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                placeholder="Company or farm name"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("role")}
                className="flex-1 px-4 py-2 bg-ink-700 text-ink-300 rounded-lg text-sm font-medium hover:bg-ink-600"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email}
                className="flex-1 px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Continue"}
              </button>
            </div>
          </form>
          <div className="mt-4 pt-4 border-t border-ink-700 text-center">
            <p className="text-xs text-ink-500">
              Or{" "}
              <a href="/sign-in" className="text-brand-400 hover:text-brand-500 font-semibold">
                sign in with email
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlatformProvider>
      <PlatformShell>{children}</PlatformShell>
    </PlatformProvider>
  );
}