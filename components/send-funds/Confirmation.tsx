import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {CircularProgress} from "@material-ui/core";

const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

type ConfirmationProps = {
    inProgress: boolean,
    amount: number,
    recipient: string
}

export default function Confirmation({inProgress, amount, recipient}: ConfirmationProps) {
    const classes = useStyles();

    return (
        <React.Fragment>
            {inProgress ? (
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Funds transfer in progress...
                    </Typography>
                    <Grid item xs={12} sm={6}>
                        <CircularProgress />
                    </Grid>
                </React.Fragment>

            ) : (
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Funds transfer was complete!
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" gutterBottom className={classes.listItem}>
                                Sent {amount} nym to {recipient}!
                            </Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
