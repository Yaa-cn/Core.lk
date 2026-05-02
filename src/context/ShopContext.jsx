import { useState, createContext, useEffect, useContext } from "react";

export const ShopContext = createContext()

export const ShopProvider = ({ children }) => {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const deleteItem = (id) => {
    setItems(items.filter((items) => items.id !== id))
  }

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch("https://69eb2c9497482ad5c5273fa1.mockapi.io/api/products");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false);
      }
    }
    getItems()
  }, [])

  return (
    <ShopContext.Provider value={{
      items,
      loading,
      setLoading,
      deleteItem,
    }}>
      {children}
    </ShopContext.Provider>
  )

}

export const useShop = () => {
  return useContext(ShopContext);
}

// https://69eb2c9497482ad5c5273fa1.mockapi.io/api/products