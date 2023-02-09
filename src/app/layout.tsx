import './globals.css'
import { Poppins } from '@next/font/google'
import Providers from '@/providers'

const font = Poppins({
  subsets: ['latin'],
  preload: true,
  weight: ['200', '400', '700', '900'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${font.className}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='bg-[url("/beams.jpg")] bg-cover bg-center'>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  )
}
