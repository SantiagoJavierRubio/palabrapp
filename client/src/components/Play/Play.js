import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Grid, CircularProgress, Box, Button, Typography, Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
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
    const [layout, loadLayout] = useState({ left: [], center: [], right: [] });
    const [usrInput, loadInput] = useState([]);
    const [solution, loadSolution] = useState([]);
    const [indexMap, setIndexMap] = useState([]);
    const [defined, setDefined] = useState("");
    const [UIState, setUI] = useState('');
    const [focused, setFocus] = useState('root');
    const [gameState, setGameState] = useState({ incomplete: [], wrong: [], correct: [], vertical: false });
    const [newLogin, setNewLogin] = useState(null);
    const [winDialog, setWinDialog] = useState(false);
    const [userID, setUserID] = useState();

    const classes = useStyles();

    // Game and UI set up.

    const updateLogin = () => {
        const new_login = localStorage.getItem('user');
        setNewLogin(new_login);
    }

    useEffect(() => {
        setUserID(localStorage.getItem('user'));
        fetchPuzzle();
    }, []);

    const checkMemory = () => {
        puzzle.usersInfo.forEach(user => {
            if(user.userID === userID){
                if(user.gameState.correct.length===puzzle.secret.length || user.gameState.vertical){
                    setUI('back')
                }
                return setGameState(user.gameState);
            }
        })
        setFocus('c-0-0');
    }

    useEffect(() => {
        if(puzzle.secret){
            createLayout();
            createUsrInput();
            setUI('done');
            checkMemory();
        }
    }, [puzzle]);

    const fetchPuzzle = async () => {
        const response = await axios.get(process.env.REACT_APP_API_URI+`/posts/${match.params.id}`)
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
    }


    // Input and output management

    // Sets the focus to the target of the focus state
    useEffect(()=>{
        if(document.getElementById(focused)){
            document.getElementById(focused).focus();
        } else {
            console.log(indexMap.indexOf(focused))
        }
    }, [focused]);

    // Updates the definition of the Definition component on focus change
    const id_match = new RegExp(/(?!-)[0-9]*/, 'g');
    useMemo(() => {
        if(puzzle.definitions && document.getElementById(focused)){
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
                    let target = indexMap[inputCoords.y][inputSum-1][0];
                    if(gameState.vertical && target[0]==='c'){
                        if(indexMap[inputCoords.y][inputSum-2]){
                            target = indexMap[inputCoords.y][inputSum-2][0];
                        } else {
                            return;
                        }
                    }
                    return setFocus(target);; 
                } else {
                    return;
                }
            case "forward":
                if(inputSum < indexMap[inputCoords.y].length-1){
                    let target = indexMap[inputCoords.y][inputSum+1][0];
                    if(gameState.vertical && target[0]==='c'){
                        if(indexMap[inputCoords.y][inputSum+2][0]){
                           target = indexMap[inputCoords.y][inputSum+2][0] 
                        } else {
                            return;
                        }
                    }
                    return setFocus(target);; 
                } else {
                    return;
                }
            case "up":
                if(inputCoords.y !== 0){
                    let y = inputCoords.y-1
                    for(y; y>=0; y--){
                        if(!gameState.correct.includes(y)){
                            if(gameState.vertical && indexMap[y][0][0][0]==='c'){
                                const target = indexMap[y][1][0];
                                return setFocus(target);
                            } else {
                                const target = indexMap[y][0][0];
                                return setFocus(target);
                            }
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
                            if(gameState.vertical && indexMap[y][0][0][0]==='c'){
                                const target = indexMap[y][1][0];
                                return setFocus(target);
                            } else {
                                const target = indexMap[y][0][0];
                                return setFocus(target);
                            }
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

    const saveProgress = async (wordState) => {
        if(userID){
            const response = await axios.post(process.env.REACT_APP_API_URI+'/posts/save_progress', {
                puzzleID: puzzle._id,
                userID: userID,
                gameState: wordState
            });
        }
    }

    // updates the gameState
    const checkSolutions = (solutionCheck, verticalInput) => {
        const wordState = {
            incomplete: [],
            wrong: [],
            correct: gameState.correct,
            vertical: gameState.vertical
        }
        solution.forEach((solution, index)=>{
            if(solutionCheck[index].length === solution.length){
                if(solution === solutionCheck[index] && !wordState.correct.includes(index)){
                    wordState.correct.push(index);
                    saveProgress(wordState);
                } else if(solution !== solutionCheck[index]) {
                    wordState.wrong.push(index);
                }
            } else {
                wordState.incomplete.push(index);
            }
        });
        if(verticalInput===puzzle.secret.toUpperCase()){
            wordState.vertical = true;
            if(!gameState.vertical){
                setWinDialog(true);
                saveProgress(wordState);
            }
        }
        if(wordState.correct.length !== gameState.correct.length){  
            if(wordState.correct.length===puzzle.secret.length){
                setUI('win');
            }
        }
        setGameState(wordState);
    }

    useEffect(()=>{
        if(puzzle.secret){
            const solutionCheck = [];
            let verticalInput = ''
            usrInput.forEach((word, index) => {
                solutionCheck.push(word.toString().replaceAll(',','').toUpperCase())
                verticalInput += word[puzzle.words[index][0].length][0]
            });
            checkSolutions(solutionCheck, verticalInput);
        }
        
    }, [usrInput]);

    const handleWinDialogClose = () => {
        setWinDialog(false);
        setUI('back');
    }

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
                {gameState.vertical ? (
                    <Dialog open={winDialog} onClose={handleWinDialogClose}>
                        <DialogContent>
                            <DialogContentText className={classes.dialogHeader}>
                                You guessed the secret word!
                            </DialogContentText>
                            <DialogContentText className={classes.dialogMessage}>
                                But there are still {puzzle.secret.length-gameState.correct.length} words to solve
                            </DialogContentText>
                            <DialogContentText className={classes.dialogQuestion}>
                                Do you want to see the winning page now? (you can continue solving later)
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleWinDialogClose} color="secondary" variant="contained">
                                Continue solving now
                            </Button>
                            <Button onClick={()=>setUI('win')} color="primary" variant="contained">
                                Go to winning page
                            </Button>
                        </DialogActions>
                    </Dialog>
                ):null}
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