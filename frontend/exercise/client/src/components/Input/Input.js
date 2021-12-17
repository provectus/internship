import React from 'react'
import "./Input.css";
import { useController } from 'react-hook-form'

/**
 * Encapsulates registering react-hook-form input and displays errors
 * @param name
 * @param control
 * @param rules
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
function Input({ name, control, rules, type, options, ...rest }) {
  const { field, fieldState } = useController({ name, control, rules })

  if (type === 'select') {
    return (
      <div>
        <select placeholder={name} {...field} {...rest}>
          <option key='0' value='0' disabled>Select the category</option>
          {options.map((option) => (
            <option key={option._id} value={option._id}>{option.title}</option>
          ))}
        </select>
        {fieldState.error && <p>{fieldState.error.message}</p>}
      </div>
    )
  }
  return (
    <div>
      <input type={type} placeholder={name} {...field} {...rest} />
      {fieldState.error && <p>{fieldState.error.message}</p>}
    </div>
  )
}

export default Input
