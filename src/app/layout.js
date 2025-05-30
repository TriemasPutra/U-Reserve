import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "U-Reserve",
  description: "Generated by hearth Team 1",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.ico", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
  },
  generator: "next.js",
  category: "education",
  referrer: "origin-when-cross-origin",
  authors: [
    {
      name: "Team 1",
      url: "https://u-reserve.vercel.app/",
    },
  ],
  creator: "Team 1",
  manifest: "https://u-reserve.vercel.app/manifest.json",
  publisher: "U-Reserve",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  keywords: [
    "U-Reserve",
    "Ukrida",
    "Reserve",
    "Reservasi ruangan kampus",
    "Kampus",
    "UKRIDA",
    "Kelompok 1",
    "Jujutsu Kaisen",
    "Meme",
  ],
  openGraph: {
    type: "website",
    title: "U-Reserve",
    description: "Generated by hearth Team 1",
    url: "https://u-reserve.vercel.app",
    siteName: "U-Reserve",
    images: [
      {
        url: "https://u-reserve.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "U-reserve logo",
      },
    ],
    locale: "id_ID",
  },
  alternates: {
    canonical: "https://u-reserve.vercel.app/",
    languages: {
      "id-ID": "https://u-reserve.vercel.app/id",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@u-reserve",
    creator: "@u-reserve",
    title: "U-Reserve",
    description: "Generated by hearth Team 1",
    images: ["https://u-reserve.vercel.app/favicon.ico"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
