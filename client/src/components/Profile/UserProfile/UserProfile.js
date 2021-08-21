import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Puzzle from '../../Lobby/Posts/Post/Puzzle';
import { Box, Typography, Avatar, CircularProgress, Grid } from '@material-ui/core';
import useStyles from './styles';

const UserProfile = (props) => {

    const { userData } = props;

    const [avgRating, setAvgRating] = useState(null);
    const [puzzles, setPuzzles] = useState(null);

    const getPuzzles = async () => {
        const response = await axios.get(`http://localhost:5000/user/${userData.userID}/puzzles`);
        setPuzzles(response.data.puzzles);
    }

    useEffect(() => {
        getPuzzles();
    }, []);

    useEffect(() => {
        if(puzzles){
            let sum = 0;
            for(let puzzle of puzzles){
                sum += puzzle.stats.rating;
            }
            if(sum === 0){
                setAvgRating(0);
            } else {
                const avg = sum / puzzles.length;
                setAvgRating(avg.toFixed(2));
            }
        }
    }, [puzzles]);

    const classes = useStyles();

    if(puzzles){
        return(
            <Box className={classes.main}>
                <Box component="span" className={classes.userInfo}>
                    <Box component="div" className={classes.basicInfo}>
                        <Avatar className={classes.userAvatar}>{userData.username[0]}</Avatar>
                        <Typography variant="h2" className={classes.userName}>{userData.username}</Typography>
                    </Box>
                    <Box component="div" className={classes.moreInfo}>
                        <div className={classes.about}>
                            <Typography variant="h6" className={classes.aboutHeader}>About me</Typography>
                            <Typography variant="body2" className={classes.aboutText}>[Placeholder text] Car Pintos ha desarrollado un estilo estridente y particular a través de su recorrido por el alma de la naturaleza. Diseñadora gráfica e ilustradora Argentina. Estudió en la Universidad de Buenos Aires graduándose con Honores en la FADU. Su trabajo recorre varios países como USA, Rusia, Ucrania, entre otros.</Typography>
                        </div>
                        <div className={classes.puzzlesData}>
                            <Typography variant="h6" className={classes.dataText}>Puzzles solved: {userData.points}</Typography>
                            <Typography variant="h6" className={classes.dataText}>Puzzles created: {puzzles.length}</Typography>
                            <Typography variant="h6" className={classes.dataText}>Average rating: {avgRating}</Typography>
                        </div>
                    </Box>
                </Box>
                <Box component="div" className={classes.userPuzzles}>
                    <Typography variant="h4" className={classes.puzzlesHeader}>My puzzles</Typography>
                    <Grid container className={classes.puzzleContainer} spacing={3}>
                        {puzzles.map(puzzle => {
                            return(
                                <Grid item key={puzzle._id} xs={12} sm={6} md={4}>
                                    <Puzzle puzzle_data={puzzle} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </Box>
        )
    } else {
        return(
            <Box component="span" className={classes.userInfo}>
                <CircularProgress />
            </Box>
        )
    }

}

export default UserProfile;