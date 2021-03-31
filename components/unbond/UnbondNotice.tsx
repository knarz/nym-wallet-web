import {Button, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
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

type unbondNoticeProps = {
    onClick: (event: any) => void
}

export default function UnbondNotice(props: unbondNoticeProps) {
    const classes = useStyles({});

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography gutterBottom>
                        You can only have 1 mixnode per account. Unbond it by pressing the button below.
                    </Typography>
                </Grid>
            </Grid>
            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                    onClick={props.onClick}
                >
                    Unbond
                </Button>
            </div>
        </React.Fragment>
    )
}