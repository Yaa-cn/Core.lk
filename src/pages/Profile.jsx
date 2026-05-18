import { useState, useRef } from "react"
import TitleBar from "../componenets/TitleBar"

function Profile() {

  const [activeSection, setActiveSection] = useState('settings')

  const [user, setUser] = useState({
    name: 'John Wick',
    email: 'Johnn@gmail.com',
    phone: '0773939701'
  })

  const nameInput = useRef()
  const emailInput = useRef()
  const phoneInput = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser({
      name: nameInput.current.value,
      email: emailInput.current.value,
      phone: phoneInput.current.value
    }
    )
  }

  return (
    <div className="flex flex-col gap-10 mx-4 my-5 sm:mx-10 sm:my-10">

      <div className="flex justify-between items-center gap-6 bg-accent border border-secondary/50 rounded px-8 py-6 ">
        <div className="grid place-items-center uppercase bg-secondary text-white border border-primary rounded-full w-14 h-14 text-2xl font-bold">
          <span>{user.name?.charAt(0)}</span>
        </div>
        <div className="mr-auto">
          <h1 className="text-xl font-extrabold text-primary">{user.name}</h1>
          <p className="text-xs text-neutral-500">{user.email}</p>
        </div>

      </div>

      <div className="flex flex-col gap-5">

        <div className="flex flex-col">
          <div className="flex gap-6 text-xs nunito font-medium text-neutral-500">
            {[['settings', 'Settings'], ['myOrders', 'My Orders'], ['addresses', 'Addresses']].map(([id, label]) => (
              <button key={id} onClick={() => setActiveSection(id)} className={`${activeSection === id ? 'text-secondary border-b-3 border-primary' : ''} pb-2 cursor-pointer`}>{label}</button>))}
            <button className="text-xs text-red-400 pb-2 ml-auto mr-0.5 cursor-pointer">Logout</button>
          </div>
          <hr className="border-neutral-300" />
        </div>

        <div className={`${activeSection === 'settings' ? 'block' : 'hidden'}`}>
          <div>
            <TitleBar firstText={'Account'} secText={'Settings'} showLine />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-4">

            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] uppercase text-neutral-500 ">Full Name</label>
              <input ref={nameInput} type="text" placeholder="Full Name" name="name" defaultValue={user.name} className="text-xs text-primary px-4 py-2 border border-secondary/50 rounded-xs max-w-120 w-full outline-none" />
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] uppercase text-neutral-500 ">Email</label>
              <input ref={emailInput} type="email" placeholder="Email" name="email" defaultValue={user.email} className="text-xs text-primary px-4 py-2 border border-secondary/50 rounded-xs max-w-120 w-full outline-none" />
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] uppercase text-neutral-500 ">Phone</label>
              <input ref={phoneInput} type="text" placeholder="Phone" name="phone" defaultValue={user.phone} className="text-xs text-primary px-4 py-2 border border-secondary/50 rounded-xs max-w-120 w-full outline-none" />
            </div>

            <input type="submit" value={'Save Changes'} className="text-xs px-4 py-2 border border-secondary/50 rounded-xs w-fit bg-secondary text-white font-medium cursor-pointer hover:bg-transparent hover:text-neutral-400 transition-colors" />
          </form>
        </div>

        <div className={`${activeSection === 'myOrders' ? 'block' : 'hidden'}`}>
          <div>
            <TitleBar firstText={'Order'} secText={'History'} showLine />
          </div>
        </div>

        <div className={`${activeSection === 'addresses' ? 'block' : 'hidden'}`}>
          <div>
            <TitleBar secText={'Addresses'} showLine />
          </div>
        </div>

      </div>

    </div>
  )
}
export default Profile