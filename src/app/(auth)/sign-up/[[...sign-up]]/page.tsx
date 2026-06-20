import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-brand-500/10 border border-brand-500/20 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-brand-400" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-brand-400 to-teal-400 bg-clip-text text-transparent">
              FALKON
            </span>
          </Link>
          <h1 className="text-xl font-bold text-ink-0">Create your account</h1>
          <p className="text-sm text-ink-500 mt-1">
            Join the Carbon Registry platform
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-xl">
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            redirectUrl="/platform/dashboard"
            appearance={{
              variables: {
                colorPrimary: "#1C9D4B",
                borderRadius: "0.5rem",
              },
            }}
          />
        </div>

        <p className="text-center text-xs text-ink-500 mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-brand-500 hover:text-brand-600 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}