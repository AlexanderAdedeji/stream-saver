import type { Metadata } from "next";
import Head from "next/head";
import { cn } from "@/lib/utils";
import { fontSans } from "@/styles/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";
import { siteConfig } from "@/config/site";
import { TanstackProvider } from "@/components/providers/tanstack-provider";
import { Navbar } from "@/components/general/Navbar";
import { Footer } from "@/components/general/Footer";
import { ScrollToTop } from "@/components/general/ScrollToTop";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/sonner";

const { title, description } = siteConfig;
export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: "StreamSaver",
    description:
      "Easily download videos & images from your favorite social media platforms with StreamSaver!",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "StreamSaver",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "StreamSaver App Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamSaver",
    description:
      "Easily download videos & images from your favorite social media platforms with StreamSaver!",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}twitter-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "StreamSaver",
    url: process.env.NEXT_PUBLIC_APP_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_APP_URL}search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <TanstackProvider>
      <html lang="en" suppressHydrationWarning>
      <Head>
      <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
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

            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </TanstackProvider>
  );
}
