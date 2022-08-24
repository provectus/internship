import React, {FC, useEffect} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {Bar} from "react-chartjs-2";
import {useAppActions, useTypedSelector} from "../../hooks/redux";
import Error from "../static/Error";
import Loading from "../static/Loading";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Expenses by month",
        },
    },
};
const Stats: FC = () => {
    const {calculateStatistics} = useAppActions();
    const {error, loading, stats, calculated, expenses} = useTypedSelector(state => state.expenses);
    const categoriesState = useTypedSelector(state => state.categories);
    const loadingCategories = categoriesState.loading;
    const errorCategories = categoriesState.error;
    const categories = categoriesState.categories;
    useEffect(()=>{
        if(expenses.length && categories.length)calculateStatistics(expenses, categories);
    },[categories, expenses]);

    if (error || errorCategories) return <Error message={error || errorCategories}/>;
    if (loading || loadingCategories || !calculated) return <Loading/>;

    return (
            <Bar options={options} data={stats}/>
    );
};

export default Stats;