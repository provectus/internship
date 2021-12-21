import { EditableFieldProps } from "./types"
import React from 'react';

export default function EditableField({ value, editing, inputRef }: EditableFieldProps) {
    const [valueState, setValueState] = React.useState<(string | number)>(value);

    React.useEffect(() => {
        if (valueState !== value) {
            setValueState(valueState);
        }
    }, [value, valueState])

    return <>
        {editing && <input type="text" value={valueState} ref={inputRef}
            onChange={(e) => setValueState(e.target.value)} />}
        { !editing && value }
    </>
}