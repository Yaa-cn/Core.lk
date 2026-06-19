import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Loader from "../components/Loader"


function ProtectedRoute({ children }) {

    const { user, loading } = useAuth()

    if (loading) {
        return <div className="grid h-screen place-content-center"><Loader /></div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children

}
export default ProtectedRoute