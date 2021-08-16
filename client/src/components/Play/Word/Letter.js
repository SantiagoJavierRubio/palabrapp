import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import useStyles from './styles';

const Letter = (props) => {
    const classes = useStyles();

    const { id, setValue } = props;
    const [inputLetter, setLetter] = useState("");

    useEffect(() => {
        setValue({
            id: id,
            value: inputLetter
        })
    }, [inputLetter]);

    const handleSelect = () => {
        setLetter("");
        setValue({
            id: id,
            value: ""
        })
    }

    const valid_chars = new RegExp(/([A-ZÑ])/, 'i');
    const handleInput = (e) => {
        const input = e.target.value;
        if(valid_chars.test(input)){
            setLetter(input);
        } else {
            setLetter("");
        }
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <input id={id} type="text" maxLength={1} onClick={handleSelect} onChange={handleInput} value={inputLetter} className={classes.letterInput} />
        </Paper>
    )
}

export default Letter;