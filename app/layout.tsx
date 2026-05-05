import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import StarField from "@/components/StarField"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: {
    default: "OsamaFed — Frontend Developer",
    template: "%s | OsamaFed",
  },
  description: "Frontend developer specializing in React and Next.js. Building fast, clean, and accessible web experiences.",
  metadataBase: new URL("https://osamafed.vercel.app"),
  openGraph: {
    title: "OsamaFed — Frontend Developer",
    description: "Frontend developer specializing in React and Next.js. Building fast, clean, and accessible web experiences.",
    url: "https://osamafed.vercel.app",
    siteName: "OsamaFed",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OsamaFed — Frontend Developer",
    description: "Frontend developer specializing in React and Next.js. Building fast, clean, and accessible web experiences.",
    creator: "@osamafed",
  },
  robots: {
    index: true,
    follow: true,
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
