import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Suspense } from "react";
import { AuthProvider } from "@/lib/AuthProvider";

const fonty = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xypher",
  description:
    "Best & Free password manager with 256-bit AES encryption in cloud",
  manifest: "/manifest.json",
  metadataBase: new URL("https://xypher7.vercel.app"),
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1eb55f",
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
    <AuthProvider>
      <html lang="en">
        <body className={fonty.className + " relative overflow-x-hidden"}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Suspense>
              <Navbar />
            </Suspense>
            <div className="mx-auto caret-primary">{children}</div>
            <Toaster richColors position="top-center" theme="dark" />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
