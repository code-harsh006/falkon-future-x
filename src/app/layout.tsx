import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProviderWrapper } from "@/lib/clerk-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Falkon Future X — Circular economy infrastructure for plastic waste",
  description:
    "Falkon Future X builds the tracking, compliance, and recycling infrastructure that turns plastic waste into a verifiable circular economy — QR product tracking, AI polymer scanning, IoT smart bins, and carbon-credit offsetting.",
  keywords: [
    "plastic waste",
    "circular economy",
    "EPR compliance",
    "carbon credits",
    "recycling technology",
    "IoT smart bins",
  ],
};

export const viewport: Viewport = {
  themeColor: "#F2F1EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProviderWrapper>
      <html lang="en" className={`${inter.variable} scroll-smooth bg-background`}>
        <body className="font-sans antialiased">{children}</body>
      </html>
    </ClerkProviderWrapper>
  );
}
