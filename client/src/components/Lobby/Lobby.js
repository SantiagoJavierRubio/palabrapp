import React, { useState, useEffect } from 'react';
import { Button, Typography, Select, MenuItem, InputLabel, Box, CircularProgress } from '@material-ui/core'
import axios from 'axios';
import Puzzles from './Puzzles/Puzzles';
import useStyles from './styles'

const Lobby = () => {
    const [allPuzzles, loadPuzzles] = useState(null);
    const [puzzles, setPuzzles] = useState([]);
    const [toLoad, setToLoad] = useState(1);
    const [filter, setFilter] = useState('newest');

    const classes = useStyles();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(process.env.REACT_APP_API_URI+'/posts/')
            .catch(err => console.log(err.message));
        loadPuzzles(response.data);
    }

    useEffect(() => {
        if(allPuzzles){
            generatePuzzleSets();
        }
    }, [allPuzzles, toLoad, filter]);

    const handleFilter = (e) => {
        setFilter(e.target.value);
        setToLoad(1);
    }

    const filterPuzzles = () => {
        const puzzleArray = [...allPuzzles];
        switch(filter){
            case 'newest':
                puzzleArray.sort((a,b)=> a.createdAt < b.createdAt ? 1 : -1);
                return(puzzleArray);
            case 'oldest':
                return(puzzleArray);
            case 'best':
                puzzleArray.sort((a,b)=> a.stats.rating < b.stats.rating ? 1 : -1);
                return(puzzleArray);
            case 'mostPlayed':
                puzzleArray.sort((a,b)=> a.stats.timesPlayed < b.stats.timesPlayed ? 1 : -1);
                return(puzzleArray);
            case 'leastPlayed':
                puzzleArray.sort((a,b)=> a.stats.timesPlayed > b.stats.timesPlayed ? 1 : -1);
                return(puzzleArray);
            case 'mostCompleted':
                puzzleArray.sort((a,b)=> a.stats.timesCompleted < b.stats.timesCompleted ? 1 : -1);
                return(puzzleArray);
            case 'leastCompleted':
                puzzleArray.sort((a,b)=> a.stats.timesCompleted > b.stats.timesCompleted ? 1 : -1);
                return(puzzleArray);
            case 'shortest':
                puzzleArray.sort((a,b)=> a.secret.length > b.secret.length ? 1 : -1);
                return(puzzleArray);
            case 'longest':
                puzzleArray.sort((a,b)=> a.secret.length < b.secret.length ? 1 : -1);
                return(puzzleArray);
            default: return;
        }
    }

    const generatePuzzleSets = () => {
        const newPuzzleSet = [];
        const filteredPuzzles = filterPuzzles();
        for(let i=0; i<toLoad; i++){
            const newSet = filteredPuzzles.slice(i*6, (i*6)+6);
            newPuzzleSet.push(newSet);
        }
        setPuzzles(newPuzzleSet);
    }

    if(allPuzzles){
        return(
            <Box className={classes.mainLobby}>
                <Box className={classes.sortingBox}>
                    <InputLabel shrink>
                        Sort by
                    </InputLabel>
                    <Select onChange={handleFilter} defaultValue={"newest"}>
                        <MenuItem value={"newest"}>Newest</MenuItem>
                        <MenuItem value={"oldest"}>Oldest</MenuItem>
                        <MenuItem value={"best"}>Best rated</MenuItem>
                        <MenuItem value={"mostPlayed"}>Most played</MenuItem>
                        <MenuItem value={"leastPlayed"}>Least played</MenuItem>
                        <MenuItem value={"mostCompleted"}>Most times completed</MenuItem>
                        <MenuItem value={"leastCompleted"}>Least times completed</MenuItem>
                        <MenuItem value={"shortest"}>Shortest</MenuItem>
                        <MenuItem value={"longest"}>Longest</MenuItem>
                    </Select>
                </Box>
                {puzzles.map((set, index) => {
                    return(
                       <Puzzles key={index} puzzles={set} /> 
                    )   
                })}
                <Box className={classes.moreBtn}>
                    {toLoad*6<allPuzzles.length ? (
                        <Button variant="outlined" color="primary" onClick={()=>setToLoad(toLoad+1)}>Load more</Button>
                    ):(
                        <Typography>No more puzzles to show. Create more yourself!</Typography>
                    )}
                </Box>
            </Box>
        )
    } else {
        return(
            <CircularProgress />
        )
    }
    
}

export default Lobby;