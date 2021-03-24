import { AppBar, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import Link from 'next/link'

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
    stepper: {
        padding: theme.spacing(3, 0, 5),
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

export default function MainNav() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Nym
                    </Typography>
                    <Link href="/balanceCheck">
                        <IconButton color="inherit">
                            <Typography variant="button" color="inherit" noWrap>
                                Check Balance
                            </Typography>
                        </IconButton>
                    </Link>
                    <Link href="/send">
                        <IconButton color="inherit">
                            <Typography variant="button" color="inherit" noWrap>
                                Send
                            </Typography>
                        </IconButton>
                    </Link>
                    <Link href="/bond">
                        <IconButton color="inherit">
                            <Typography variant="button" color="inherit" noWrap>
                                Bond
                            </Typography>
                        </IconButton>
                    </Link>
                    <Link href="/unbond">
                        <IconButton color="inherit">
                            <Typography variant="button" color="inherit" noWrap>
                                Unbond
                            </Typography>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}