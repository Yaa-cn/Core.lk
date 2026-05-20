import { FilterProvider } from "./FilterContext"
import { ProductsProvider } from "./ProductsContext"
import { UiProvider } from "./UiContext"
import { CartProvider } from "./CartContext"
import { WishlistProvider } from "./WishlistContext"
import { OrdersProvider } from "./OrdersContext"
import { AuthProvider } from "./AuthContext"

export const MainProvider = ({ children }) => {

    return (
        <WishlistProvider>
            <CartProvider>
                <FilterProvider>
                    <UiProvider>
                        <OrdersProvider>
                            <AuthProvider>
                                <ProductsProvider>
                                    {children}
                                </ProductsProvider>
                            </AuthProvider>
                        </OrdersProvider>
                    </UiProvider>
                </FilterProvider>
            </CartProvider>
        </WishlistProvider>
    )
}