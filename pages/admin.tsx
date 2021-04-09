import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { ValidatorClientContext } from "../contexts/ValidatorClient";
import { printableCoin } from "@nymproject/nym-validator-client";
import MainNav from "../components/MainNav";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import NoClientError from "../components/NoClientError";
import Confirmation from "../components/Confirmation";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function Admin() {
    const classes = useStyles();

    const { client } = useContext(ValidatorClientContext)

    return (
        <React.Fragment>
            <MainNav />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Contract control
                    </Typography>

                    {client === null ?
                        (
                            <NoClientError />
                        ) : (
                            <React.Fragment>
                               <h1> here be admin stuff </h1>
                            </React.Fragment>
                        )
                    }
                </Paper>
            </main>
        </React.Fragment >
    )
}