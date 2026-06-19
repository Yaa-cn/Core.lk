import { FilterProvider } from "./FilterContext"
import { ProductsProvider } from "./ProductsContext"
import { UiProvider } from "./UiContext"
import { CartProvider } from "./CartContext"
import { WishlistProvider } from "./WishlistContext"
import { OrdersProvider } from "./OrdersContext"
import { AuthProvider } from "./AuthContext"

export const MainProvider = ({ children }) => {

    return (
        <AuthProvider>
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
        </AuthProvider >
    )
}