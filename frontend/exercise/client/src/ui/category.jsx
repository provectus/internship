import React from "react"
import PropTypes from "prop-types"
import { useCategories } from "../hooks/useCategories"

const Category = ({ id }) => {
    const { category } = useCategories()

    const currentCategory = category.filter((cat) => cat._id === id)

    return (
        <>
            {currentCategory.map((cat) => (
                <span key={cat._id}>{cat.title}</span>
            ))}
        </>
    )
}

Category.propTypes = {
    id: PropTypes.string.isRequired
}

export default Category
