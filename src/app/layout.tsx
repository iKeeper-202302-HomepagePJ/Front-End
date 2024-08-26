import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './ComponentsHeader'
import Footer from './ComponentFooter';
import "./globals.css";
import ReduxProvider from './redux/provider';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'i-Keeper Homepage',
  description: 'i-Keeper 홈페이지',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ''}>
        <main className='bg-black w-screen w- h-auto flex justify-center'>
          <ReduxProvider>
            <div className='w-3/4 max-w-[1450px] h-auto flex-col space-y-[70px]'>
              <div className='min-h-screen w-full '>{children}</div>
              <Footer />
            </div>
          </ReduxProvider>
        </main>
      </body>
    </html>
  )
}
