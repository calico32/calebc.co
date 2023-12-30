import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function Page(): JSX.Element {
  return (
    <main className="mx-auto max-w-screen-md space-y-8 p-8 max-xs:p-6">
      <div className="mx-auto mt-32 transform rounded-lg border border-zinc-800 bg-zinc-900/70 px-8 py-6 shadow-lg backdrop-blur-sm max-xs:p-6 md:max-w-[80%]">
        <div className="mb-2 flex w-full items-center gap-1 max-xs:mb-0">
          <Link href="/">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-xs font-bold uppercase tracking-widest ">guestbook</h1>
        </div>

        <Loader2 className="mx-auto mt-4 h-8 w-8 animate-spin text-zinc-400" />
      </div>
    </main>
  )
}
