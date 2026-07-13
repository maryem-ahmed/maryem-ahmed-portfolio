import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maryem Ahmed — AI Engineer",
  description:
    "AI Engineer specializing in Generative AI, LLMs, RAG systems, and MLOps. Building intelligent applications from research to production.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "NLP",
    "RAG",
    "LLM",
    "MLOps",
    "Maryem Ahmed",
  ],
  authors: [{ name: "Maryem Ahmed" }],
  openGraph: {
    title: "Maryem Ahmed — AI Engineer",
    description:
      "Building intelligent systems — from RAG pipelines and LLM orchestration to production MLOps.",
    type: "website",
  },
};

import { ThreadCursor } from "@/components/effects/thread-cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ThreadCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
