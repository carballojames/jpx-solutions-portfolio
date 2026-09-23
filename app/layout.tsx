import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'James Paul U. Carballo — Full-Stack Developer',
  description: 'A digital résumé and selected work of James Paul U. Carballo, a full-stack developer based in Davao City, Philippines.',
  generator: 'v0.app',
  metadataBase: new URL('https://jpxsolution.tech'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'James Paul U. Carballo — Full-Stack Developer',
    description: 'Modern web applications, business systems, and digital experiences focused on usability and maintainability.',
    type: 'website',
    locale: 'en_PH',
    url: 'https://jpxsolution.tech',
  },
  icons: {
    icon: '/3.1.png',
    shortcut: '/3.1.png',
    apple: '/3.1.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
