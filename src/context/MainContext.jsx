import { FilterProvider } from "./FilterContext"
import { ProductsProvider } from "./ProductsContext"
import { UiProvider } from "./UiContext"
import { CartProvider } from "./CartContext"
import { WishlistProvider } from "./WishlistContext"

export const MainProvider = ({ children }) => {

    return (
        <WishlistProvider>
            <CartProvider>
                <FilterProvider>
                    <UiProvider>
                        <ProductsProvider>
                            {children}
                        </ProductsProvider>
                    </UiProvider>
                </FilterProvider>
            </CartProvider>
        </WishlistProvider>
    )
}