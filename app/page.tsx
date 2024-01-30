import { auth } from '@/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home () {
  const session = await auth()
  console.log(session)
  if (!session) redirect('api/auth/signin')

  if (session.user?.role === 'ADMIN') redirect('/admin')
  return (
    <div className='h-full w-full flex flex-col justify-center items-center gap-6'>
      <h1 className='text-5xl font-bold'>
        Welcome {session.user?.name}
      </h1>
      <Link href='/api/auth/signout' className='px-4 py-2 bg-slate-400 rounded-md'>Logout</Link>
    </div>
  )
}
