import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "@/app/components/nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/app/components/footer";
import { baseUrl } from "@/app/sitemap";
import localFont from "next/font/local";
import Script from "next/script";

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
  variable: "--font-lxgw",
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
  variable: "--font-lxgwMono",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "启阳的编程手札",
    template: "%s | 启阳的编程手札",
  },
  description: "记录了本人学习编程的所思及所得。",
  openGraph: {
    title: "启阳的编程手札",
    description: "记录了本人学习编程的所思及所得。",
    url: baseUrl,
    siteName: "启阳的编程手札",
    images: [`${baseUrl}/og`],
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
        "text-black bg-white dark:text-white dark:bg-black font-sans",
        lxgw.variable,
        lxgwMono.variable,
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
          <Script
            src="http://182.92.194.101:3001/script.js"
            data-website-id="ab0b7295-ef83-4ba9-867d-8c371ef97d12"
          />
        </main>
      </body>
    </html>
  );
}
