import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import StarField from "@/components/StarField"

export const metadata: Metadata = {
  title: "OsamaFed — Frontend Developer",
  description: "Frontend developer specializing in React and Next.js",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StarField />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
