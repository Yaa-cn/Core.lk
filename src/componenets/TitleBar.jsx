import { useEffect, useState } from "react"

function TitleBar({ firstText, secText, className, showLine }) {

    return (
        <div>
            <h4 className={`${className} outfit text-sm sm:text-base lg:text-lg uppercase font-medium`}>{firstText} <span>{secText}</span> {showLine && <span className="text-secondary font-extrabold tracking-tight">______</span>}</h4>
        </div>
    )
}
export default TitleBar