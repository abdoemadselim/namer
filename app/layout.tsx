import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'نسميه ايه؟',
  description: "نقى اسم لنجمك الصغير على كيفك ✨",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="/star.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon512x512.png" />
      </head>
      <body>
        {children}
        <Footer />
        </body>
    </html>
  )
}
