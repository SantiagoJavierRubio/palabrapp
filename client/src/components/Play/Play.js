import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import Word from './Word/Word';

const Play = ({ match }) => {

    const [puzzle, loadPuzzle] = useState({});
    const [layout, loadLayout] = useState({left: [], center: [], right: []});
    const [usrInput, loadInput] = useState({});
    const [solution, loadSolution] = useState([]);
    const [indexMap, setIndexMap] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        fetchPuzzle();
    }, []);

    useEffect(() => {
        if(puzzle.secret){
            createLayout();
            createUsrInput();
        }
    }, [puzzle]);

    const createUsrInput = () => {
        const newUsrInput = [];
        const newSolution = [];
        const newIndexMap = [];

        for (let i=0; i < puzzle.secret.length; i++){
            newUsrInput.push([]);
            newSolution.push([]);
            newIndexMap.push([]);
            puzzle.words[i].forEach(sector => {
                sector.split('').forEach(letter => {
                    newUsrInput[i].push([]);
                    newIndexMap[i].push([]);
                    newSolution[i].push([letter]);
                });
            });
        }
        loadSolution(newSolution);
        loadInput(newUsrInput);
        setIndexMap(newIndexMap);
    }

    const fetchPuzzle = async () => {
        const response = await axios.get(`http://localhost:5000/posts/${match.params.id}`)
            .catch(err => console.log(err.message));
        loadPuzzle(response.data);
    }

    const createLayout = () => {
        const new_layout = {left: [], center: [], right: []}
        puzzle.words.forEach(word => {
            new_layout.left.push(word[0]);
            new_layout.center.push(word[1]);
            new_layout.right.push(word[2]);
        });
        loadLayout(new_layout);
    }

//∞∞ THEN: add word definitions on new component under current display ∞∞

    // Custom function to get index of empty char
    const checkIndexes = (word, index=0) => {
        for (let i=index; i<word.length; i++){
            if (word[i] == ""){
                return i;
            }
        }
        return -1;
    }
    // Manage auto focus to next empty letter or word
    const manageNext = (inputCoords, newUsrInput) => {
    
        // if last word is completed
        let nextIndex = inputCoords.y+1;
        if (inputCoords.y === puzzle.secret.length - 1){
            nextIndex = 0;
        }

        // if all the word is completed
        const word = newUsrInput[inputCoords.y];
        const emptyIndexPre = checkIndexes(word);
        if (emptyIndexPre === -1){
            inputCoords.y = nextIndex;
            return manageNext(inputCoords, newUsrInput);
        } else {
            // if on middle of the word or last char
            const emptyIndexPost = checkIndexes(word, inputCoords.x+inputCoords.displace)
            if (emptyIndexPost !== -1){
                let target = indexMap[inputCoords.y][emptyIndexPost][0];
                return document.getElementById(target).focus();
            } else {
            // if empty before
                let target = indexMap[inputCoords.y][emptyIndexPre][0];
                return document.getElementById(target).focus();
            }
        }
    }

    // Gets values from each letter on every input (the data has input value and letter id) - Creates a map of inputs and ids
    const getValue = (value) => {
        const newUsrInput = [...usrInput];
        const newIndexMap = [...indexMap];
        const inputCoords = {
                        x: parseInt(value.id[4]),
                        y: parseInt(value.id[2]),
                        displace: 0
                    };
                    
        if (value.id[0] !== 'l' && layout.left[inputCoords.y][0] !== ''){
            inputCoords.displace = layout.left[inputCoords.y].length;
            if (value.id[0] === 'r'){
                inputCoords.displace = inputCoords.displace+1;
            };
        };

        newUsrInput[inputCoords.y][inputCoords.x+inputCoords.displace][0] = value.value;
        newIndexMap[inputCoords.y][inputCoords.x+inputCoords.displace][0] = value.id;

        loadInput(newUsrInput);
        if (value.value !== ''){
            manageNext(inputCoords, newUsrInput);
        }
    }


    return(
        <>
        <Grid container className={classes.puzzleContainer} alignItems="center" justifyContent="center" >
            <Grid container className={classes.sideContainer} spacing={0} direction="column" alignItems="center" justifyContent="space-evenly" item xs={5}>
                <Word layout={layout} position={"left"} setValue={getValue} />
            </Grid> 
            <Grid container className={classes.sideContainer} spacing={0} direction="column" alignItems="center" justifyContent="space-evenly" item xs={1}>
                <Word layout={layout} position={"center"} setValue={getValue}/>
            </Grid> 
            <Grid container className={classes.sideContainer} spacing={0} direction="column" alignItems="center" justifyContent="space-evenly" item xs={5}>
                <Word layout={layout} position={"right"} setValue={getValue}/>
            </Grid> 
        </Grid>
        </>
    )
}

export default Play