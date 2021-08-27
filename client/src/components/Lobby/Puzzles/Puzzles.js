import React from 'react';
import Puzzle from './Puzzle/Puzzle';
import { Grid, CircularProgress, Box } from '@material-ui/core';
import useStyles from './styles';
    
const Puzzles = (props) => {

    const classes = useStyles();
    const { puzzles } = props;

    if(puzzles[0]){
        return(
            <Grid className={classes.gridContainer} container alignItems="stretch" spacing={3} >
                {puzzles.map(puzzle => {
                    return(
                        <Grid key={puzzle._id} item xs={12} sm={6} md={4}>
                            <Puzzle puzzle_data={puzzle} ownProfileDisplay={false}/>
                        </Grid>
                    )
                })}
            </Grid>
        );
    } else {
        return(
            <Box className={classes.loadingBox}>
                <CircularProgress />
            </Box>
            
        )
    }

}

export default Puzzles;