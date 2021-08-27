import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Button } from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import axios from 'axios'
import useStyles from './styles';

const Rating = (props) => {

    const { userData, puzzleData } = props;
    const [UIState, setUI] = useState('loading');
    const [rating, setRating] = useState(0);
    const [avgRating, setAvg] = useState(0);

    const classes = useStyles();

    useEffect(() => {
        if(userData.ratedPuzzles.includes(puzzleData._id)){
            setUI('hasRating');
        } else {
            setUI('ready')
        }
    }, []);

    const handleRating = async () => {
        setUI('loading');
        const response = await axios.post(process.env.REACT_APP_API_URI+'/posts/rate', {
            userID: userData.userID,
            puzzleID: puzzleData._id,
            rating: rating
        })
        setAvg(response.data.stats.rating);
        setUI('rated');
    }

    switch(UIState){
        case 'loading':
            return(
                <Box className={classes.ratingMain}>
                    <CircularProgress />
                </Box>
                
            )
        case 'hasRating':
            return(
                <Typography variant="body2" className={classes.ratingMain}>
                    You have already rated this puzzle
                </Typography>
            )
        case 'ready':
            return(
                <Box className={classes.ratingMain}>
                    {[1,2,3,4,5].map(num=>{
                        return(
                            <Button key={num} onMouseOver={()=>setRating(num)} className={classes.rateStar} onClick={handleRating}>
                                {rating>num-1 ? (
                                    <StarIcon className={classes.star}/>
                                ):(
                                    <StarOutlineIcon className={classes.star}/>
                                )}
                             </Button>
                        )
                    })}
                </Box>
            )
        case 'rated':
            return(
                <Box className={classes.ratingMain}>
                    <Typography variant="body2">
                        Rating recorded
                    </Typography>
                    <Typography variant="body2" className={classes.avgRating}>
                        Average rating: {avgRating.toFixed(2)}
                    </Typography>
                </Box>
            )
    }
}

export default Rating;