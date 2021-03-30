import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { SendFundsMsg } from '../../pages/send';
import { printableCoin } from "@nymproject/nym-validator-client";

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

export const Review = (parentTrans: SendFundsMsg) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1" gutterBottom className={classes.title}>
                        You are about to send
                    </Typography>
                    <Typography variant="h6">{printableCoin(parentTrans.coin)}</Typography>
                    <Typography>to</Typography>
                    <Typography variant="h6">{parentTrans.recipient}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
