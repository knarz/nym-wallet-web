import {Alert, AlertTitle} from "@material-ui/lab";
import React from "react";

export default function NoClientError () {
    return (
        <Alert severity="error">
            <AlertTitle>No client detected</AlertTitle>
            Have you signed in? Try to go back to <a href = "/">the main page</a> and try again
        </Alert>
    )
}