import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function SendNymForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Enter addresses and amount
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="sender"
                        name="sender"
                        label="Sender address"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="recipient"
                        name="recipient"
                        label="Recipient address"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="amount"
                        name="amount"
                        label="Amount"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
