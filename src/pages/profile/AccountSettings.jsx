import TitleBar from "../../componenets/TitleBar"
import { useAuth } from "../../context/AuthContext"
import { useRef } from "react"

function AccountSettings() {

    const { user, setUser } = useAuth()

    const nameInput = useRef()
    const emailInput = useRef()
    const phoneInput = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({
            name: nameInput.current.value,
            email: emailInput.current.value,
            phone: phoneInput.current.value
        })
    }

    return (
        <div>
            <div>
                <TitleBar firstText={'Account'} secText={'Settings'} showLine />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-4">

                <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] uppercase text-neutral-500 ">Full Name</label>
                    <input ref={nameInput} type="text" placeholder="Full Name" name="name" defaultValue={user.name} className="text-xs text-primary/80 px-4 py-2.5 border border-secondary/50 rounded-xs max-w-120 w-full outline-none" />
                </div>

                <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] uppercase text-neutral-500 ">Email</label>
                    <input ref={emailInput} type="email" placeholder="Email" disabled name="email" value={user.email} className="text-xs text-primary/40 px-4 py-2.5 border border-secondary/50 rounded-xs max-w-120 w-full outline-none" />
                </div>

                <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] uppercase text-neutral-500 ">Phone</label>
                    <input ref={phoneInput} type="text" placeholder="Phone" name="phone" defaultValue={user.phone} className="text-xs text-primary/80 px-4 py-2.5 border border-secondary/50 rounded-xs max-w-120 w-full outline-none transition-colors duration-300" />
                </div>

                <input type="submit" value={'Save Changes'} className="mt-2 px-4 py-2.5 border border-secondary/50 rounded-[3px] w-fit bg-primary text-[10px] sm:text-xs font-medium text-white outfit uppercase cursor-pointer hover:bg-accent hover:text-secondary transition-colors" />
            </form>
        </div>
    )
}
export default AccountSettings