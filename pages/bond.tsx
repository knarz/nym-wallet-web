import React, { useContext, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, LinearProgress, Paper } from '@material-ui/core';
import { MixNode } from '@nymproject/nym-validator-client/dist/types';
import MainNav from '../components/MainNav';
import BondMixnodeForm from "../components/bond/BondMixnodeForm";
import Confirmation from "../components/Confirmation";
import { ValidatorClientContext } from "../contexts/ValidatorClient";
import NoClientError from "../components/NoClientError";
import { useRouter } from 'next/router';
import Link from "@material-ui/core/Link";

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
    const router = useRouter()
    const { client } = useContext(ValidatorClientContext)

    const [bondingStarted, setBondingStarted] = React.useState(false)
    const [bondingFinished, setBondingFinished] = React.useState(false)
    const [bondingError, setBondingError] = React.useState(null)

    const [checkedOwnership, setCheckedOwnership] = React.useState(false)
    const [ownsMixnode, setOwnsMixnode] = React.useState(false)

    useEffect(() => {
        if (client === null) {
            router.push("/")
        } else {
            // check if we actually already own a mixnode
            client.ownsMixNode().then((ownsNode) => {
                setOwnsMixnode(ownsNode)
            }).finally(() => setCheckedOwnership(true))
        }
    }, [client])

    const bondMixnode = async (event) => {
        setBondingStarted(true)
        event.preventDefault();
        console.log(`BOND button pressed`);
        let mixnode: MixNode = {
            sphinx_key: event.target.sphinxkey.value,
            identity_key: event.target.identity.value,
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

    const getBondContent = () => {
        // we're not signed in
        if (client === null) {
            return (<NoClientError />)
        }

        // we haven't checked whether we actually already own a node
        if (!checkedOwnership) {
            return (<LinearProgress />)
        }

        // we already own a mixnode
        if (ownsMixnode) {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography gutterBottom>
                            You have already bonded a mixnode before. If you wish to bond a different one, you need to first <Link href="/unbond">unbond the existing one</Link>.
                        </Typography>
                    </Grid>
                </Grid>
            )
        }

        // we haven't clicked bond button yet
        if (!bondingStarted) {
            return (
                <BondMixnodeForm onSubmit={bondMixnode} />
            )
        }

        // We started bonding
        return (
            <Confirmation
                finished={bondingFinished}
                error={bondingError}
                progressMessage="Mixnode bonding is in progress..."
                successMessage="Mixnode bonding was successful!"
                failureMessage="Failed to bond the Mixnode!"
            />
        )
    }

    return (
        <React.Fragment>
            <MainNav />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Bond a mixnode
                    </Typography>
                    {getBondContent()}
                </Paper>
            </main>
        </React.Fragment>
    );
};

export default Bond;
