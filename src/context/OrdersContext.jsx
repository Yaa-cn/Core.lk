import { useState, createContext, useEffect, useContext } from "react";

export const OrdersContext = createContext()

export const OrdersProvider = ({ children }) => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch("https://69eb2c9497482ad5c5273fa1.mockapi.io/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false);
      }
    }
    getOrders()
  }, [])

  return (
    <OrdersContext.Provider value={{
      orders,
      loading,
      setLoading,
    }}>
      {children}
    </OrdersContext.Provider>
  )

}

export const useOrders = () => {
  return useContext(OrdersContext);
}

// https://69eb2c9497482ad5c5273fa1.mockapi.io/api/products