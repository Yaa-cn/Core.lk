import { useNavigate } from "react-router-dom"
import { RiHardDrive2Fill, RiMacFill, RiMouseFill, RiSignalWifi2Fill, RiSpeakerFill, RiUDiskFill } from "@remixicon/react";
import { useFilter } from "../context/FilterContext";
import TitleBar from "./TitleBar";

function Category() {

    const { setCategory } = useFilter()
    const navigate = useNavigate()
    const iconSize = 30

    const className = 'absolute text-xl sm:text-2xl font-bold md:font-black text-primary opacity-85 left-17.5 -bottom-1.5'

    return (
        <div className="px-4 sm:px-10 pb-2 sm:pb-4">
            <div className="flex flex-col gap-1.5 mt-5 mb-4 sm:mt-8 sm:mb-6">
                <TitleBar firstText={'Explore by'} secText={'categories'} />
                <p className="text-xs sm:text-sm text-neutral-500">Find exactly what you need. Browse our collections by category and discover your next favorite item.</p>
            </div>

            <div className="categoryCardCon grid grid-rows-2 gap-3 outfit overflow-x-auto grid-flow-col pb-3 ">
                <div onClick={() => { setCategory('input devices'); navigate('/shop') }} className='col-span-2 flex relative border-[1.5px] border-secondary/30 rounded-xs bg-accent px-2.5 py-0.5 cursor-pointer select-none overflow-hidden min-w-60'>
                    <div className="m-1 text-primary"><RiMouseFill size={iconSize} /></div>
                    <h6 className={`${className}`}>Input devices</h6>
                </div>
                <div onClick={() => { setCategory('audio'); navigate('/shop') }} className='flex relative border-[1.5px] border-secondary/30 rounded-xs bg-accent px-2.5 py-0.5 cursor-pointer select-none overflow-hidden min-w-60'>
                    <div className="m-1 text-primary"><RiSpeakerFill size={iconSize} /></div>
                    <h6 className={`${className}`}>Audio</h6>
                </div>
                <div onClick={() => { setCategory('display'); navigate('/shop') }} className='flex relative border-[1.5px] border-secondary/30 rounded-xs bg-accent px-2.5 py-0.5 cursor-pointer select-none overflow-hidden min-w-60'>
                    <div className="m-1 text-primary"><RiMacFill size={iconSize} /></div>
                    <h6 className={`${className}`}>Display</h6>
                </div>
                <div onClick={() => { setCategory('storage'); navigate('/shop') }} className='flex relative border-[1.5px] border-secondary/30 rounded-xs bg-accent px-2.5 py-0.5 cursor-pointer select-none overflow-hidden min-w-60'>
                    <div className="m-1 text-primary"><RiHardDrive2Fill size={iconSize} /></div>
                    <h6 className={`${className}`}>Storage</h6>
                </div>
                <div onClick={() => { setCategory('networking'); navigate('/shop') }} className='col-span-2  flex relative border-[1.5px] border-secondary/30 rounded-xs bg-accent px-2.5 py-0.5 cursor-pointer select-none overflow-hidden min-w-60'>
                    <div className="m-1 text-primary"><RiSignalWifi2Fill size={iconSize} /></div>
                    <h6 className={`${className}`}>Networking</h6>
                </div>
                <div onClick={() => { setCategory('accessories'); navigate('/shop') }} className='flex relative border-[1.5px] border-secondary/30 rounded-xs bg-accent px-2.5 py-0.5 cursor-pointer select-none overflow-hidden min-w-60'>
                    <div className="m-1 text-primary"><RiUDiskFill size={iconSize} /></div>
                    <h6 className={`${className}`}>Accessories</h6>
                </div>
            </div>
        </div>
    )
}
export default Category