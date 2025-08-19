import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Transition from "@/components/transitions";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Leo Li | Portfolio",
  keywords: [
    "Leo Li",
    "Portfolio", 
    "Software Engineer",
    "Frontend Developer",
    "Web Developer",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
  ],
  description: "Welcome to my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Transition>{children}</Transition>
      </body>
    </html>
  );
}
