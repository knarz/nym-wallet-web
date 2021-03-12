import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Review } from '../components/send-funds/Review';
import SendNymForm from '../components/send-funds/SendNymForm';
import ValidatorClient, { coins } from 'nym-validator-client';
import Confirmation from '../components/send-funds/Confirmation';
import MainNav from '../components/MainNav';

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
                return <SendNymForm />;
            case 1:
                return <Review {...transaction} />;
            case 2:
                return <Confirmation />;
            default:
                throw new Error('Unknown step');
        }
    }


    const classes = useStyles();

    // Here's the React state
    const [activeStep, setActiveStep] = React.useState(0);
    const send: SendFundsMsg = { sender: "", recipient: "", amount: 0 };
    const [transaction, setTransaction] = React.useState(send);

    const handleNext = (event) => {
        event.preventDefault();
        if (activeStep == 0) {
            console.log("activeStep is 0, handling form")
            handleForm(event);
        }
        if (activeStep == 1) {
            console.log("activeStep is 1, sending funds")
            sendFunds(transaction);
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleForm = (event) => {
        event.preventDefault();
        const send: SendFundsMsg = {
            sender: event.target.sender.value,
            recipient: event.target.recipient.value,
            amount: parseInt(event.target.amount.value)
        };
        console.log("Setting transaction", send);
        setTransaction(send);
    }

    const sendFunds = async (transaction: SendFundsMsg) => {
        let nym = coins(transaction.amount, "unym");
        const client = await ValidatorClient.connect(
            "nym18vd8fpwxzck93qlwghaj6arh4p7c5n8974s0uv",
            "pride moral airport someone involve rabbit else napkin cheese hello tent stove rabbit mean help small ship embark concert aim journey void fly output",
            "http://foo.bar.org:26657" // this parameter in the client needs to be hooked up.
        );
        console.log(`connected to validator, our address is ${client.address}`);
        await client.send(transaction.sender, transaction.recipient, nym);
        // ipcRenderer.invoke("sendFunds", transaction.sender, transaction.recipient, nym)
        //     .then((response) => {
        //         console.log("Transaction hash: ", response.transactionHash);
        //         console.log("log: ", response.rawLog);
        //         console.log("activeStep before:", activeStep);
        //         setActiveStep(3); // I have gone full primitivist here. 
        //         console.log("activeStep after:", activeStep);
        //     })
        //     .catch((err) => console.log("Err on funds send", err));
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
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 2 ? 'Send' : 'Next'}
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
