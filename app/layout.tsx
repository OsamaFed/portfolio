import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import StarField from "@/components/StarField"
import { Analytics } from "@vercel/analytics/next"

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
      <body>
        <StarField />
        <Navbar />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
