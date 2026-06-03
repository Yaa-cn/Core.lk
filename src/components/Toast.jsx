import { Toaster } from "sonner"

function Toast() {
    return (
        <Toaster
            richColors
            toastOptions={{
                classNames: {
                    toast: "bg-white! outfit rounded! border border-secondary/20! w-80! ml-auto mr-7 mb-6 sm:w-full sm:m-0"
                }
            }} />
    )
}
export default Toast