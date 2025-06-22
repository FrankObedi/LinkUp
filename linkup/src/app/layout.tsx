import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkUp - Match Teammates, Not Just Projects",
  description: "Find the right people to build with at hackathons. Swipe, match, and LinkUp!",
  keywords: ["hackathon", "team building", "networking", "collaboration", "developers"],
  authors: [{ name: "LinkUp Team" }],
  openGraph: {
    title: "LinkUp - Match Teammates, Not Just Projects",
    description: "Find the right people to build with at hackathons. Swipe, match, and LinkUp!",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkUp - Match Teammates, Not Just Projects",
    description: "Find the right people to build with at hackathons. Swipe, match, and LinkUp!",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <div className="min-h-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}
