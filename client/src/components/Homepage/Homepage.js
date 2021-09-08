import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography, Button, Fab, CircularProgress, Card, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import ExtensionIcon from '@material-ui/icons/Extension';
import useStyles from './styles';
import Puzzle from '../Lobby/Puzzles/Puzzle/Puzzle';

const Homepage = () => {

    const classes = useStyles();
    const [randPuzzle, setRandPuzzle] = useState();
    const [latestPuzzle, setLatestPuzzle] = useState();

    const getPuzzles = async () => {
        const response = await axios.get(process.env.REACT_APP_API_URI+'/posts/')
            .catch(err => console.log(err));
        const puzzles = response.data;
        setLatestPuzzle(puzzles[puzzles.length-1]);
        setRandPuzzle(puzzles[Math.floor(Math.random()*puzzles.length)]);
    }

    useEffect(() => {
        getPuzzles();
    }, [])

    return(
        <Box>
            <Box>
                <Typography variant="h2" className={classes.homeHeader}>Welcome to PalabrApp!</Typography>
                <Typography variant="body1" className={classes.homeExplain}>Solve and create puzzles to practice your spanish or just to have fun</Typography>
            </Box>
            <Grid container spacing={1} className={classes.homeMain}>
                <Grid item xs={12} container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <Card className={`${classes.buttonCard} ${classes.createCard}`}>
                            <Typography variant="h4">Create new puzzle</Typography>
                            <CardContent>
                                <Fab component={Link} to="/create" color="secondary">
                                    <AddIcon fontSize="large" />
                                </Fab>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className={`${classes.buttonCard} ${classes.lobbyCard}`}>
                            <Typography variant="h4">Go to lobby</Typography>
                            <CardContent>
                                <Fab component={Link} to="/lobby" color="primary">
                                    <ExtensionIcon fontSize="large"/>
                                </Fab>  
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.puzzleCard}>
                        <Typography className="cardTitle">Newest puzzle</Typography>
                        {latestPuzzle ? (
                            <Puzzle puzzle_data={latestPuzzle} ownProfileDisplay={false} />
                        ):(
                            <CircularProgress />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.puzzleCard}>
                        <Typography className="cardTitle">Random puzzle</Typography>
                        {randPuzzle ? (
                            <Puzzle puzzle_data={randPuzzle} ownProfileDisplay={false} />
                        ):(
                            <CircularProgress />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
       
    )
}

export default Homepage;