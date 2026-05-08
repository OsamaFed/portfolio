import type { Metadata } from "next"
import { JetBrains_Mono, Outfit } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import StarField from "@/components/StarField"
import { Analytics } from "@vercel/analytics/next"

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "OsamaFed – Frontend Developer",
    template: "%s | OsamaFed",
  },
  description: "Frontend developer specializing in React, Next.js, and modern web technologies",
  applicationName: "OsamaFed",
  metadataBase: new URL("https://osamafedportfolio.vercel.app"),
  openGraph: {
    title: "OsamaFed – Frontend Developer",
    description: "Frontend developer specializing in React, Next.js, and modern web technologies",
    url: "https://osamafedportfolio.vercel.app",
    siteName: "OsamaFed",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/avatar.jpeg",
        width: 1200,
        height: 630,
        alt: "OsamaFed – Frontend Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OsamaFed – Frontend Developer",
    description: "Frontend developer specializing in React, Next.js, and modern web technologies",
    creator: "@osamafed",
    site: "@osamafed",
    images: ["/avatar.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OsamaFed",
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable} ${outfit.variable}`}>
        <StarField />
        <Navbar />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
