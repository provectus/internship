import React, { useContext, useEffect, useState } from "react"
import categoriesService from "../services/categories.service"
import PropTypes from "prop-types"
import { toast } from "react-toastify"

const CategoryContext = React.createContext()

export const useCategories = () => {
    return useContext(CategoryContext)
}

const CategoriesProvider = ({ children }) => {
    const [category, setCategory] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getCategory()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    async function getCategory() {
        try {
            const content = await categoriesService.get()
            setCategory(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    return (
        <CategoryContext.Provider value={{ category }}>
            {children}
        </CategoryContext.Provider>
    )
}

CategoriesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default CategoriesProvider
