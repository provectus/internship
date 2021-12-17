import React from 'react';
import { FormProvider } from 'react-hook-form';
import "./Form.css";

/**
 * Encapsulates logic of context from react-hook-form
 * @param onSubmit
 * @param methods
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function Form({ onSubmit, methods, children }) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

export default Form