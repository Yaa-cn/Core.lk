import { useEffect, useState } from "react"

function TitleBar({ firstText, secText, desc, className, titleStyle = 'text-base sm:text-lg font-extrabold text-secondary', showLine }) {

    return (
        <div className={`flex gap-1 flex-col ${className}`}>
            <h4 className={`${titleStyle} uppercase`}>{firstText} <span className="text-black">{secText}</span> {showLine && <span className="text-secondary font-extrabold tracking-tight">_______</span>}</h4>
            <p className={`text-xs sm:text-sm text-neutral-500`}>{desc}</p>
        </div>
    )
}
export default TitleBar