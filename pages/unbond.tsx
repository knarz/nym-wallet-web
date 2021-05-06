import React, {useContext, useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, LinearProgress, Paper } from '@material-ui/core';
import MainNav from '../components/MainNav';
import UnbondNotice from "../components/unbond/UnbondNotice";
import Confirmation from "../components/Confirmation";
import {ValidatorClientContext} from "../contexts/ValidatorClient";
import NoClientError from "../components/NoClientError";
import {useRouter} from "next/router";

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
    const router = useRouter()

    const [unbondingStarted, setUnbondingStarted] = React.useState(false)
    const [unbondingFinished, setUnbondingFinished] = React.useState(false)
    const [unbondingError, setUnbondingError] = React.useState(null)
    const {client} = useContext(ValidatorClientContext)

    const [checkedOwnership, setCheckedOwnership] = React.useState(false)
    const [ownsMixnode, setOwnsMixnode] = React.useState(false)

    useEffect(() =>  {
        if (client === null) {
            router.push("/")
        } else {
            // check if we actually own a mixnode to unbond
            client.ownsMixNode().then((ownsNode) => {
                setOwnsMixnode(ownsNode)
            }).finally(() => setCheckedOwnership(true))
        }
    }, [client])

    const unbond = async () => {
        setUnbondingStarted(true)
        console.log(`UNBONDING button pressed`);
        console.log(`using the context client, our address is ${client.address}`);
        client.unbondMixnode().then((value => {
            // TODO: this branch will be hit even we are bonding another mix with our account
            console.log("ok!", value)
            setUnbondingFinished(true)
        })).catch(err => {
            setUnbondingError(err)
            setUnbondingFinished(true)
        })
    }

    const getUnbondContent = () => {
        // we're not signed in
        if (client === null) {
            return (<NoClientError />)
        }

        // we haven't checked whether we actually own a node to unbond
        if (!checkedOwnership) {
            return (<LinearProgress />)
        }

        // we don't own a mixnode
        if (!ownsMixnode) {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography gutterBottom>
                            You do not currently have a mixnode bonded.
                        </Typography>
                    </Grid>
                </Grid>
            )
        }

        // we haven't clicked unbond button yet
        if (!unbondingStarted) {
            return (
                <React.Fragment>
                    <UnbondNotice onClick={unbond}/>
                </React.Fragment>
            )
        }

        // We started unbonding
        return (
            <Confirmation
                finished={unbondingFinished}
                error={unbondingError}
                progressMessage="Mixnode unbonding is in progress..."
                successMessage="Mixnode unbonding was successful!"
                failureMessage="Failed to unbond the Mixnode!"
            />
        )
    }

    return (
        <React.Fragment>
            <MainNav/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Unbond a mixnode
                    </Typography>

                    {getUnbondContent()}
                </Paper>

            </main>
        </React.Fragment>
    );
};

export default Unbond;
