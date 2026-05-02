import { FilterProvider } from "./FilterContext"
import { ShopProvider } from "./ShopContext"
import { UiProvider } from "./UiContext"

export const MainProvider = ({ children }) => {

    return (
        <FilterProvider>
            <UiProvider>
                <ShopProvider>
                    {children}
                </ShopProvider>
            </UiProvider>
        </FilterProvider>
    )
}