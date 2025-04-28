import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import localFont from "next/font/local";

const lxgw = localFont({
  src: [
    {
      path: "./_fonts/LxgwWenKaiLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./_fonts/LxgwWenKaiRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/LxgwWenKaiMedium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  preload: true,
});

const lxgwMono = localFont({
  src: [
    {
      path: "./_fonts/LxgwWenKaiLightMono.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/LxgwWenKaiRegularMono.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/LxgwWenKaiMediumMono.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "启阳的编程手札",
    template: "%s | 启阳的编程手札",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "启阳的编程手札",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "启阳的编程手札",
    locale: "zh_Hans",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        lxgw.className,
        lxgwMono.className
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
