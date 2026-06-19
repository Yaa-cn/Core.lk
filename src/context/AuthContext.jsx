import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'sonner'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/auth/check', {
                credentials: 'include'
            });

            const data = await res.json()

            if (data.success) {
                setUser(data.user)
            } else {
                setUser(null)
            }

        } catch (err) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const registerUser = async (formData) => {
        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData
                })
            })

            const data = await res.json()

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error('Something went wrong !')
        }
    }

    const loginUser = async (formData) => {
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...formData
                })
            })

            const data = await res.json()

            if (data.success) {
                setUser(data.user)
                toast.success(data.message)
            } else {
                setUser(null)
                toast.error(data.message)
            }

        } catch (err) {
            toast.error('Something went wrong !')
        }
    }

    const logoutUser = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })

            if (res.ok) {
                setUser(null)
            }

        } catch (err) {
            toast.error('Something went wrong !')
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, setUser, registerUser, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}