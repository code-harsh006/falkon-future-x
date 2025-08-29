import type { Metadata } from "next";
import { Inter, Poppins, Montserrat, Raleway, Roboto, Merriweather, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ClerkProviderWrapper } from "@/lib/clerk-provider";

// Import all required fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  subsets: ["latin"], 
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
const raleway = Raleway({ 
  subsets: ["latin"], 
  variable: "--font-raleway",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
const roboto = Roboto({ 
  subsets: ["latin"], 
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"]
});
const merriweather = Merriweather({ 
  subsets: ["latin"], 
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"]
});
const sourceSans3 = Source_Sans_3({ 
  subsets: ["latin"], 
  variable: "--font-source-sans-3",
  weight: ["200", "300", "400", "600", "700", "900"]
});

export const metadata: Metadata = {
  title: "Falkon Future X - Transforming Waste into a Better Future",
  description: "Falkon Future X is leading the charge in transforming plastic waste into sustainable solutions for a better future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProviderWrapper>
      <html lang="en" className={`${inter.variable} ${poppins.variable} ${montserrat.variable} ${raleway.variable} ${roboto.variable} ${merriweather.variable} ${sourceSans3.variable}`}>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProviderWrapper>
  );
}