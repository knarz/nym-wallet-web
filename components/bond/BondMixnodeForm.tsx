import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

type BondMixnodeFormProps = {
    onSubmit: (event: any) => void
}

export default function BondMixnodeForm(props: BondMixnodeFormProps) {
    const classes = useStyles({});

    return (
        <form onSubmit={props.onSubmit}>
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
    );
}