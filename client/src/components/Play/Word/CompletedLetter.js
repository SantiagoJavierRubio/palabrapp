import React from 'react';
import { Paper } from '@material-ui/core';
import useStyles from './styles';

const CompletedLetter = (props) => {
    const classes = useStyles();

    const { id, correctLetter, position } = props;

    if(position === "center"){
        return (
            <Paper className={classes.paperCenter} elevation={3}>
                <input id={id} className={classes.letterInputCenter} value={correctLetter} disabled={true} />
            </Paper>
        )
    } else {
        return (
            <Paper className={classes.paper} elevation={3}>
                <input id={id} className={classes.letterInput} value={correctLetter} disabled={true} />
            </Paper>
        )
    }
    
}

export default CompletedLetter;