import { createContext, useContext, useState } from "react";

const UiContext = createContext()

export const UiProvider = ({ children }) => {

    const [visible, setVisible] = useState(false)
    const [visibleSearchBar, setVisibleSearchBar] = useState(false)

    return (
        <UiContext.Provider value={{ visibleSearchBar, setVisibleSearchBar, visible, setVisible }}>
            {children}
        </UiContext.Provider>
    )
}

export const useUi = () => (useContext(UiContext))