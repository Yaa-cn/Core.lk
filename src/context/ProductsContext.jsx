import { useState, createContext, useEffect, useContext } from "react";

export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

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
    <ProductsContext.Provider value={{
      items,
      loading,
      setLoading,
    }}>
      {children}
    </ProductsContext.Provider>
  )

}

export const useProducts = () => {
  return useContext(ProductsContext);
}

// https://69eb2c9497482ad5c5273fa1.mockapi.io/api/products