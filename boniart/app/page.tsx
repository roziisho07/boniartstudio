import { redirect } from 'next/navigation'
import { getLatestYear } from './lib/api'


export default async function Home() {
  const latestYear = await getLatestYear() // 2026 or highest
  redirect(`/year/${latestYear}`)
}