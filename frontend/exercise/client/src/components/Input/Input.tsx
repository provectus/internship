import React from 'react'
import "./Input.css";
import { useController, Control, RegisterOptions } from 'react-hook-form'
import { CategoryInterface } from '../../types'

interface InputProps {
  name: string,
  control: Control<any> | undefined,
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  type: string,
  options?: CategoryInterface[],
}


function Input({ name, control, rules, type, options, ...rest }: InputProps) {
  const { field, fieldState } = useController({ name, control, rules })

  if (type === 'select') {
    if (!options) options = []
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
