import React from 'react';

export interface EditableFieldProps{
    value: string | number;
    editing: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
}