import { RiArrowDropLeftLine } from "@remixicon/react"
import { useNavigate } from "react-router-dom"

function BackButton({ className }) {

    const navigate = useNavigate()

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
        } else {
            navigate('/')
        }
    }

    return (
        <button onClick={() => goBack()} className={`flex nunito font-bold text-sm items-center text-secondary cursor-pointer ${className}`}><RiArrowDropLeftLine />Back</button>
    )
}
export default BackButton