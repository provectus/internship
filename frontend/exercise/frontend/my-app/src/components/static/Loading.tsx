import React from "react";
import {CircularProgress} from "@mui/material";

const Loading: React.FC = () => {

    //use disableShrink if animation is lagging
    return (
        <CircularProgress size={"100px"}/>
    );
};

export default Loading;