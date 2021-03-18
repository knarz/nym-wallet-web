import React, {useContext, useEffect} from "react";
import MainNav from "../components/MainNav";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import ValidatorClient from "../../nym/clients/validator";
import Confirmation from "../components/Confirmation";
import RefreshIcon from "@material-ui/icons/Refresh"
import {ValidatorClientContext} from "../contexts/ValidatorClient";
import NoClientError from "../components/NoClientError";
import BondMixnodeForm from "../components/bond/BondMixnodeForm";

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


export default function CheckBalance() {
    const classes = useStyles();

    const {client} = useContext(ValidatorClientContext)

    useEffect(() => {
        const updateBalance = async () => {
            await getBalance()
        }
        updateBalance()
    }, [])

    const [balanceCheckStarted, setBalanceCheckStarted] = React.useState(false)
    const [balanceCheckFinished, setBalanceCheckFinished] = React.useState(false)
    const [balanceCheckError, setBalanceCheckError] = React.useState(null)
    const [accountBalance, setAccountBalance] = React.useState("")
    const [accountBalanceDenom, setAccountBalanceDenom] = React.useState("")

    const getBalance = async () => {
        setBalanceCheckFinished(false)
        setBalanceCheckStarted(true)

        console.log(`using the context client, our address is ${client.address}`);

        client.getBalance(client.address).then(value => {
            setAccountBalance(value.amount)
            setAccountBalanceDenom(value.denom)
            setBalanceCheckFinished(true)
        }).catch(err => {
            setBalanceCheckError(err)
            setBalanceCheckFinished(true)
        })
    }

    const balanceMessage = `Current account balance is ${accountBalance} ${accountBalanceDenom}`

    return (
        <React.Fragment>
            <MainNav />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Check Balance
                    </Typography>

                    {client === null ?
                        (
                            <NoClientError />
                        ) : (
                            <React.Fragment>
                                <Confirmation
                                    finished={balanceCheckFinished}
                                    error={balanceCheckError}
                                    progressMessage="Checking balance..."
                                    successMessage={balanceMessage}
                                    failureMessage="Failed to check the account balance!"
                                />
                                <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        onClick={getBalance}
                                        disabled={!balanceCheckFinished}
                                        className={classes.button}
                                        startIcon={<RefreshIcon />}
                                    >
                                        Refresh
                                    </Button>
                                </div>
                            </React.Fragment>
                        )
                    }
                </Paper>
            </main>
        </React.Fragment >
    )
}