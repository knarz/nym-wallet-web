import { Button, Grid, InputAdornment } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { StateParams, nativeToPrintable } from "@nymproject/nym-validator-client";
import { DENOM } from "../../pages/_app";

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

type AdminFormProps = {
    onSubmit: (event: any) => void
    currentParams: StateParams,
}

/*
    minimum_mixnode_bond: string,
    minimum_gateway_bond: string,
    mixnode_bond_reward_rate: string,
    gateway_bond_reward_rate: string,
    mixnode_active_set_size: number,
 */

export default function AdminForm(props: AdminFormProps) {
    const classes = useStyles({});

    return (
        <form onSubmit={props.onSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="mix_bond"
                        name="mix_bond"
                        label="Minimum Mixnode Bond"
                        defaultValue={nativeToPrintable(props.currentParams.minimum_mixnode_bond)}
                        fullWidth
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">{DENOM}</InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="gateway_bond"
                        name="gateway_bond"
                        label="Minimum Gateway Bond"
                        defaultValue={nativeToPrintable(props.currentParams.minimum_gateway_bond)}
                        fullWidth
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">{DENOM}</InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="mix_reward"
                        name="mix_reward"
                        label="Mixnode Bond Reward Rate"
                        defaultValue={props.currentParams.mixnode_bond_reward_rate}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="gateway_reward"
                        name="gateway_reward"
                        label="Gateway Bond Reward Rate"
                        defaultValue={props.currentParams.gateway_bond_reward_rate}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="active_set"
                        name="active_set"
                        label="Mixnode Active Set Size"
                        defaultValue={props.currentParams.mixnode_active_set_size}
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
                    Update Contract
                </Button>
            </div>
        </form>
    )
}
