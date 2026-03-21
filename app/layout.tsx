import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kartik Pundir | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React.js, Node.js, and modern web technologies. Open to internship opportunities.",
  keywords: ["Full Stack Developer", "React", "Node.js", "Kartik Pundir", "Portfolio"],
  authors: [{ name: "Kartik Pundir" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Kartik Pundir | Full Stack Developer",
    description: "Full Stack Developer open to work",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${firaCode.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
