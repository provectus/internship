import React from "react";


export enum paths {
    HOME = "/",
    STATS = "/stats",
}

//in react-router-dom 6 we use element instead of component, no exact
const stats = React.lazy(() => import("./components/stats/Stats"));
const list = React.lazy(() => import("./components/expenses/List"));
export const routes = [
    {
        path: paths.HOME,
        element: list
    },
    {
        path: paths.STATS,
        element: stats
    },
]