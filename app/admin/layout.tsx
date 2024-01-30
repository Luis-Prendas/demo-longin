import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  console.log(session)
  if (!session || session.user?.role !== 'ADMIN') redirect('/')
  return (
    <main>
      {children}
    </main>
  )
}
