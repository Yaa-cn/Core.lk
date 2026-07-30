import { useEffect, useRef, useState } from "react"
import { RiCloseCircleFill } from "@remixicon/react"
import { toast } from "sonner"
import { useProfile } from "../../context/ProfileContext"
import LocationIcon from '../../assets/icons/location.png'
import TitleBar from "../../components/TitleBar"
import Modal from "../../components/Modal"
import Loader from "../../components/Loader"

function Addresses() {

    const [visibleAddAddress, setVisibleAddAddress] = useState(false)
    const [visibleEditAddress, setVisibleEditAddress] = useState(false)
    const [addressDetails, setAddressDetails] = useState({})
    const { addresses, setAddresses, loading, addAddress, editAddress, deleteAddress, sortedAddresses } = useProfile()

    const label = useRef()
    const name = useRef()
    const phone = useRef()
    const address = useRef()
    const city = useRef()
    const district = useRef()
    const isDefault = useRef()

    const handleAddAddress = (e) => {
        e.preventDefault()
        setAddresses(prev => {
            const existAddress = prev.find(address => address.label === label.current.value)
            if (existAddress) {
                return [...prev]
            }

            if (isDefault.current.checked === true) {
                prev.forEach(address => address.isDefault = false)
            }

            return [...prev, {
                label: label.current.value,
                name: name.current.value,
                phoneNo: phone.current.value,
                address: address.current.value,
                city: city.current.value,
                district: district.current.value,
                isDefault: isDefault.current.checked
            }]
        })

        addAddress({
            label: label.current.value,
            name: name.current.value,
            phoneNo: phone.current.value,
            address: address.current.value,
            city: city.current.value,
            district: district.current.value,
            isDefault: isDefault.current.checked
        })

        setVisibleAddAddress(false)
    }

    const handleEditAddress = (e) => {
        e.preventDefault()

        setAddresses(prev => {

            if (isDefault.current.checked === true) {
                prev.forEach(address => address.isDefault = false)
            }

            return prev.map(addrs =>
                addrs._id === addressDetails._id ?
                    {
                        _id: addrs._id,
                        label: label.current.value,
                        name: name.current.value,
                        phoneNo: phone.current.value,
                        address: address.current.value,
                        city: city.current.value,
                        district: district.current.value,
                        isDefault: isDefault.current.checked
                    }
                    : addrs
            )
        })

        editAddress({
            _id: addressDetails._id,
            label: label.current.value,
            name: name.current.value,
            phoneNo: phone.current.value,
            address: address.current.value,
            city: city.current.value,
            district: district.current.value,
            isDefault: isDefault.current.checked
        })

        setVisibleEditAddress(false)
    }

    const getAddressDetails = (id) => {
        const details = addresses.find(address => address._id === id)
        setAddressDetails(details)
    }

    const capitalize = (input) => {

        if (input === undefined) return
        const words = input.split(" ")

        words.forEach(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )

        return words.join(" ")

    }

    return (
        <div>
            <div className="flex items-center ">
                <TitleBar secText={'Addresses'} showLine />
                <button onClick={() => setVisibleAddAddress(true)} className="px-4 py-2 border ml-auto border-secondary/20 rounded-[3px] w-fit bg-primary text-[10px] sm:text-xs font-medium text-white outfit uppercase cursor-pointer hover:bg-accent hover:text-secondary transition-colors">+ Add address</button>
            </div>

            {loading ? <div className="flex justify-center items-center mt-20 mb-20"><Loader /></div> :
                <>
                    {sortedAddresses.length === 0 ?
                        <div className='flex flex-col justify-center items-center gap-3 mt-20 mb-10'>
                            <img src={LocationIcon} alt="HeartIcon" className='w-25 sm:w-30' />
                            <h1 className='text-xl sm:text-2xl text-secondary outfit font-bold'>No address added yet !</h1>
                            <p className='text-xs sm:text-sm text-gray-500 w-70 text-center sm:w-fit'>Your personal location details.
                                Needed for deliveries and communication</p>
                        </div> :
                        <div className="grid gap-5 grid-col-1 md:grid-cols-2 lg:grid-cols-3 my-4">

                            {sortedAddresses.map((address, index) =>
                                <div key={index} className="flex flex-col px-5 py-3 outfit justify-between h-fit bg-accent/40 border border-secondary/20 rounded-[3px] w-full md:max-w-120">
                                    <div className="flex justify-between items-center">
                                        <h2 className="font-bold text-primary">{capitalize(address.label)}</h2>
                                        {address.isDefault && <span className="text-[10px] nunito font-bold text-primary/80 border border-secondary/20 bg-secondary/5 px-3 py-px rounded-full select-none ">Default</span>}
                                    </div>
                                    <h6 className="text-xs text-secondary/80 mt-1">{capitalize(address.name)}</h6>
                                    <p className="text-xs text-secondary/80 mt-1">{capitalize(address.address)}</p>
                                    <p className="text-xs text-secondary/80 mt-1">{address.phoneNo}</p>
                                    <div className="flex gap-3 mt-2">
                                        <button onClick={() => { setVisibleEditAddress(true); getAddressDetails(address._id) }} className="text-xs text-primary cursor-pointer">Edit</button>
                                        <button onClick={() => deleteAddress(address._id)} className="text-xs text-red-400/90 cursor-pointer">Delete</button>
                                    </div>
                                </div>
                            )}

                        </div>}
                </>}


            {/* Add Address Modal */}

            <Modal isOpen={visibleAddAddress} onClose={() => setVisibleAddAddress(false)}>

                <div className="flex justify-between">
                    <h5 className="text-sm sm:text-base outfit font-medium text-primary uppercase mb-3">Add Address <span className="text-secondary tracking-tight">______</span></h5>
                    <RiCloseCircleFill onClick={() => setVisibleAddAddress(false)} size={20} className="text-primary cursor-pointer" />
                </div>

                <form onSubmit={handleAddAddress} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="label" className="text-[10px] uppercase text-neutral-500">Label</label>
                        <input required ref={label} type="text" name="label" id="label" placeholder="Label" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="name" className="text-[10px] uppercase text-neutral-500">Name</label>
                        <input required pattern='[A-Za-z\s]+' title="Please enter letters and spaces only" ref={name} type="text" name="name" id="name" placeholder="Name" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="phone" className="text-[10px] uppercase text-neutral-500">Phone Number</label>
                        <input required pattern="^\+?\d{7,15}$" title="Enter a valid phone number" ref={phone} type="text" name="phone" id="phone" placeholder="Number" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="address" className="text-[10px] uppercase text-neutral-500">Address</label>
                        <input required ref={address} type="text" name="address" id="address" placeholder="Address" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="city" className="text-[10px] uppercase text-neutral-500">City</label>
                        <input required pattern='[A-Za-z\s]+' title="Please enter letters and spaces only" ref={city} type="text" name="city" id="city" placeholder="City" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="district" className="text-[10px] uppercase text-neutral-500">District</label>
                        <input required pattern='[A-Za-z\s]+' title="Please enter letters and spaces only" ref={district} type="text" name="district" id="district" placeholder="District" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex gap-1">
                        <input ref={isDefault} type="checkbox" name="default" id="default" className="accent-primary" />
                        <p className="text-xs text-secondary ">Set this as my default address</p>
                    </div>

                    <input type="submit" value={'Add Address'} className="px-4 py-2.5 border border-secondary/20 rounded-[3px] w-fit bg-primary text-[10px] sm:text-xs font-medium text-white outfit uppercase cursor-pointer hover:bg-accent hover:text-secondary transition-colors" />
                </form>

            </Modal>


            {/* Edit Address Modal */}


            <Modal isOpen={visibleEditAddress} onClose={() => setVisibleEditAddress(false)}>

                <div className="flex justify-between">
                    <h5 className="text-sm sm:text-base outfit font-medium text-primary uppercase mb-3">Edit Address <span className="text-secondary tracking-tight">______</span></h5>
                    <RiCloseCircleFill onClick={() => setVisibleEditAddress(false)} size={20} className="text-primary cursor-pointer" />
                </div>

                <form onSubmit={handleEditAddress} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="label" className="text-[10px] uppercase text-neutral-500">Label</label>
                        <input required ref={label} type="text" name="label" id="label" defaultValue={addressDetails.label} placeholder="Label" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="name" className="text-[10px] uppercase text-neutral-500">Name</label>
                        <input required pattern='[A-Za-z\s]+' title="Please enter letters and spaces only" ref={name} type="text" name="name" id="name" defaultValue={addressDetails.name} placeholder="Name" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="phone" className="text-[10px] uppercase text-neutral-500">Phone Number</label>
                        <input required pattern="^\+?\d{7,15}$" title="Enter a valid phone number" ref={phone} type="text" name="phone" id="phone" defaultValue={addressDetails.phoneNo} placeholder="Number" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="address" className="text-[10px] uppercase text-neutral-500">Address</label>
                        <input required ref={address} type="text" name="address" id="address" defaultValue={addressDetails.address} placeholder="Address" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="city" className="text-[10px] uppercase text-neutral-500">City</label>
                        <input required pattern='[A-Za-z\s]+' title="Please enter letters and spaces only" ref={city} type="text" name="city" id="city" defaultValue={addressDetails.city} placeholder="City" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="district" className="text-[10px] uppercase text-neutral-500">District</label>
                        <input required pattern='[A-Za-z\s]+' title="Please enter letters and spaces only" ref={district} type="text" name="district" id="district" defaultValue={addressDetails.district} placeholder="District" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex gap-1">
                        <input ref={isDefault} type="checkbox" name="default" id="default" defaultChecked={addressDetails.isDefault} className="accent-primary" />
                        <p className="text-xs text-secondary ">Set this as my default address</p>
                    </div>

                    <input type="submit" value={'Save Changes'} className="px-4 py-2.5 border border-secondary/20 rounded-[3px] w-fit bg-primary text-[10px] sm:text-xs font-medium text-white outfit uppercase cursor-pointer hover:bg-accent hover:text-secondary transition-colors" />
                </form>

            </Modal>

        </div >

    )
}
export default Addresses