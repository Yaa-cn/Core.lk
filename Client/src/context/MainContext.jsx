import { FilterProvider } from "./FilterContext"
import { ProductsProvider } from "./ProductsContext"
import { UiProvider } from "./UiContext"
import { CartProvider } from "./CartContext"
import { WishlistProvider } from "./WishlistContext"
import { OrdersProvider } from "./OrdersContext"
import { AuthProvider } from "./AuthContext"
import { ProfileProvider } from "./ProfileContext"
import { CheckoutContext, CheckoutProvider } from "./CheckoutContext"

export const MainProvider = ({ children }) => {

    return (
        <AuthProvider>
            <OrdersProvider>
                <ProductsProvider>
                    <ProfileProvider>
                        <WishlistProvider>
                            <CartProvider>
                                <CheckoutProvider>
                                    <FilterProvider>
                                        <UiProvider>
                                            {children}
                                        </UiProvider>
                                    </FilterProvider>
                                </CheckoutProvider>
                            </CartProvider>
                        </WishlistProvider>
                    </ProfileProvider>
                </ProductsProvider>
            </OrdersProvider>
        </AuthProvider >
    )
}