import { useEffect, useState } from "react"

function TitleBar({ firstText, secText, className, showLine }) {

    return (
        <div>
            <h4 className={`${className} uppercase`}>{firstText} <span className="text-black">{secText} </span>{showLine && <span className="text-secondary font-extrabold tracking-tight">_______</span>}</h4>
        </div>
    )
}
export default TitleBar