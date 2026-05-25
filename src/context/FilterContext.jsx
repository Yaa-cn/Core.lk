import { useState, useContext, createContext, useEffect } from "react";

const FilterContext = createContext()

export const FilterProvider = ({ children }) => {

    const [category, setCategory] = useState("all")
    const [sortBy, setSortBy] = useState(null)

    useEffect(() => {
        scrollTo({ top: 0, behavior: 'smooth' })
    }, [category, sortBy])

    const sortList = (method) => {
        setSortBy(prev => (prev === null ? method : prev !== method ? method : null))
    }

    return (
        <FilterContext.Provider value={{ category, setCategory, sortBy, sortList }}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => (useContext(FilterContext))