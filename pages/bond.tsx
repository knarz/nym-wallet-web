import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { MixNode } from 'nym-validator-client/dist/types';
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

const Bond = () => {
    const classes = useStyles({});

    const bondMixnode = async (event) => {
        event.preventDefault();
        console.log(`BOND button pressed`);
        let mixnode: MixNode = {
            sphinx_key: event.target.pubkey.value,
            host: event.target.host.value,
            layer: parseInt(event.target.layer.value),
            version: event.target.version.value,
            location: event.target.location.value,
        };
        await ipcRenderer.invoke("bond", mixnode);
    }

    return (
        <React.Fragment>
            <MainNav />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Bond a mixnode
                    </Typography>
                    <form onSubmit={bondMixnode}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="pubkey"
                                    name="pubkey"
                                    label="Public key"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="host"
                                    name="host"
                                    label="Host"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="layer"
                                    name="layer"
                                    label="Layer"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="location"
                                    name="location"
                                    label="Location"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="version"
                                    name="version"
                                    label="Version"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.button}
                            >
                                Bond
                            </Button>
                        </div>
                    </form>
                </Paper>
            </main>
        </React.Fragment >
    );
};

export default Bond;
