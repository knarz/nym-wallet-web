import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ValidatorClientContext} from "../contexts/ValidatorClient";
import {useRouter} from 'next/router';
import ValidatorClient from "../../nym/clients/validator";
import {BONDING_CONTRACT_ADDRESS, TEST_USER_MNEMONIC, VALIDATOR_URL} from "../pages/_app";
import {LinearProgress} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const router = useRouter()

    const {client, setClient} = useContext(ValidatorClientContext)
    const [loading, setLoading] = useState(false)

    console.log("context client is", client);

    const makeClient = async (mneomonic: string) => {
        const client = await ValidatorClient.connect(
            BONDING_CONTRACT_ADDRESS,
            mneomonic,
            VALIDATOR_URL
        );
        setClient(client)
        console.log(`connected to validator, our address is ${client.address}`);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        let mneomonnic = event.target.mnemonic.value
        if (mneomonnic === "") {
            mneomonnic = TEST_USER_MNEMONIC
        }
        makeClient(mneomonnic).then(async () => {
                await router.push("/send")
            }
        )
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                {/* <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar> */}
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="mnemonic"
                        label="BIP-39 Mnemonic"
                        name="mnemonic"
                        autoComplete="mnemonic"
                        autoFocus
                    />
                    {loading && <LinearProgress/>}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.submit}
                        disabled={loading}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Create one"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
