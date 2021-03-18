import React, {useContext} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Paper} from '@material-ui/core';
import {MixNode} from 'nym-validator-client/dist/types';
import MainNav from '../components/MainNav';
import ValidatorClient from 'nym-validator-client';
import BondMixnodeForm from "../components/bond/BondMixnodeForm";
import Confirmation from "../components/Confirmation";
import {ValidatorClientContext} from "../contexts/ValidatorClient";
import {Alert, AlertTitle} from "@material-ui/lab";
import NoClientError from "../components/NoClientError";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    })
);

const Bond = () => {
    const classes = useStyles({});

    const [bondingStarted, setBondingStarted] = React.useState(false)
    const [bondingFinished, setBondingFinished] = React.useState(false)
    const [bondingError, setBondingError] = React.useState(null)

    const {client} = useContext(ValidatorClientContext)

    const bondMixnode = async (event) => {
        setBondingStarted(true)
        event.preventDefault();
        console.log(`BOND button pressed`);
        let mixnode: MixNode = {
            sphinx_key: event.target.pubkey.value,
            host: event.target.host.value,
            layer: parseInt(event.target.layer.value),
            version: event.target.version.value,
            location: event.target.location.value,
        };
        console.log(`using the context client, our address is ${client.address}`);
        client.bond(mixnode).then((value => {
            // TODO: this branch will be hit even we are bonding another mix with our account
            console.log("ok!", value)
            setBondingFinished(true)
        })).catch(err => {
            setBondingError(err)
            setBondingFinished(true)
        })
    }

    return (
        <React.Fragment>
            <MainNav/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Bond a mixnode
                    </Typography>

                    {client === null ?
                        (
                            <NoClientError />
                        ) : (
                            !bondingStarted ? (
                                <BondMixnodeForm onSubmit={bondMixnode}/>
                            ) : (
                                <Confirmation
                                    finished={bondingFinished}
                                    error={bondingError}
                                    progressMessage="Mixnode bonding is in progress..."
                                    successMessage="Mixnode bonding was successful!"
                                    failureMessage="Failed to bond the Mixnode!"
                                />
                            )
                        )
                    }
                </Paper>
            </main>
        </React.Fragment>
    );
};

export default Bond;
