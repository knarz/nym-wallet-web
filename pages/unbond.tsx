import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Paper } from '@material-ui/core';
import ValidatorClient from 'nym-validator-client';
import MainNav from '../components/MainNav';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            paddingTop: theme.spacing(4),
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
    })
);

const Unbond = () => {
    const classes = useStyles({});


    const unbond = async () => {
        console.log(`UNBONDING button pressed`);
        const client = await ValidatorClient.connect(
            "nym1c94uwnz2jwcjh0fxefqpecc2a8wugwd7u53nry",
            "sunny squirrel powder gallery december sound face town possible soul bind spatial cargo limb royal mean traffic noise wage account dog badge task pink",
            "http://foo.bar.org:26657" // this parameter in the client needs to be hooked up.
        );
        console.log(`connected to validator, our address is ${client.address}`);
        const result = await client.unbond();
        console.log("Unbonding result", result);
    }

    return (
        <React.Fragment>
            <MainNav />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Unbond a mixnode
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography gutterBottom>
                                You can only have 1 mixnode per account. Unbond it by pressing the button below.
                            </Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.button}
                            onClick={unbond}
                        >
                            Unbond
                        </Button>
                    </div>
                </Paper>

            </main>
        </React.Fragment >
    );
};

export default Unbond;
