import React, {useEffect, Suspense} from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {routes} from "./routes";
import {useAppActions, useTypedSelector} from "./hooks/redux";
import Loading from "./components/static/Loading";

function App() {
    const {fetchCategories, fetchExpenses, convertExpenses} = useAppActions();
    const {categories} = useTypedSelector(state => state.categories);
    const {expenses} = useTypedSelector(state => state.expenses);
    useEffect(()=>{
        fetchCategories();
        fetchExpenses();
    },[])
    useEffect(() => {
        if (categories.length && expenses.length)convertExpenses(categories);
    }, [categories, expenses]);
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(route => (
                    <Route path={route.path} element={(
                        <Suspense fallback={<Loading/>}>
                            <route.element/>
                        </Suspense>
                    )} key={route.path}/>
                ))}

                <Route path="*" element={(
                    <Suspense fallback={<Loading/>}>
                        <Navigate to="/"/>
                    </Suspense>
                )}/>

            </Routes>
        </BrowserRouter>
    );
}

// - Minimalistic UI implemented to display / create / update / delete expences
// table with expenses
// - UI displays a chart that shows spending stats/statistics by month and spending category
// new route where all expenses are summed grouped by categories
export default App;
