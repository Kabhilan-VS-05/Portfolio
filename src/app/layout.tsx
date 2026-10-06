import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ProfileProvider } from "@/context/ProfileContext";

export const metadata: Metadata = {
  title: "ResumeOS",
  description: "AI-Powered Resume Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark bg-zinc-950 text-zinc-50`}
    >
      <body className="min-h-full flex flex-col">
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
