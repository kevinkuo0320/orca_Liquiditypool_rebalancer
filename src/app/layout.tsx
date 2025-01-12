import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Whirlpool Positions',
  description: 'View Whirlpool positions data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 