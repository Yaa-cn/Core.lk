import { FilterProvider } from "./FilterContext"
import { ShopProvider } from "./ShopContext"
import { UiProvider } from "./UiContext"
import { CartProvider } from "./CartContext"

export const MainProvider = ({ children }) => {

    return (
        <CartProvider>
            <FilterProvider>
                <UiProvider>
                    <ShopProvider>
                        {children}
                    </ShopProvider>
                </UiProvider>
            </FilterProvider>
        </CartProvider>
    )
}