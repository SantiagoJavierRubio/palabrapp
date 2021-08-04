import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Puzzle from './Post/Puzzle'
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

    return(
        <>
            {puzzles.map(puzzle => {
                return(
                    <Puzzle key={puzzle._id} puzzle_data={puzzle} />
                )
            })
            }
        </>
    );
}

export default Puzzles;