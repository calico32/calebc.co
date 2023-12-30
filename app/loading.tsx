import Card from '@/app/components/Card'
import ScrollIndicator from '@/app/components/ScrollIndicator'
import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <>
      <main className="mx-auto max-w-screen-xl space-y-8 p-8 max-xs:p-6">
        <div className="relative -mt-8 flex min-h-svh flex-col items-center justify-center">
          <Card align="center" isStatic className="mb-16">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-zinc-400" />
          </Card>

          <ScrollIndicator />
        </div>
      </main>
    </>
  )
}
