import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans_SC, Ma_Shan_Zheng } from "next/font/google";
import "./globals.css";
import Transition from "@/components/Transitions";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-sc",
  display: "swap",
});
const maShanZheng = Ma_Shan_Zheng({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ma-shan-zheng",
  display: "swap",
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
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} ${maShanZheng.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <Transition>
            {children}
          </Transition>
        </ThemeProvider>
      </body>
    </html>
  );
}
