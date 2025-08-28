
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation, MobileNavigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nomad Life - Unified Platform',
  description: 'Stays, Flights, Vehicles, Drivers, Visa - All in one place',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <MobileNavigation />
      </body>
    </html>
  )
}
