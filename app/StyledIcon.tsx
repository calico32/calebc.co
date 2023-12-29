'use client'

import {
  autoUpdate,
  offset,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'
import { IconType } from '@icons-pack/react-simple-icons'
import clsx from 'clsx'
import { ArrowUpRight } from 'lucide-react'
import { CSSProperties, useState } from 'react'

interface StyledIconProps {
  Icon: IconType
  color: string
  name: string | undefined
  link: string | undefined
}

export default function StyledIcon({ Icon, color, name, link }: StyledIconProps) {
  const [open, setOpen] = useState(false)
  const { context, floatingStyles, refs } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    placement: 'top',
    middleware: [offset(8)],
  })
  const { styles: transitionStyles, isMounted } = useTransitionStyles(context)
  const { getFloatingProps, getReferenceProps } = useInteractions([useHover(context)])

  const Element = link ? 'a' : 'div'
  const elementProps = link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <>
      <Element
        className={clsx('icon transition-colors', link && 'cursor-pointer')}
        style={
          {
            '--icon-color': color,
          } as CSSProperties
        }
        ref={refs.setReference}
        {...elementProps}
        {...getReferenceProps()}
      >
        <Icon className="w-8 sm:h-6 sm:w-6" size="100%" />
      </Element>
      {isMounted && (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
          <div
            className={clsx(
              'flex items-center gap-1 rounded bg-zinc-800 px-3 py-1',
              link ? 'text-blue-400' : 'text-white',
            )}
            style={transitionStyles}
          >
            <span>{name ?? Icon.displayName}</span>
            {link && (
              <span className={clsx('-mt-px', link ? 'text-blue-400' : 'text-zinc-300')}>
                <ArrowUpRight size={20} className="inline-block" />
              </span>
            )}
          </div>
        </div>
      )}
    </>
  )
}
