import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Grid, CircularProgress, Box, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useStyles from './styles';
import Word from './Word/Word';
import Definition from './Definition/Definition'
import Winner from './Winner/Winner';
import Login from './Login/Login';

const Play = ({ match }) => {

    const [puzzle, loadPuzzle] = useState({});
    const [layout, loadLayout] = useState({left: [], center: [], right: []});
    const [usrInput, loadInput] = useState([]);
    const [solution, loadSolution] = useState([]);
    const [indexMap, setIndexMap] = useState([]);
    const [defined, setDefined] = useState("");
    const [UIState, setUI] = useState('');
    const [focused, setFocus] = useState('root');
    const [gameState, setGameState] = useState({incomplete: [], wrong: [], correct: []});
    const [newLogin, setNewLogin] = useState(null)

    const classes = useStyles();

    // Game and UI set up.

    const updateLogin = () => {
        const new_login = localStorage.getItem('user');
        setNewLogin(new_login);
    }

    useEffect(() => {
        fetchPuzzle();
    }, []);

    useEffect(() => {
        if(puzzle.secret){
            createLayout();
            createUsrInput();
            setFocus('c-0-0');
        }
    }, [puzzle]);

    const fetchPuzzle = async () => {
        const response = await axios.get(`http://localhost:5000/posts/${match.params.id}`)
            .catch(err => console.log(err.message));
        if(response.data){
            loadPuzzle(response.data);
        }
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

    const createUsrInput = () => {
        const newUsrInput = [];
        const newSolution = [];
        const newIndexMap = [];

        for (let i=0; i < puzzle.secret.length; i++){
            newUsrInput.push([]);
            let sol = '';
            newIndexMap.push([]);
            puzzle.words[i].forEach(sector => {
                sector.split('').forEach(letter => {
                    newUsrInput[i].push([]);
                    newIndexMap[i].push([]);
                });
                sol += sector.toUpperCase();
            });
            newSolution.push(sol);
        }

        loadSolution(newSolution);
        loadInput(newUsrInput);
        setIndexMap(newIndexMap);
        setUI('done');
    }


    // Input and output management

    // Sets the focus to the target of the focus state
    useEffect(()=>{
        document.getElementById(focused).focus();
    }, [focused]);

    // Updates the definition of the Definition component on focus change
    const id_match = new RegExp(/(?!-)[0-9]*/, 'g');
    useMemo(() => {
        if(puzzle.definitions){
            const indexes = focused.match(id_match);
            const new_def = puzzle.definitions[indexes[1]];
            setDefined(new_def);
        }
    }, [focused]);

    // Custom function to get index of next empty char
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
        // if all places filled dont focus other
        const check_complete = newUsrInput.toString().replaceAll(',', '');
        if(check_complete.length === solution.toString().length-solution.length+1){
            return;
        }
    
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
            inputCoords.x = 0; 
            inputCoords.displace = 0;
            return manageNext(inputCoords, newUsrInput);
        } else {
            // if on middle of the word or last char
            const emptyIndexPost = checkIndexes(word, inputCoords.x+inputCoords.displace)
            if (emptyIndexPost !== -1){
                let target = indexMap[inputCoords.y][emptyIndexPost][0];
                return setFocus(target);
            } else {
            // if empty before
                let target = indexMap[inputCoords.y][emptyIndexPre][0];
                return setFocus(target);;
            }
        }
    }

    // Manages navigation when some special keys are pressed on input

    const manageNavigation = (key, inputCoords) => {
        const inputSum = inputCoords.x+inputCoords.displace;
        switch (key){
            case "backspace":
            case "backward":
                if(inputSum !== 0){
                    const target = indexMap[inputCoords.y][inputSum-1][0];
                    return setFocus(target);; 
                } else {
                    return;
                }
            case "forward":
                if(inputSum < indexMap[inputCoords.y].length-1){
                    const target = indexMap[inputCoords.y][inputSum+1][0];
                    return setFocus(target);; 
                } else {
                    return;
                }
            case "up":
                if(inputCoords.y !== 0){
                    let y = inputCoords.y-1
                    for(y; y>=0; y--){
                        if(!gameState.correct.includes(y)){
                            const target = indexMap[y][0][0];
                            return setFocus(target);
                        } else {
                            continue;
                        }
                    }
                    return;  
                } else {
                    return;
                }
            case "down":
                if(inputCoords.y < puzzle.secret.length-1){
                    let y = inputCoords.y+1
                    for(y; y<puzzle.secret.length; y++){
                        if(!gameState.correct.includes(y)){
                            const target = indexMap[y][0][0];
                            return setFocus(target);
                        } else {
                            continue;
                        }
                    }
                    return;
                } else {
                    return;
                }
            case "pointer":
                const target = indexMap[inputCoords.y][inputSum][0];
                return setFocus(target);
            default:
                return;
        }
    }

    // Gets values from each letter on every input (the data has input value and letter id) - Creates a map of inputs and ids

    const getValue = (value) => {
        const newUsrInput = [...usrInput];
        const newIndexMap = [...indexMap];
        let indexes = value.id.match(id_match);
        const inputCoords = {
                        x: parseInt(indexes[2]),
                        y: parseInt(indexes[1]),
                        displace: 0
                    };
                    
        if (value.id[0] !== 'l' && layout.left[inputCoords.y][0] !== ''){
            inputCoords.displace = layout.left[inputCoords.y].length;
            if (value.id[0] === 'r'){
                inputCoords.displace = inputCoords.displace+1;
            };
        };

        if(value.key){
            manageNavigation(value.key, inputCoords);
        }

        newUsrInput[inputCoords.y][inputCoords.x+inputCoords.displace][0] = value.value.toUpperCase();
        newIndexMap[inputCoords.y][inputCoords.x+inputCoords.displace][0] = value.id;

        loadInput(newUsrInput);
        setIndexMap(newIndexMap);

        if (value.value !== '' && !value.key){
            manageNext(inputCoords, newUsrInput);
        }
    }

    // Game state management, give the user feedback.

        // updates the gameState
        const checkSolutions = (solutionCheck) => {
            const wordState = {
                incomplete: [],
                wrong: [],
                correct: []
            }
            solution.forEach((solution, index)=>{
                if(solutionCheck[index].length === solution.length){
                    if(solution === solutionCheck[index]){
                        wordState.correct.push(index);
                    } else {
                        wordState.wrong.push(index);
                    }
                } else {
                    wordState.incomplete.push(index);
                }
            })
            setGameState(wordState);
        }
    
        useEffect(()=>{
            const solutionCheck = [];
            usrInput.forEach(word => {
                solutionCheck.push(word.toString().replaceAll(',','').toUpperCase())
            });
            checkSolutions(solutionCheck);
        }, [usrInput]);
    
    
        useMemo(()=>{
            if(puzzle.secret){
                if(gameState.correct.length === puzzle.secret.length){
                    setUI('win');
                } else {
                    return;
                }
            }
        }, [gameState]);



    // Render

    switch(UIState){
        case 'done':
        case 'back':
            return(
                <>
                <Box className={classes.arrowsContainer}>
                    <Link to="/lobby">
                        <ArrowBackIosIcon />
                    </Link>
                    <Typography variant="h2" className={classes.puzzleClue}>{puzzle.clue}</Typography>
                    {UIState==='back' ? (
                        <Button onClick={()=>setUI('win')}>
                            <ArrowForwardIosIcon />
                        </Button>
                    ):(<Typography />)}
                </Box>
                <Box component="div" className={classes.puzzleBox} >
                    <Grid container className={classes.sideContainer}>
                        <Word layout={layout} position={"left"} setValue={getValue} gameState={gameState} />
                    </Grid> 
                    <Grid container className={classes.sideContainer}>
                        <Word layout={layout} position={"center"} setValue={getValue} gameState={gameState}/>
                    </Grid> 
                    <Grid container className={classes.sideContainer}>
                        <Word layout={layout} position={"right"} setValue={getValue} gameState={gameState} />
                    </Grid>
                </Box>
                <Definition definition={defined} />
                </>
            )
        case 'win':
            if(localStorage.getItem('user')){
                return(
                    <>
                        <Box className={classes.arrowsContainer}>
                            <Button onClick={()=>setUI('back')}>
                                <ArrowBackIosIcon />
                            </Button>
                        </Box>                    
                        
                        <Winner puzzleID={match.params.id} />
                    </>
                )
            } else {
                return(
                    <>
                        <Box className={classes.arrowsContainer}>
                            <Button onClick={()=>setUI('back')}>
                                <ArrowBackIosIcon />
                            </Button>
                        </Box>  
                        <Typography variant="h3">
                            Log in to record your progress and rate the puzzle!
                        </Typography>
                        <Login updateLogin={updateLogin}/>
                    </>
                )
            }

        default:
            return(
                <Box className={classes.loadingCircle}>
                    <CircularProgress />
                </Box>
            )
    }
}

export default Play