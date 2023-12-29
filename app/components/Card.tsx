'use client'

import { CommonProps } from '@/app/lib/types'
import clsx from 'clsx'
import { HTMLMotionProps, motion } from 'framer-motion'

type CardProps = CommonProps & {
  align?: 'left' | 'center' | 'right'
  id?: string
  isStatic?: boolean
}

export default function Card(props: CardProps) {
  const { children, className, align, id, isStatic } = props

  const Element = isStatic ? 'div' : motion.div

  const motionProps: HTMLMotionProps<'div'> = isStatic
    ? {}
    : {
        initial: { opacity: 0, scale: 0.95, translateY: 10 },
        whileInView: { opacity: 1, scale: 1, translateY: 0 },
        viewport: { margin: '20% 0% -20% 0%' },
      }

  return (
    <Element
      id={id}
      className={clsx(
        'w-fit transform rounded-lg border border-zinc-800 bg-zinc-900/70 px-8 py-6 shadow-lg backdrop-blur-sm max-xs:p-6 md:max-w-[80%]',
        className,
        // align === 'left' && 'float-left',
        align === 'center' && 'mx-auto',
        align === 'right' && 'ml-auto',
      )}
      {...(motionProps as any)}
    >
      {children}
    </Element>
  )
}
