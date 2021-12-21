import { TableProps, Expense } from './types';
import './Table.css';
import EditableRow from 'src/components/Table/EditableRow';

export default function Table({ data, updateData, deleteData }: TableProps) {
    const commonStyles = {
        gridRowStart: 1,
        gridRowEnd: 2,
        fontFamily: "RalewayRegular",
        fontWeight: "bold",
        fontSize: "20px",
        justifySelf: "center",
        marginTop: "3%",
    }

    return <div className="table">
        <div style={{...commonStyles, gridColumnStart: 1, gridColumnEnd: 2}}> Description </div>
        <div style={{...commonStyles, gridColumnStart: 2, gridColumnEnd: 3}}> Amount </div> 
        <div style={{...commonStyles, gridColumnStart: 3, gridColumnEnd: 4}}> Category </div>
        <div style={{...commonStyles, gridColumnStart: 4, gridColumnEnd: 5}}> Date </div>
        {
            data.map(
                (expense: Expense, index) => {
                    const update = (expense: Expense) => updateData(index, expense);
                    const _delete = () => deleteData(index);
                    return <EditableRow key={index} expense={expense} index={index + 2} update={update} _delete={_delete}/>
                }
            )
        }   
    </div>
}