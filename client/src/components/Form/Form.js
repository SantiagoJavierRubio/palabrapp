import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField } from '@material-ui/core';
import axios from 'axios'
    
const Form = () => {
    const classes = useStyles();

    const [inputValue, setInput] = useState('');
    const [secret, setSecret] = useState(null);
    const [inputError, setInputError] = useState({bool: false, msg: ''});
    const [validWords, setValidWords] = useState({});
    const [puzzle, setNewPuzzle] = useState(null);

    const valid_chars = new RegExp(/[^A-ZÑ]/, 'gi');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!valid_chars.test(inputValue)){
            setSecret(inputValue.toUpperCase());
        } else {
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

    const handlePost = () => {
        console.log('ahi va')
    }

    const handleResetWords = () => {
        setNewPuzzle(createNewPuzzle);
    }

    const handleChangeSecret = () => {
        setNewPuzzle(null);
        setSecret(null);
        setValidWords({});
        setInputError({bool: false, msg: ''});
    }

    if(!secret){
        return(
            <form onSubmit={handleSubmit}>
                <TextField label="Your secret word" inputProps={{maxlength: 12}} onChange={(e) => setInput(e.target.value)} id="secret-input" error={inputError.bool} helperText={inputError.msg}/>
            </form>
        )
    } else {
        if(puzzle){
            return(
                <>
                    <h1>{puzzle.secret}</h1>
                    {puzzle.words.map(word=> {
                        return(
                            <div>
                                <p>{word[0]} - {word[1]} - {word[2]}: {puzzle.definitions[puzzle.words.indexOf(word)]}</p>
                            </div>
                        )
                    })}
                    <button onClick={handlePost}>Send</button>
                    <button onClick={handleChangeSecret}>Change word</button>
                    <button onClick={handleResetWords}>Recreate</button>
                </>
            )
        } else { return (<h1>Please wait</h1>)}
    }
}

export default Form;