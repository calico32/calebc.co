import GuestbookForm from '@/app/guestbook/GuestbookForm'
import GuestbookView from '@/app/guestbook/GuestbookView'
import { getGuestLogs, getSession } from '@/app/lib/actions'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function Page(): Promise<JSX.Element> {
  const session = await getSession()
  const logs = await getGuestLogs()
  return (
    <main className="mx-auto max-w-screen-md space-y-8 p-8 max-xs:p-6">
      <div className="mx-auto mt-32 transform rounded-lg border border-zinc-800 bg-zinc-900/70 px-8 py-6 shadow-lg backdrop-blur-sm max-xs:p-6 md:max-w-[80%]">
        <div className="mb-2 flex w-full items-center gap-1 max-xs:mb-0">
          <Link href="/">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-xs font-bold uppercase tracking-widest ">guestbook</h1>
        </div>

        <h2 className="text-autoscale mb-4 mt-4">Sign the guestbook</h2>

        {session ? (
          <>
            <h3 className="mb-1 flex gap-3 text-xs text-zinc-400">
              <span>
                Signing as{' '}
                <a href={`/github/${session.githubId}`} className="hover:underline">
                  <span className="font-medium text-white">{session.name}</span> @{session.username}
                </a>
              </span>
              <span>•</span>
              <span>
                <a href="/api/logout" className="text-red-400 hover:underline">
                  <span>Sign out</span>
                </a>
              </span>
            </h3>

            <GuestbookForm logs={logs} />
          </>
        ) : (
          <div className="mb-4">
            <a
              href="/api/login"
              className="flex w-max gap-3 rounded-md border border-zinc-800 bg-black px-4 py-2 shadow-md"
            >
              <SiGithub size={20} />
              <span>Sign in with GitHub</span>
            </a>
          </div>
        )}
        <GuestbookView logs={logs} />
      </div>
    </main>
  )
}
