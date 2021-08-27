import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating/Rating';
import axios from 'axios';
import { Typography, Box, Button, CircularProgress } from '@material-ui/core';
import useStyles from './styles';


const Winner = (props) => {

    const { puzzleID } = props;

    const classes = useStyles();

    const [puzzleData, setPuzzleData] = useState({});
    const [userData, setUserData] = useState({});

    const setCompleted = async () => {
        const response= await axios.post(process.env.REACT_APP_API_URI+'/posts/complete', {
            puzzleID: puzzleID,
            userID: localStorage.getItem('user')
        })
        setPuzzleData(response.data.puzzle);
        setUserData(response.data.user);
    }

    useEffect(()=>{
        setCompleted();
    }, [])

    if(userData.userID){
        if(userData.userID!==puzzleData.creator.userID){
            return(
                <Box className={classes.winnerMain}>
                    <Box className={classes.puzzleData}>
                        <Typography className={classes.congratsText} variant="h2">Well done!</Typography>
                        <Typography className={classes.puzzleInfo} variant="h4">
                            You solved {puzzleData.creator.username}'s puzzle.
                        </Typography>
                        <Typography className={classes.puzzleSecret} variant="h5">{puzzleData.secret}</Typography>
                    </Box>
                    <Box>
                        <Rating puzzleData={puzzleData} userData={userData} />
                    </Box>
                    <Box className={classes.optionsMenu}>
                        <Link to={`/profile/${puzzleData.creator.userID}`} className={classes.optionLink}>
                            <Button variant="contained" color="primary" >
                                See more puzzles by {puzzleData.creator.username}
                            </Button>
                        </Link>
                        <Typography variant="body2" className={classes.orTypo}>
                            OR
                        </Typography>
                        <Link to="/lobby" className={classes.optionLink}>
                            <Button variant="contained" color="secondary">
                                Return to lobby
                            </Button>
                        </Link>
                    </Box>
                </Box>
            )
        } else {
            return(
                <Box className={classes.winnerMain}>
                    <Box className={classes.puzzleData}>
                        <Typography className={classes.congratsText} variant="h2">You solved your own puzzle</Typography>
                        <Typography className={classes.puzzleInfo} variant="h4">
                            That sure was easy!
                        </Typography>
                        <Typography className={classes.puzzleSecret} variant="h5">{puzzleData.secret}</Typography>
                    </Box>
                    <Box className={classes.optionsMenu}>
                        <Link to={`/profile/${puzzleData.creator.userID}`} className={classes.optionLink}>
                            <Button variant="contained" color="primary" >
                                See more of your puzzles.
                            </Button>
                        </Link>
                        <Typography variant="body2" className={classes.orTypo}>
                            OR
                        </Typography>
                        <Link to="/lobby" className={classes.optionLink}>
                            <Button variant="contained" color="secondary">
                                Return to lobby
                            </Button>
                        </Link>
                    </Box>
                </Box>
            )
        }
    } else {
        return(
            <Box className={classes.winnerMain}>
                <CircularProgress />
            </Box> 
        )
    }
}

export default Winner;