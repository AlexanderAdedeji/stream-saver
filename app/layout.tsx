import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { fontSans } from "@/styles/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";
import { siteConfig } from "@/config/site";
import { TanstackProvider } from "@/components/providers/tanstack-provider";
import { Navbar } from "@/components/general/Navbar";
import { Footer } from "@/components/general/Footer";
import { ScrollToTop } from "@/components/general/ScrollToTop";

const { title, description } = siteConfig;

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanstackProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />

              <div className="flex-1">{children}</div>
              <Footer />
              <ScrollToTop />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </TanstackProvider>
  );
}
