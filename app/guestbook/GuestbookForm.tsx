'use client'

import { addGuestLog, getGuestLogs } from '@/app/lib/actions'
import { GuestLog } from '@prisma/client'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'

interface FormValues {
  message: string
}

interface GuestbookFormProps {
  logs: GuestLog[]
}

export default function GuestbookForm({ logs }: GuestbookFormProps): JSX.Element {
  const { data } = useSWR('guestbook', () => getGuestLogs(), {
    fallbackData: logs,
  })

  async function onSubmit(values: FormValues) {
    const log = await addGuestLog(values.message)
    if (!log) {
      toast.error("You're posting too fast! Try again later.", {
        dismissible: true,
        duration: 5000,
      })
      return
    }
    mutate('guestbook', [log, ...data])
    reset()
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()
  return (
    <form
      className={clsx('relative flex-1', errors.message ? 'mb-8' : 'mb-4')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        id="message"
        className="w-full rounded-md border border-zinc-800 bg-zinc-900/70 px-4 py-2 shadow-md ring-zinc-600 focus:outline-none focus:ring-1"
        placeholder="Leave a message"
        {...register('message', { required: "Your message can't be blank" })}
      />
      <span
        className={clsx(
          'absolute -bottom-6 left-0 text-xs text-red-500 transition',
          errors.message ? 'opacity-100' : 'opacity-0',
        )}
      >
        {errors.message?.message}
      </span>
      <button
        type="submit"
        className={clsx(
          'absolute bottom-1 right-1 top-1 flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-800 px-4 py-2 shadow-md transition hover:bg-zinc-800/50',
          isSubmitting && 'cursor-not-allowed',
        )}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign'}
      </button>
    </form>
  )
}
