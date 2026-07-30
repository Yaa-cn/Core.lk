import { useEffect } from 'react'
import { createPortal } from 'react-dom'

function Modal({ isOpen, onClose, children, maxWidth = 'max-w-2xl' }) {
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm overflow-x-auto"
      onClick={onClose}
    >
      <div
        className={`relative top-10 my-20 glass-panel w-full ${maxWidth} flex flex-col justify-center overflow-x-auto rounded shadow-lg animate-fade-in`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
