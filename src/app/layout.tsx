import type { Metadata } from 'next'
import Header from './components/Header'
import CartIcon from './components/CartIcon'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'PubliCore',
  description: 'Agencia creativa digital - PubliCore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <Header />
          <main className="app">{children}</main>
          <CartIcon />
        </LanguageProvider>
      </body>
    </html>
  )
}