import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { toast } from 'sonner'

export const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {

    const API_URL = import.meta.env.VITE_API_URL
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const [addresses, setAddresses] = useState([])

    const changeUserName = async (formData) => {
        try {
            const res = await fetch(API_URL + '/api/user', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...formData
                })
            })

            const data = await res.json()

            if (!data.success) {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error('Something went wrong !')
        }
    }

    const fetchAddress = async () => {
        try {
            const res = await fetch(API_URL + '/api/address', {
                credentials: 'include'
            })

            const data = await res.json()

            if (res.ok) {
                setAddresses(data.addresses[0].list || [])
            }
        } catch (err) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!user) return
        fetchAddress()
    }, [user])

    const addAddress = async (formData) => {
        try {
            const res = await fetch(API_URL + '/api/address', {
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
                toast.success(data.message)
            }

            if (res.status === 409) {
                toast.info(data.message)
            }

        } catch (err) {
            toast.error('Something went wrong !')
        }
    }

    const editAddress = async (formData) => {
        try {
            const res = await fetch(API_URL + `/api/address/${formData._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...formData
                })
            })

            const data = await res.json()

            if (!data.success) {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error(err.message)
        }
    }

    const deleteAddress = async (id) => {
        if (user) {

            setAddresses(addresses =>
                addresses.filter(address => address._id !== id)
            )

            try {
                const res = await fetch(API_URL + `/api/address/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })

            } catch (err) {
                console.error(err.message)
                toast.error('Somthing went wrong !')
            }

        }
    }

    return (
        <ProfileContext.Provider value={{ addresses, setAddresses, loading, changeUserName, addAddress, editAddress, deleteAddress }}>
            {children}
        </ProfileContext.Provider>
    )

}

export const useProfile = () => {
    return useContext(ProfileContext)
}