import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "M Talha Manzoor — Full-Stack Developer",
    template: "%s — M Talha Manzoor",
  },
  description:
    "M Talha Manzoor is a Full-Stack Developer based in Lahore, Pakistan. I build premium, performant web experiences with Next.js, React, and modern backend stacks.",
  openGraph: {
    title: "M Talha Manzoor — Full-Stack Developer",
    description:
      "Premium, performant web experiences — from pixel-perfect frontends to robust full-stack architectures.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "M Talha Manzoor — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "M Talha Manzoor — Full-Stack Developer",
    description:
      "Premium, performant web experiences — from pixel-perfect frontends to robust full-stack architectures.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${jetBrainsMono.variable} noise-overlay antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
