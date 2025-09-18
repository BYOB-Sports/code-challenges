import React, { useEffect } from 'react'

type Props = {
  message: string
  open: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, open, onClose, duration = 2000 }: Props) {
  useEffect(() => {
    if (!open) return
    const id = setTimeout(onClose, duration)
    return () => clearTimeout(id)
  }, [open, duration, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-x-0 bottom-4 px-4 z-50">
      <div className="mx-auto max-w-screen-sm rounded-2xl bg-slate-800 border border-slate-700 px-4 py-3 text-sm text-slate-100 shadow-lg">
        {message}
      </div>
    </div>
  )
}
