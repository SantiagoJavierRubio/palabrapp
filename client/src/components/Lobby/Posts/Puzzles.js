import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Puzzle from './Post/Puzzle';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
    
const Puzzles = () => {
    const classes = useStyles();

    const [puzzles, loadPuzzles] = useState([]);

    useEffect(() => {
        fetchData();
    }, [loadPuzzles]);

    const fetchData = async () => {
        const response = await axios.get('http://localhost:5000/posts/')
            .catch(err => console.log(err.message));
        loadPuzzles(response.data);
    }

    if(puzzles[0]){
        return(
            <Grid className={classes.gridContainer} container alignItems="stretch" spacing={3} >
                {puzzles.map(puzzle => {
                    return(
                        <Grid key={puzzle._id} item xs={12} sm={6} md={4}>
                            <Puzzle puzzle_data={puzzle} />
                        </Grid>
                    )
                })
                }
            </Grid>
        );
    } else {
        return(
            <CircularProgress />
        )
    }

}

export default Puzzles;