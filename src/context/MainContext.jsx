import { FilterProvider } from "./FilterContext"
import { ProductsProvider } from "./ProductsContext"
import { UiProvider } from "./UiContext"
import { CartProvider } from "./CartContext"
import { WishlistProvider } from "./WishlistContext"
import { OrdersProvider } from "./OrdersContext"

export const MainProvider = ({ children }) => {

    return (
        <WishlistProvider>
            <CartProvider>
                <FilterProvider>
                    <UiProvider>
                        <OrdersProvider>
                            <ProductsProvider>
                                {children}
                            </ProductsProvider>
                        </OrdersProvider>
                    </UiProvider>
                </FilterProvider>
            </CartProvider>
        </WishlistProvider>
    )
}