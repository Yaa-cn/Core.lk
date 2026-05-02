import { createContext, useContext, useState } from "react";

const UiContext = createContext()

export const UiProvider = ({ children }) => {

    const [visibleSearchBar, setVisibleSearchBar] = useState(false)

    return (
        <UiContext.Provider value={{visibleSearchBar, setVisibleSearchBar}}>
            {children}
        </UiContext.Provider>
    )
}

export const useUi = () => (useContext(UiContext))