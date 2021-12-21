import { RowProps } from "./types";
import React from 'react';
import EditableField from "../Common/EditableField";
import editExpense from "src/lib/api/editExpense";
import deleteExpense from "src/lib/api/deleteExpense";

export default function EditableRow({ expense, index, update, _delete }: RowProps) {
    const [editing, setEditing] = React.useState<boolean>(false);
    const descriptionRef = React.useRef<HTMLInputElement | null>(null);
    const amountRef = React.useRef<HTMLInputElement | null>(null);
    const dateRef = React.useRef<HTMLInputElement | null>(null);

    const commonStyles = {
        gridRowStart: index,
        gridRowEnd: index+1,
        fontFamily: "Verdana",
        fontWeight: "light",
        justifySelf: "center",
        marginTop: "3%",
    }
    

    const handleEdit = () => {
        if (editing && descriptionRef?.current && amountRef?.current && dateRef?.current) {
            const newProps = {
                description: descriptionRef.current.value,
                amount: +amountRef.current.value,
                date: dateRef.current.value
            };
            editExpense(expense._id, {
                ...newProps,
            }).then(() => update({
                ...expense,
                ...newProps
            }));
            
        }
        setEditing((prev) => !prev)
    }

    const handleDelete = () => {
        deleteExpense(expense._id).then(_delete);
    }

    return <> 
        <div style={{...commonStyles, gridColumnStart: 1, gridColumnEnd: 2}}>
            <EditableField editing={editing} value={expense.description} inputRef={descriptionRef}/>
        </div>
        <div style={{...commonStyles, gridColumnStart: 2, gridColumnEnd: 3}}>
            <EditableField editing={editing} value={expense.amount} inputRef={amountRef}/>
        </div>
        <div style={{...commonStyles, gridColumnStart: 3, gridColumnEnd: 4}}>
            <EditableField editing={editing} value={expense.category}/>
        </div>
        <div style={{...commonStyles, gridColumnStart: 4, gridColumnEnd: 5}}>
            <EditableField editing={editing} value={expense.date} inputRef={dateRef}/>
        </div>
        <input
            type="button"
            style={{ ...commonStyles, gridColumnStart: 5, gridColumnEnd: 6 }}
            value={editing ? "Apply" : "Edit"}
            onClick={editing? handleEdit : () => setEditing(true)} 
        />
        <input
            type="button"
            style={{ ...commonStyles, gridColumnStart: 6, gridColumnEnd: 7 }}
            value="delete"
            onClick={handleDelete}
        />
    </>
}
