import { Analytics } from '@vercel/analytics/react'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Rethink_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const rethinkSans = Rethink_Sans({
  variable: '--sans',
  weight: 'variable',
  subsets: ['latin'],
})

const monaspaceNeon = localFont({
  src: './MonaspaceNeon-Regular.woff2',
  display: 'swap',
  variable: '--monospace',
})
export const metadata: Metadata = {
  title: "Hi 👋! It's Caleb",
  description: 'Full-stack developer, designer, and student. Stop by and say hi!',
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/avatar.png',
      },
    ],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://calebc.co'),
}

const javascript = (strings: TemplateStringsArray, ...values: unknown[]) =>
  String.raw({ raw: strings }, ...values)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={metadata.metadataBase!.href} />
      </head>
      <body
        className={clsx(
          rethinkSans.variable,
          monaspaceNeon.variable,
          'bg-zinc-950 font-sans text-white',
        )}
        suppressHydrationWarning
      >
        {children}
        <script src="https://unpkg.com/css-paint-polyfill" />
        <script
          dangerouslySetInnerHTML={{
            __html: javascript`
              CSS.registerProperty({
                name: "--screen-height",
                syntax: "<length>",
                inherits: false,
                initialValue: "100svh"
              });
              CSS.paintWorklet.addModule("/paint.js");
            `,
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
