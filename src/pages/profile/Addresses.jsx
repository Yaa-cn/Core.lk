import { useState } from "react"
import { RiCloseCircleFill } from "@remixicon/react"
import TitleBar from "../../componenets/TitleBar"

function Addresses() {

    const [visibleAddAddress, setVisibleAddAddress] = useState(false)
    const [visibleEditAddress, setVisibleEditAddress] = useState(false)

    return (
        <div>
            <div className="flex items-center ">
                <TitleBar secText={'Addresses'} showLine />
                <button onClick={() => setVisibleAddAddress(true)} className="px-4 py-2 border ml-auto border-secondary/50 rounded-[3px] w-fit bg-primary text-[10px] sm:text-xs font-medium text-white outfit uppercase cursor-pointer hover:bg-accent hover:text-secondary transition-colors">+ Add address</button>
            </div>

            <div className="my-4">

                <div className="flex flex-col px-5 py-3 outfit justify-between h-fit bg-accent/40 border border-secondary/50 rounded-[3px] max-w-120">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-primary">Home</h2>
                        <span className="text-[10px] nunito font-bold text-primary/80 border border-secondary/50 bg-secondary/5 px-3 py-0.5 rounded-full select-none ">Default</span>
                    </div>
                    <h6 className="text-xs text-secondary/80 mt-1">John Wick</h6>
                    <p className="text-xs text-secondary/80 mt-1">D184/1 Kaludemada, Hapugastalawa</p>
                    <p className="text-xs text-secondary/80 mt-1">0773939701</p>
                    <div className="flex gap-3 mt-2">
                        <button onClick={() => setVisibleEditAddress(true)} className="text-xs text-primary cursor-pointer">Edit</button>
                        <button className="text-xs text-red-400/90 cursor-pointer">Delete</button>
                    </div>
                </div>

            </div>


            {/* Add Address Modal */}

            {visibleAddAddress &&
                <div className="fixed flex justify-center items-center bg-primary/40 backdrop-blur-xs py-15 max-h-screen inset-0 top-14 z-20 overflow-auto hideBar">

                    <div className="relative bg-light px-6 sm:px-10 py-6 sm:py-10 max-w-180 w-full rounded h-fit my-auto mx-4 sm:mx-10">

                        <div className="flex justify-between">
                            <h5 className="text-sm sm:text-base outfit font-medium text-primary uppercase mb-3">Add Address <span className="text-secondary tracking-tight">______</span></h5>
                            <RiCloseCircleFill onClick={() => setVisibleAddAddress(false)} size={20} className="text-primary cursor-pointer" />
                        </div>

                        <form className="flex flex-col gap-4">

                            <div className="flex flex-col gap-0.5">
                                <label htmlFor="name" className="text-[10px] uppercase text-neutral-500">Name</label>
                                <input type="text" name="name" id="name" placeholder="Name" className="text-xs border border-secondary/50 rounded-[3px] px-4 py-3 outline-none " />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label htmlFor="phone" className="text-[10px] uppercase text-neutral-500">Phone Number</label>
                                <input type="number" name="phone" id="phone" placeholder="Number" className="text-xs border border-secondary/50 rounded-[3px] px-4 py-3 outline-none " />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label htmlFor="address" className="text-[10px] uppercase text-neutral-500">Address</label>
                                <input type="text" name="address" id="address" placeholder="Address" className="text-xs border border-secondary/50 rounded-[3px] px-4 py-3 outline-none " />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label htmlFor="city" className="text-[10px] uppercase text-neutral-500">City</label>
                                <input type="text" name="city" id="city" placeholder="City" className="text-xs border border-secondary/50 rounded-[3px] px-4 py-3 outline-none " />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label htmlFor="district" className="text-[10px] uppercase text-neutral-500">District</label>
                                <input type="text" name="district" id="district" placeholder="District" className="text-xs border border-secondary/50 rounded-[3px] px-4 py-3 outline-none " />
                            </div>

                            <div className="flex gap-1">
                                <input type="radio" name="default" id="default" className="accent-primary" />
                                <p className="text-xs text-secondary ">Set this as my default address</p>
                            </div>

                            <input type="submit" value={'Add Address'} className="px-4 py-2.5 border border-secondary/50 rounded-[3px] w-fit bg-primary text-[10px] sm:text-xs font-medium text-white outfit uppercase cursor-pointer hover:bg-accent hover:text-secondary transition-colors" />
                        </form>

                    </div>

                </div>}


            {/* Edit Address Modal */}

            {visibleEditAddress &&
                <div className="fixed flex items-center justify-center bg-primary/40 backdrop-blur-xs py-15 inset-0 top-14 z-20 max-h-screen overflow-y-auto hidebar">

                    <div className="bg-light px-6 sm:px-10 py-6 sm:py-10 max-w-180 w-full rounded my-auto mx-4 sm:mx-10">

                        <div className="flex justify-between">
                            <h5 className="text-sm sm:text-base outfit font-medium text-primary uppercase mb-3">Edit Address <span className="text-secondary tracking-tight">______</span></h5>
                            <RiCloseCircleFill onClick={() => setVisibleEditAddress(false)} size={20} className="text-primary cursor-pointer" />
                        </div>

                        <form className="flex flex-col gap-4">

                            <div className="flex flex-col gap-0.5">
                                <label htmlFor="name" className="text-[10px] uppercase text-neutral-500">Name</label>
                                <input type="text" name="name" id="name" placeholder="Name" className="text-xs border border-secondary/50 rounded-[3px] px-4 py-3 outline-none " />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label htmlFor="phone" className="text-[10px] uppercase text-neutral-500">Phone Number</label>
                                <input type="number" name="phone" id="phone" placeholder="Number" className="text-xs border border-secondary/50 rounded-[3px] px-4 py-3 outline-none " />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label htmlFor="address" className="text-[10px] uppercase text-neutral-500">Address</label>
                                <input type="text" name="address" id="address" placeholder="Address" className="text-xs border border-secondary/50 rounded-[3px] px-4 py-3 outline-none " />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label htmlFor="city" className="text-[10px] uppercase text-neutral-500">City</label>
                                <input type="text" name="city" id="city" placeholder="City" className="text-xs border border-secondary/50 rounded-[3px] px-4 py-3 outline-none " />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label htmlFor="district" className="text-[10px] uppercase text-neutral-500">District</label>
                                <input type="text" name="district" id="district" placeholder="District" className="text-xs border border-secondary/50 rounded-[3px] px-4 py-3 outline-none " />
                            </div>

                            <div className="flex gap-1">
                                <input type="radio" name="default" id="default" className="accent-primary" />
                                <p className="text-xs text-secondary ">Set this as my default address</p>
                            </div>

                            <input type="submit" value={'Save Changes'} className="px-4 py-2.5 border border-secondary/50 rounded-[3px] w-fit bg-primary text-[10px] sm:text-xs font-medium text-white outfit uppercase cursor-pointer hover:bg-accent hover:text-secondary transition-colors" />
                        </form>
                    </div>
                </div>}
        </div>

    )
}
export default Addresses