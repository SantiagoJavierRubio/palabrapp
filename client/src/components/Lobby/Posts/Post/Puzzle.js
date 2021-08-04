import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';
    

const Puzzle = (props) => {
    const classes = useStyles();
    const { puzzle_data } = props
    const { _id, rating, createdAt, secret, words, creator } = puzzle_data;

    return(
        <>
            <h1>
                {creator}'s Puzzle
            </h1>
            <p>{secret.length} characters long</p>
            <Link to={`/play/${_id}`}>
                <button>Play</button>
            </Link>
            <p>Rating: {rating}</p>
            <p>Date: {createdAt}</p>
        </>
    );
}

export default Puzzle;