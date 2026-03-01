
import './globals.css'
import { Sidebar } from './components/Sidebar'
import { getYears } from './lib/api'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const years = await getYears() // returns [2026,2025,2024,...]
  
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-black min-h-screen flex">
        <Sidebar years={years} />
        <main className="flex-1 min-h-screen min-w-0 pt-14 md:pt-0">
          {children}
        </main>
      </body>
    </html>
  )
}
