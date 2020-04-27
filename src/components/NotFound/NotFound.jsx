import React from "react";

export const NotFound = ({ text }) => {
    return (
        <div style={{
            "display": "flex",
            "flexDirection": "column"}}>
            <h1 style={{
                "display": "flex",
                "flexDirection": "row",
                "justifyContent": "space-around"}}>404</h1>
            <h3 style={{"display": "flex",
                "flexDirection": "row",
                "justifyContent": "space-around"}}>{text}</h3>
        </div>
    );
};