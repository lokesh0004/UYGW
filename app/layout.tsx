import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "CourseHub – Build Skills. Shape Your Future.",
  description: "India's #1 online learning platform. Expert instructors, lifetime access.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
