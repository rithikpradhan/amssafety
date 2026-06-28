import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "ORYZO AI — Intelligence Refined",
  description: "ORYZO AI is a next-generation artificial intelligence model built on natural foundations. Precision engineered for the way you think.",
  keywords: ["ORYZO", "AI", "artificial intelligence", "machine learning", "ORYZO-1"],
  openGraph: {
    title: "ORYZO AI — Intelligence Refined",
    description: "ORYZO AI is a next-generation artificial intelligence model built on natural foundations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
