import React from "react"
import _ from "lodash"
import PropTypes from "prop-types"

const Pagination = ({ onPageChange, itemsCount, pageSize, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize)

    if (pageCount === 1) return null

    const pages = _.range(1, pageCount + 1)

    return (
        <>
            <nav className="">
                <ul className="pagination flex-wrap">
                    {pages.map((page) => (
                        <li
                            className={
                                "page-item" +
                                (page === currentPage ? "active" : "")
                            }
                            key={page}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
}

export default Pagination
