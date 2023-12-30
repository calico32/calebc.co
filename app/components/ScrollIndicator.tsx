'use client'

import { m } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function ScrollIndicator(): JSX.Element {
  return (
    <m.div
      className="absolute bottom-4 left-0 right-0 flex flex-col items-center justify-center gap-0 uppercase tracking-widest text-zinc-500"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{
        margin: '-75% 0% 0% 0%',
      }}
    >
      <span>Scroll for more</span>
      <ChevronDown strokeWidth={1} size={36} className="scroll-animate" />
    </m.div>
  )
}
