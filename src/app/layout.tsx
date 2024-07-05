import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

const fonty = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xypher",
  description: "Generated by create next app",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={fonty.className + " relative"}>
        <Navbar />
        <div className="mx-auto max-w-6xl caret-primary">{children}</div>
        <Toaster richColors position="top-center" theme="dark" />
      </body>
    </html>
  );
}
