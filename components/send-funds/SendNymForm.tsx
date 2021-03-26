import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DENOM } from '../../pages/_app';

type SendNymFormProps = {
    address: string,
    setFormStatus: (nonEmpty: boolean) => void,
}

export default function SendNymForm({ address, setFormStatus }: SendNymFormProps) {
    const [recipientHasValue, setRecipientHasValue] = React.useState(false)
    const [amountHasValue, setAmountHasValue] = React.useState(false)

    const handleInputData = (event) => {
        if (event.target.id === "recipient") {
            setRecipientHasValue(event.target.value.length > 0)
        } else if (event.target.id === "amount") {
            setAmountHasValue(event.target.value.length > 0)
        }

        console.log(recipientHasValue, amountHasValue)
        setFormStatus(recipientHasValue && amountHasValue)
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Enter recipient address and the amount
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6">Sending from {address}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="recipient"
                        name="recipient"
                        label="Recipient address"
                        onChange={handleInputData}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="amount"
                        name="amount"
                        label="Amount"
                        onChange={handleInputData}
                        fullWidth
                    /> {DENOM}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
