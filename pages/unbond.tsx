import React, {useContext} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Paper} from '@material-ui/core';
import ValidatorClient from 'nym-validator-client';
import MainNav from '../components/MainNav';
import UnbondNotice from "../components/unbond/UnbondNotice";
import Confirmation from "../components/Confirmation";
import {ValidatorClientContext} from "../contexts/ValidatorClient";

// I guess this will somehow be passed from sign in mnemonic
const BONDING_CONTRACT: string = "nym10pyejy66429refv3g35g2t7am0was7ya69su6d"
const MNEMONIC: string = "sunny squirrel powder gallery december sound face town possible soul bind spatial cargo limb royal mean traffic noise wage account dog badge task pink";


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

    const [unbondingStarted, setUnbondingStarted] = React.useState(false)
    const [unbondingFinished, setUnbondingFinished] = React.useState(false)
    const [unbondingError, setUnbondingError] = React.useState(null)
    const {client} = useContext(ValidatorClientContext)

    const unbond = async () => {
        setUnbondingStarted(true)
        console.log(`UNBONDING button pressed`);
        console.log(`using the context client, our address is ${client.address}`);
        client.unbond().then((value => {
            // TODO: this branch will be hit even we are bonding another mix with our account
            console.log("ok!", value)
            setUnbondingFinished(true)
        })).catch(err => {
            setUnbondingError(err)
            setUnbondingFinished(true)
        })
    }

    return (
        <React.Fragment>
            <MainNav/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Unbond a mixnode
                    </Typography>
                    {!unbondingStarted ? (
                        <UnbondNotice onClick={unbond}/>
                    ) : (
                        <Confirmation
                            finished={unbondingFinished}
                            error={unbondingError}
                            progressMessage="Mixnode unbonding is in progress..."
                            successMessage="Mixnode unbonding was successful!"
                            failureMessage="Failed to unbond the Mixnode!"
                        />
                    )
                    }
                </Paper>

            </main>
        </React.Fragment>
    );
};

export default Unbond;
