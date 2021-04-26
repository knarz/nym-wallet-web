import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import bs58 from "bs58";
import semver from "semver"

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

    const [validity, setValidity] = React.useState({
        validSphinxKey: true,
        validIdentityKey: true,
        validHost: true,
        validLayer: true,
        validVersion: true,
        validLocation: true,
    })


    const validateForm = (event: any): boolean => {
        let validSphinxKey = validateKey(event.target.sphinxkey.value);
        let validIdentityKey = validateKey(event.target.identity.value);
        let validHost = validateHost(event.target.host.value);
        let validLayer = validateLayer(event.target.layer.value);
        let validVersion = validateVersion(event.target.version.value);
        let validLocation = validateLocation(event.target.location.value);

        setValidity({
            validSphinxKey: validSphinxKey,
            validIdentityKey: validIdentityKey,
            validHost: validHost,
            validLayer: validLayer,
            validVersion: validVersion,
            validLocation: validLocation,
        });

        console.log("event in validate", event);
        return validSphinxKey && validIdentityKey && validHost && validLayer && validVersion && validLocation
    }

    const validateKey = (key: string): boolean => {
        // it must be a valid base58 key
        try {
            const bytes = bs58.decode(key);
            // of length 32
            return bytes.length === 32
        } catch {
            return false
        }
    }

    const validateHost = (host: string): boolean => {
        // later on, it should probably validate ipv4/ipv6 addresses
        const ipPort = host.split(":");
        if (ipPort.length < 2) {
            // definitely no port information present
            return false
        }
        const portCandidate = ipPort[ipPort.length - 1]
        // it must be a valid number within u16 value range
        try {
            const port = parseInt(portCandidate)
            return port >= 1 && port <= 65535
        } catch {
            return false
        }
    }

    const validateLayer = (layerCandidate: string): boolean => {
        // it must be a value between 1 and 3
        try {
            const layer = parseInt(layerCandidate)
            return layer >= 1 && layer <= 3
        } catch {
            return false
        }
    }

    const validateVersion = (version: string): boolean => {
        // check if its a valid semver
        return semver.valid(version)
    }

    const validateLocation = (location: string): boolean => {
        // right now only perform the stupid check of whether the user copy-pasted the tooltip...
        return location.trim() != "[physical location of your node's server]"
    }

    const submitForm = (event: any) => {
        event.preventDefault()

        if (validateForm(event)) {
            return props.onSubmit(event)
        }
    }

    return (
        <form onSubmit={submitForm}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        error={!validity.validIdentityKey}
                        required
                        id="identity"
                        name="identity"
                        label="Identity key"
                        fullWidth
                        {...(!validity.validIdentityKey ? { helperText: "Enter a valid identity key" }: {})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!validity.validSphinxKey}
                        required
                        id="sphinxkey"
                        name="sphinxkey"
                        label="Sphinx key"
                        fullWidth
                        {...(!validity.validSphinxKey ? { helperText: "Enter a valid sphinx key" }: {})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={!validity.validHost}
                        required
                        id="host"
                        name="host"
                        label="Host"
                        fullWidth
                        {...(!validity.validHost ? { helperText: "Enter a valid host:port value" }: {})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={!validity.validLayer}
                        required
                        id="layer"
                        name="layer"
                        label="Layer"
                        fullWidth
                        {...(!validity.validLayer ? { helperText: "Enter a valid layer between 1 and 3" }: {})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={!validity.validLocation}
                        required
                        id="location"
                        name="location"
                        label="Location"
                        fullWidth
                        {...(!validity.validLocation ? { helperText: "Enter a valid location of your node" }: {})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={!validity.validVersion}
                        required
                        id="version"
                        name="version"
                        label="Version"
                        fullWidth
                        {...(!validity.validVersion ? { helperText: "Enter a valid version, like 0.10.0" }: {})}
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