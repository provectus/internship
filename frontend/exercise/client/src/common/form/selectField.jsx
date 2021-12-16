import React from "react"
import PropTypes from "prop-types"

const SelectField = ({
    name,
    label,
    value,
    onChange,
    defaultOption,
    options
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select id={name} name={name} value={value} onChange={handleChange}>
                <option disabled value="">
                    {defaultOption}
                </option>
                {options &&
                    options.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
        </div>
    )
}

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string
}

export default SelectField
