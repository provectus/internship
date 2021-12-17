import {BarChart, Bar, XAxis, Tooltip} from 'recharts';
import type {_expense, _category} from '../../App';
import '../../style.css';

function Charts ({expenses, categories} : {expenses : _expense[], categories : _category[]}) {
    const arr = categories.map((category) => expenses.reduce<number>((old, curr) => curr.category === category._id? old + curr.amount: old, 0));

    const data = arr.map((value, index) => { return {category : categories[index].title, Spent : value}});

    return (
        <div>
            <hr className = "line"></hr>
            <div className = "charts-wrapper">
                <div className = "chart-labels">Expenses By Category:</div>
                <BarChart width={1300} height={300} data={data}>
                    <Bar dataKey="Spent" fill="#000000" />
                    <XAxis dataKey="category" />
                    <Tooltip />
                </BarChart>
            </div>
        </div>
    );  
}

export default Charts;
