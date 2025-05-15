import "./global.css";
import { baseUrl } from "@/app/sitemap";
import Footer from "@/components/footer";
import { Navbar } from "@/components/nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
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
        "font-sans text-black dark:text-white",
        lxgw.variable,
        lxgwMono.variable,
      )}
      suppressHydrationWarning
    >
      <body className="mx-4 mt-8 max-w-xl antialiased lg:mx-auto">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
