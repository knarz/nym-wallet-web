import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Link from 'next/link'
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import { ValidatorClientContext } from "../contexts/ValidatorClient";
import { ADMIN_ADDRESS } from "../pages/_app";

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

    const { client } = useContext(ValidatorClientContext)

    let adminPageDisplayed = false

    if (client !== null && client.address === ADMIN_ADDRESS) {
        adminPageDisplayed = true
    }

    return (
        <React.Fragment>
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Nym
                    </Typography>
                    <Link href="/balanceCheck">
                        <Button color="inherit">
                            <Typography variant="button" color="inherit" noWrap>
                                Check Balance
                            </Typography>
                        </Button>
                    </Link>
                    <Link href="/send">
                        <Button color="inherit">
                            <Typography variant="button" color="inherit" noWrap>
                                Send
                            </Typography>
                        </Button>
                    </Link>
                    <Link href="/bond">
                        <Button color="inherit">
                            <Typography variant="button" color="inherit" noWrap>
                                Bond
                            </Typography>
                        </Button>
                    </Link>
                    <Link href="/unbond">
                        <Button color="inherit">
                            <Typography variant="button" color="inherit" noWrap>
                                Unbond
                            </Typography>
                        </Button>
                    </Link>

                    { adminPageDisplayed && <Link href="/admin">
                        <Button color="inherit" startIcon={<VpnKeyIcon />}>
                            <Typography variant="button" color="inherit" noWrap>
                                Admin
                            </Typography>
                        </Button>
                    </Link> }

                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}