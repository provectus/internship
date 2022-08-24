import React from "react";

interface ErrorProps {
    message: string
}

const Error:React.FC<ErrorProps> = ({message}) => {
    return (
        <div>
            Error happened while requesting backend. Message:{message}
        </div>
    );
};

export default Error;