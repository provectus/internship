import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import "./Form.css";

interface FormProps {
  onSubmit: ((data: any) => void),
  methods: UseFormReturn<any>,
  children: JSX.Element[],
}
function Form({ onSubmit, methods, children }: FormProps) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

export default Form