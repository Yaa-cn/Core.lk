import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import LoginPage from "./LoginPage"

function Profile() {

  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-10 mx-4 my-5 sm:mx-10 sm:my-10">

      <div className="flex justify-between items-center gap-6 bg-accent border border-secondary/50 outfit rounded-[3px] px-8 py-6 ">
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
          <div className="flex gap-6 text-xs outfit text-neutral-500">
            {[['accountsettings', 'Settings'], ['myorders', 'My Orders'], ['addresses', 'Addresses']].map(([path, label]) => (
              <NavLink key={path} to={path} end className={`${location.pathname === `/profile/${path}` ? 'text-secondary border-b-3 border-secondary' : ''} pb-2 cursor-pointer`}>{label}</NavLink>))}
            <button onClick={() => navigate('/login')} className="text-xs outfit text-red-400/90 pb-2 ml-auto mr-0.5 cursor-pointer">Logout</button>
          </div>
          <hr className="border-neutral-300" />
        </div>
        <Outlet />
      </div>

    </div>
  )
}
export default Profile