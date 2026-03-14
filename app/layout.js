import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL("https://mtalha.me"),

  title: {
    default: "M Talha Manzoor — Full-Stack Developer",
    template: "%s — M Talha Manzoor",
  },

  description:
    "M Talha Manzoor is a Full-Stack Developer based in Lahore, Pakistan. I build premium, performant web experiences with Next.js, React, and modern backend stacks.",

  keywords: [
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "MERN Stack",
    "Web Developer Lahore",
    "Node.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "M Talha Manzoor",
    "Talha Manzoor",
  ],

  authors: [{ name: "M Talha Manzoor", url: "https://mtalha.me" }],
  creator: "M Talha Manzoor",

  // Add this after you set up Google Search Console
  // verification: {
  //   google: 'your-google-verification-code-here',
  // },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.svg',
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mtalha.me",
    siteName: "M Talha Manzoor",
    title: "M Talha Manzoor — Full-Stack Developer",
    description:
      "Premium, performant web experiences — from pixel-perfect frontends to robust full-stack architectures.",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "M Talha Manzoor — Full-Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "M Talha Manzoor — Full-Stack Developer",
    description:
      "Premium, performant web experiences — from pixel-perfect frontends to robust full-stack architectures.",
    images: ["/images/og.png"],
    creator: "@MTalha215",
  },
};

export const viewport = {
  themeColor: '#c9a84c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  // Structured data for rich snippets in search results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'M Talha Manzoor',
    alternateName: 'Talha Manzoor',
    url: 'https://mtalha.me',
    image: 'https://mtalha.me/images/og.png',
    jobTitle: 'Full-Stack Developer',
    description: 'Full-Stack Developer specializing in Next.js, React, and Node.js. Based in Lahore, Pakistan.',
    knowsAbout: [
      'Next.js',
      'React',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'MERN Stack',
      'Full-Stack Development',
      'Web Development',
      'Express.js',
      'MongoDB',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    sameAs: [
      'https://github.com/happiestt-talha',
      'https://www.linkedin.com/in/mt4lha/',
      'https://twitter.com/MTalha215',
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${jetBrainsMono.variable} noise-overlay antialiased`}
      >
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}