import { RiCheckboxCircleLine, RiInformationLine } from "@remixicon/react";

function Toast({ text, type }) {

    let className, icon = undefined
    let toastStyle = "fixed flex gap-2 items-center nunito bottom-10 right-3 sm:right-5 px-4 py-3 text-xs rounded min-w-60 sm:min-w-70 text-neutral-700 z-40"

    switch (type) {
        case 'success': className = `${toastStyle} bg-green-100 border border-green-300`;
            icon = <RiCheckboxCircleLine className="text-green-600" size={20} />;
            break;

        case 'info': className = `${toastStyle} bg-blue-100 border border-blue-300`;
            icon = <RiInformationLine className="text-blue-500" size={20}/>;
            break;
    }

    return (
        <div className={className}>
            <div>{icon}</div>
            <p>{text}</p>
        </div>
    )
}
export default Toast