import React, { useState } from 'react';
import useStyles from './styles';
import { TextField } from '@material-ui/core';
    
const Form = () => {
    const classes = useStyles();

    const [inputValue, setInput] = useState('');
    const [secret, setSecret] = useState(null);
    const [inputError, setInputError] = useState({bool: false, msg: ''})

    const valid_chars = new RegExp(/[^A-ZÑ]/, 'gi');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!valid_chars.test(inputValue)){
            setSecret(inputValue);
        } else {
            setInputError({bool: true, msg: 'Letters only'});
        }
    }

    if(!secret){
        return(
            <form onSubmit={handleSubmit}>
                <TextField label="Your secret word" onChange={(e) => setInput(e.target.value)} id="secret-input" error={inputError.bool} helperText={inputError.msg}/>
            </form>
        )
    } else {
        return(
            <p>hi</p>
        )
    }
}

export default Form;