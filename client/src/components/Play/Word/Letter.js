import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import useStyles from './styles';

const Letter = (props) => {
    const classes = useStyles();

    const { id, setValue, position, color } = props;
    const [inputLetter, setLetter] = useState("");

    useEffect(() => {
        setValue({
            id: id,
            value: inputLetter,
            key: null
        })
    }, [inputLetter]);

    const handleSelect = () => {
        setLetter("");
        setValue({
            id: id,
            value: "",
            key: "pointer"
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

    const handleKeyDown = (e) => {
        const pressedKey = e.keyCode;
        switch(pressedKey){
            case 8:
                setLetter("");
                return setValue({
                    id: id,
                    value: '',
                    key: "backspace"
                })
            case 39:
                return setValue({
                    id: id,
                    value: e.target.value,
                    key: "forward"
                })
                
            case 37:
                return setValue({
                    id: id,
                    value: e.target.value,
                    key: "backward"
                })
            case 38:
                return setValue({
                    id: id,
                    value: e.target.value,
                    key: "up"
                })
            case 40:
                return setValue({
                    id: id,
                    value: e.target.value,
                    key: "down"
                })
            default: return;
        }
    }

    if(position === "center"){
        return (
            <Paper className={classes.paperCenter} elevation={3}>
                <input id={id} type="text" maxLength={1} onClick={handleSelect} onChange={handleInput} value={inputLetter} className={classes.letterInputCenter} onKeyDown={handleKeyDown} autoComplete="off" style={{color: color}} />
            </Paper>
        )
    } else {
        return (
            <Paper className={classes.paper} elevation={3}>
                <input id={id} type="text" maxLength={1} onClick={handleSelect} onChange={handleInput} value={inputLetter} className={classes.letterInput} onKeyDown={handleKeyDown} autoComplete="off" style={{color: color}} />
            </Paper>
        )
    }
    
}

export default Letter;