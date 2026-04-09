import type { Metadata } from "next"
import "./globals.css"
import ThemeProvider from "@/components/layout/ThemeProvider"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import StarField from "@/components/StarField"

export const metadata: Metadata = {
  title: "OsamaFed — Frontend Developer",
  description: "Frontend developer specializing in React and Next.js",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {/* <StarField /> */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
