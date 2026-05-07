import { FilterProvider } from "./FilterContext"
import { ProductsProvider } from "./ProductsContext"
import { UiProvider } from "./UiContext"
import { CartProvider } from "./CartContext"

export const MainProvider = ({ children }) => {

    return (
        <CartProvider>
            <FilterProvider>
                <UiProvider>
                    <ProductsProvider>
                        {children}
                    </ProductsProvider>
                </UiProvider>
            </FilterProvider>
        </CartProvider>
    )
}