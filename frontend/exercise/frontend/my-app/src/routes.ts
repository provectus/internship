import React from "react";


enum pathStrings {
    HOME = "/",
    STATS = "/stats",
}
interface Home {
    path: pathStrings.HOME
}
interface Stats {
    path: pathStrings.STATS
}
type Path = (Home | Stats) & {name: string}

export const paths: Path[] = [
    {
        path: pathStrings.HOME,
        name: "Home"
    },
    {
        path: pathStrings.STATS,
        name: "Statistics"
    }
]
//in react-router-dom 6 we use element instead of component, no exact
const stats = React.lazy(() => import("./components/stats/Stats"));
const list = React.lazy(() => import("./components/expenses/List"));
export const routes = [
    {
        path: pathStrings.HOME,
        element: list
    },
    {
        path: pathStrings.STATS,
        element: stats
    },
]