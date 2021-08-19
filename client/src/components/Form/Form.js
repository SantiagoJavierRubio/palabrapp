import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Grid, Button, ButtonGroup, Box, Typography, CircularProgress } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import axios from 'axios';
    
const Form = () => {
    const classes = useStyles();

    const [inputValue, setInput] = useState('');
    const [secret, setSecret] = useState(null);
    const [inputError, setInputError] = useState({bool: false, msg: ''});
    const [validWords, setValidWords] = useState({});
    const [puzzle, setNewPuzzle] = useState(null);
    const [UIState, setUI] = useState('start');

    const valid_chars = new RegExp(/[^A-ZÑ]/, 'gi');

    const handleSubmit = (e) => {
        e.preventDefault();
        setUI('loading');
        if(!valid_chars.test(inputValue)){
            setSecret(inputValue.toUpperCase());
        } else {
            setUI('start');
            setInputError({bool: true, msg: 'Letters only'});
        }
    }

    const getValidWords = async () => {
        const response = await axios.post('http://localhost:5000/posts/get_words', {secret: secret})
            .catch(err => console.log(err.message));
        setValidWords(response.data);
    }

    const getUniqueRandomWord = (usedWords, validSet) => {
        let word = validSet[Math.floor(Math.random()*validSet.length)]
        while(usedWords.includes(word.palabra)){
            word = validSet[Math.floor(Math.random()*validSet.length)]
        }
        return word;        
    }

    const createNewPuzzle = () => {
        const word_set = [];
        const definition_set = [];
        const usedWords = [];

        for(let letter of secret){
            const cross_word = getUniqueRandomWord(usedWords, validWords[letter]);
            usedWords.push(cross_word.palabra);
            let index = Math.random();
            if(index > 0.5){
                index = cross_word.palabra.toUpperCase().indexOf(letter);
            } else {
                index = cross_word.palabra.toUpperCase().lastIndexOf(letter);
            }
            const word_arrangement = [
                    cross_word.palabra.substring(0, index),
                    cross_word.palabra[index],
                    cross_word.palabra.substring(index+1)
            ];
            word_set.push(word_arrangement);
            definition_set.push(cross_word.definicion)
        }
        setUI('puzzle')
        return {
            secret: secret,
            words: word_set,
            definitions: definition_set
        }
    }

    useEffect(() => {
        if(secret){
            getValidWords();
        }
    }, [secret]);

    useEffect(() => {
        if(validWords && secret){
            setNewPuzzle(createNewPuzzle);
        }
    }, [validWords]);

    useEffect(() => {
        setInputError({bool: false, msg: ''});
    }, [inputValue]);

    const handlePost = async () => {
        setUI('loading');
        const user_id = localStorage.getItem('user');
        if(user_id){
            const user_data = await axios.get(`http://localhost:5000/user/${user_id}`);
            if(user_data){
                try{
                    axios.post('http://localhost:5000/posts/new', {
                        secret: puzzle.secret,
                        words: puzzle.words,
                        definitions: puzzle.definitions,
                        creator: user_data.data
                    });
                    console.log(user_data);
                    setUI('done');
                } catch (err) {
                    setUI('error');
                    console.log(err);
                }
            }
        } else {
            window.alert('Please sign in to make an entry');
            setUI('puzzle');
        }
    }

    const handleResetWords = () => {
        setNewPuzzle(createNewPuzzle);
    }

    const handleChangeSecret = () => {
        setNewPuzzle(null);
        setSecret(null);
        setValidWords({});
        setInputError({bool: false, msg: ''});
        setUI('start');
    }

    switch(UIState){
        case 'start':
            return(
                <form onSubmit={handleSubmit} className={classes.secretForm}>
                    <TextField fullWidth label="Your secret word" inputProps={{maxLength: 12}} onChange={(e) => setInput(e.target.value)} id="secret-input" error={inputError.bool} helperText={inputError.msg} className={classes.inputText}/>
                    <Button variant="contained" color="primary" type="submit" endIcon={<ArrowForwardIcon />}>Create</Button>
                </form>
            );

        case 'puzzle':
            return(
                <>
                    <Typography variant="h2" className={classes.secretTitle}>{puzzle.secret}</Typography>
                    <Grid container direction="row" alignItems="stretch" spacing={1}>
                        {puzzle.words.map(word=> {
                            return(
                                <Grid key={word[0]} container item className={classes.wordContainer} justifyContent="center" xs={12}>
                                    <Grid item xs={5} align="right">{word[0]}</Grid>
                                    <Grid item xs={1} align="center" className={classes.secretWord}>{word[1]}</Grid>
                                    <Grid item xs={5} align="left">{word[2]}</Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Box className={classes.buttonsBox}>
                        <Button variant="contained" color="primary" onClick={handlePost}>Send</Button>
                        <ButtonGroup variant="text" color="secondary">
                            <Button onClick={handleResetWords}>Re-create</Button>
                            <Button onClick={handleChangeSecret}>Change word</Button>
                        </ButtonGroup>
                    </Box>
                   
                </>
            );

        case 'done':
            return(
                <Box className={classes.donePage}>
                    <Typography variant="h3">Your puzzle was submitted correctly!</Typography>
                    <Button variant="contained" color="secondary" onClick={handleChangeSecret}>Return</Button>
                </Box>
            );

        case 'error':
            return(
                <h1>Something went wrong</h1>
            );

        case 'loading':
            return (
                <Box className={classes.loadingCircle}>
                    <CircularProgress />
                </Box>
            );
        default:
            return (
                <>
                </>
            )
    }
}

export default Form;