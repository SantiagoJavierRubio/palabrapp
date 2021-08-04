import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import Word from './Word/Word';

const Play = ({ match }) => {

    const [puzzle, loadPuzzle] = useState({});
    const [layout, loadLayout] = useState({left: [], center: [], right: []});

    const classes = useStyles();

    useEffect(() => {
        fetchPuzzle()
    }, []);

    useEffect(() => {
        if(puzzle.secret){
            createLayout();
        }
    }, [puzzle]);

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

        // Gets values every input 
//$$ TO-DO to check if complete and to focus on next letter TO-DO $$
//∞∞ THEN: add word definitions on new component under current display ∞∞
    const getValue = (value) => {
        console.log(value);
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