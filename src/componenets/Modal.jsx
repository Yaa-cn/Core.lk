import { useEffect } from "react"

function Modal({ isOpen, onClose, children }) {

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = 'auto'
    }, [isOpen])

    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed flex justify-center items-center bg-primary/40 backdrop-blur-xs py-10 top-14 inset-0 z-40 overflow-auto">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-light px-6 sm:px-10 py-6 sm:py-10 max-w-180 w-full rounded h-fit my-auto mx-4 sm:mx-10">
                {children}
            </div>
        </div>

    )
}
export default Modal

