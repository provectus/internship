import React, {useEffect, Suspense} from "react";
import {BrowserRouter, Route, Routes, Navigate, Link} from "react-router-dom";
import {paths, routes} from "./routes";
import {useAppActions} from "./hooks/redux";
import Loading from "./components/static/Loading";
import {AppBar, Box, Grid, Toolbar} from "@mui/material";

function App() {
    const {fetchEverything} = useAppActions();
    useEffect(() => {
        fetchEverything();
    }, []);
    const header = (
        <AppBar position="static">
            <Toolbar variant={"dense"}>
                <Grid container justifyContent={"flex-start"} alignItems={"center"}>
                    {paths.map(p => (
                        <Grid item key={p.path} xs={1}>
                            <Link to={p.path} style={{textDecoration: "none", color: "#FAA0A0"}}>{p.name}</Link>
                        </Grid>

                    ))}
                </Grid>
            </Toolbar>
        </AppBar>
    )
    return (
        <BrowserRouter>
            {header}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#F5F5DC",
                    minHeight: "calc(100vh - 64px)"
                }}
            >
                <Routes>
                    {routes.map(route => (
                        <Route key={route.path} path={route.path} element={(
                            <Suspense fallback={<Loading/>}>
                                <route.element/>
                            </Suspense>
                        )}/>
                    ))}

                    <Route path="*" element={(
                        <Suspense fallback={<Loading/>}>
                            {/*Home is first element in paths array*/}
                            <Navigate to={paths[0].path}/>
                        </Suspense>
                    )}/>
                </Routes>
            </Box>
        </BrowserRouter>

    );
}

export default App;
