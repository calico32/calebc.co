'use client'

import { LazyMotion as FramerLazyMotion } from 'framer-motion'
import { ReactNode } from 'react'

const loadFeatures = () => import('./features').then((res) => res.default)

export default function LazyMotion({ children }: { children: ReactNode }): JSX.Element {
  return (
    <FramerLazyMotion features={loadFeatures} strict>
      {children}
    </FramerLazyMotion>
  )
}
