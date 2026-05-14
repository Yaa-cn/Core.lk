import { Toaster } from "sonner"

function Toast() {
    return (
        <Toaster
            richColors
            toastOptions={{
                classNames: {
                    toast: "bg-white! rounded! border border-secondary/50! w-80! ml-auto mr-7 mb-6 sm:w-full sm:m-0"
                }
            }} />
    )
}
export default Toast