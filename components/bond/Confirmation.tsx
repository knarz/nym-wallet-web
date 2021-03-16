import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {CircularProgress} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';

type ConfirmationProps = {
    finished: boolean,
    error: Error,
}

export default function Confirmation(props: ConfirmationProps) {
    return (
        <React.Fragment>
            {!props.finished ? (
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Mixnode bonding is in progress...
                    </Typography>
                    <Grid item xs={12} sm={6}>
                        <CircularProgress/>
                    </Grid>
                </React.Fragment>

            ) : (
                <React.Fragment>
                    {props.error === null ? (
                            <Alert severity="success">Mixnode bonding was successful!</Alert>
                        ) : (
                            <Alert severity="error">
                                <AlertTitle>{props.error.name}</AlertTitle>
                                <strong>failed to bond a mixnode</strong> - {props.error.message}
                            </Alert>
                        )
                    }
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
