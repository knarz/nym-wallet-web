import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Review } from '../components/send-funds/Review';
import SendNymForm from '../components/send-funds/SendNymForm';
import ValidatorClient, { coins } from 'nym-validator-client';
import Confirmation from '../components/Confirmation';
import MainNav from '../components/MainNav';
import {ValidatorClientContext} from "../contexts/ValidatorClient";


// I guess this will somehow be passed from sign in mnemonic
const SENDER: string = "nym1c94uwnz2jwcjh0fxefqpecc2a8wugwd7u53nry"
const MNEMONIC: string = "sunny squirrel powder gallery december sound face town possible soul bind spatial cargo limb royal mean traffic noise wage account dog badge task pink";

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

const steps = ['Enter addresses', 'Review & send', 'Await confirmation'];


export interface SendFundsMsg {
    sender: string,
    recipient: string,
    amount: number,
}

export default function SendFunds() {
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <SendNymForm address={transaction.sender}  setFormStatus={setFormStatus}/>;
            case 1:
                return <Review {...transaction} />;
            case 2:
                const successMessage = `Funds transfer was complete! - sent ${transaction.amount} nym to ${transaction.recipient}`
                return <Confirmation
                    finished={sendingFinished}
                    progressMessage="Funds transfer is in progress..."
                    successMessage={successMessage}
                    failureMessage="Failed to complete the transfer"
                    error={sendingError}
                />
            default:
                throw new Error('Unknown step');
        }
    }


    const classes = useStyles();

    // Here's the React state
    const [activeStep, setActiveStep] = React.useState(0);
    const send: SendFundsMsg = { sender: SENDER, recipient: "", amount: 0 };
    const [transaction, setTransaction] = React.useState(send);
    const [formFilled, setFormFilled] = React.useState(false)

    const [sendingStarted, setSendingStarted] = React.useState(false)
    const [sendingFinished, setSendingFinished] = React.useState(false)
    const [sendingError, setSendingError] = React.useState(null)
    
    const {client} = useContext(ValidatorClientContext)

    const setFormStatus = (nonEmpty: boolean) => {
        setFormFilled(nonEmpty)
    }

    const handleNext = (event) => {
        event.preventDefault();
        if (activeStep == 0) {
            console.log("activeStep is 0, handling form")
            handleForm(event);
            setActiveStep(activeStep + 1);
        } else if (activeStep == 1) {
            console.log("activeStep is 1, sending funds")
            setActiveStep(activeStep + 1);
            setSendingStarted(true)
            console.log("starting funds transfer")
            sendFunds(transaction).then(() => {
                console.log("funds transfer is finished!")
                setSendingStarted(false)
                setSendingFinished(true)
            }).catch(err => {
                setSendingError(err)
                setSendingStarted(false)
                setSendingFinished(true)
            });
        } else {
            console.log("resetting the progress")
            setSendingStarted(false)
            setSendingFinished(false)
            setSendingError(null)
            setActiveStep(0)
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleForm = (event) => {
        event.preventDefault();
        const send: SendFundsMsg = {
            sender: SENDER,
            recipient: event.target.recipient.value,
            amount: parseInt(event.target.amount.value)
        };
        console.log("Setting transaction", send);
        setTransaction(send);
    }

    const sendFunds = async (transaction: SendFundsMsg) => {
        let nym = coins(transaction.amount, "unym");
        console.log(`using the context client, our address is ${client.address}`);
        await client.send(client.address, transaction.recipient, nym);
    }

    const checkButtonDisabled = (): boolean => {
        if (activeStep === 0) {
            return !formFilled
            // the form must be filled
        } else if (activeStep === 1) {
            // it should always be enabled
            return false
        } else if (activeStep === 2) {
            // transfer must be completed
            return sendingStarted
        }

        return false
    }

    return (
        <React.Fragment>
            <MainNav />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Send Nym
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Payment complete.
                                </Typography>
                                <Typography variant="subtitle1">
                                    You (<b>{transaction.sender}</b>)
                                </Typography>
                                <Typography variant="subtitle1">
                                    have sent <b>{transaction.amount} nym</b>
                                </Typography>
                                <Typography variant="subtitle1">
                                    to <b>{transaction.recipient}</b>.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <form onSubmit={handleNext}>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            // onClick={handleNext}
                                            disabled={checkButtonDisabled()}
                                            className={classes.button}
                                        >
                                            {activeStep === 1 ? 'Send' : (activeStep === steps.length - 1 ? 'Send again' : 'Next')}
                                        </Button>
                                    </div>
                                </form>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment >
    );
}
