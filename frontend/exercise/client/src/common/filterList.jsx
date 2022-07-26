import React from "react"
import PropTypes from "prop-types"

const FilterList = ({ items, onItemSelect, onClear }) => {
    return (
        <ul className="list-group dropdown-menu">
            {items.map((i) => (
                <li
                    key={i._id}
                    className="list-group-item dropdown-item"
                    onClick={() => onItemSelect(i)}
                    role="button"
                >
                    {i.title}
                </li>
            ))}
            <button className="btn btn-secondary mt-2" onClick={onClear}>
                Clear filter
            </button>
        </ul>
    )
}

FilterList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func,
    onClear: PropTypes.func
}

export default FilterList
