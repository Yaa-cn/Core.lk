import { useNavigate } from "react-router-dom"
import { RiHardDrive2Fill, RiMacFill, RiMouseFill, RiSignalWifi2Fill, RiSpeakerFill, RiUDiskFill } from "@remixicon/react";
import { useFilter } from "../context/FilterContext";

function Category() {

    const { setCategory } = useFilter()
    const navigate = useNavigate()
    const iconSize = 30

    return (
        <div className="categoryCardCon grid grid-rows-2 gap-4 px-6 sm:px-10 overflow-x-auto grid-flow-col pb-4">
            <div onClick={() => { setCategory('input devices'); navigate('/shop') }} className="categoryCard col-span-2">
                <div className="m-1"><RiMouseFill size={iconSize} /></div>
                <h6 className="text-xl sm:text-2xl">Input devices</h6>
            </div>
            <div onClick={() => { setCategory('audio'); navigate('/shop') }} className="categoryCard">
                <div className="m-1"><RiSpeakerFill size={iconSize} /></div>
                <h6 className="text-xl sm:text-2xl">Audio</h6>
            </div>
            <div onClick={() => { setCategory('display'); navigate('/shop') }} className="categoryCard">
                <div className="m-1"><RiMacFill size={iconSize} /></div>
                <h6 className="text-xl sm:text-2xl">Display</h6>
            </div>
            <div onClick={() => { setCategory('storage'); navigate('/shop') }} className="categoryCard">
                <div className="m-1"><RiHardDrive2Fill size={iconSize}/></div>
                <h6 className="text-xl sm:text-2xl">Storage</h6>
            </div>
            <div onClick={() => { setCategory('networking'); navigate('/shop') }} className="categoryCard col-span-2">
                <div className="m-1"><RiSignalWifi2Fill size={iconSize}/></div>
                <h6 className="text-xl sm:text-2xl">Networking</h6>
            </div>
            <div onClick={() => { setCategory('accessories'); navigate('/shop') }} className="categoryCard">
                <div className="m-1"><RiUDiskFill size={iconSize}/></div>
                <h6 className="text-xl sm:text-2xl">Accessories</h6>
            </div>
        </div>
    )
}
export default Category