import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Puzzle from '../../Lobby/Puzzles/Puzzle/Puzzle';
import { Box, Typography, Avatar, CircularProgress, Grid, Button, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';

const OwnProfile = (props) => {

    const { userData } = props;

    const [avgRating, setAvgRating] = useState(null);
    const [puzzles, setPuzzles] = useState(null);
    const [isEditing, setEdit] = useState(false);

    const getPuzzles = async () => {
        const response = await axios.get(process.env.REACT_APP_API_URI+`/user/${userData.userID}/puzzles`);
        setPuzzles(response.data.puzzles);
    }

    useEffect(() => {
        getPuzzles();
    }, []);

    useEffect(() => {
        if(puzzles){
            let sum = 0;
            let sumCount = 0;
            for(let puzzle of puzzles){
                if(puzzle.stats.rating!==0){
                    sum += puzzle.stats.rating;
                    sumCount++;
                }
            }
            if(sum === 0){
                setAvgRating(0);
            } else {
                const avg = sum / sumCount;
                setAvgRating(avg.toFixed(2));
            }
        }
    }, [puzzles]);

    const manageChanges = async () => {
        const usernameInput = document.getElementById('username-input').value;
        const aboutInput = document.getElementById('about-input').value;
        if(usernameInput!==userData.username || aboutInput !== userData.profile.about){
            const response = await axios.post(process.env.REACT_APP_API_URI+'/user/update', {
                userID: userData.userID,
                input: {
                    username: usernameInput,
                    about: aboutInput,
                    image: userData.image
                }
            })
            if(response.data.puzzles){
                window.location.reload();
            }
        }
    }

    const classes = useStyles();

    if(puzzles){
        return(
            <Box className={classes.main}>
                <Box className={classes.editBtn}>
                    {isEditing ? (
                        <Button onClick={manageChanges}>Set changes</Button>
                     ):(
                        <Button endIcon={<EditIcon />} onClick={()=>setEdit(true)}>Edit profile</Button>
                    )}
                </Box>
                <Box component="span" className={classes.userInfo}>
                    <Box component="div" className={classes.basicInfo}>
                        <Avatar className={classes.userAvatar} style={{backgroundColor: userData.profile.color}}>{userData.username[0]}</Avatar>
                        {isEditing ? (
                            <TextField variant="outlined" defaultValue={userData.username} InputProps={{ classes: {input: classes.resize}}} className={classes.userNameEdit} id="username-input"/>
                        ):(
                            <Typography variant="h2" className={classes.userName}>{userData.username}</Typography>
                        )}
                        
                    </Box>
                    <Box component="div" className={classes.moreInfo}>
                        <div className={classes.about}>
                            <Typography variant="h6" className={classes.aboutHeader}>About me</Typography>
                            {isEditing ? (
                                <TextField multiline defaultValue={userData.profile.about} className={classes.aboutTextEdit} rows={4} fullWidth id="about-input"/>
                            ):(
                                <Typography variant="body2" className={classes.aboutText}>{userData.profile.about}</Typography>
                            )}
                            
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
                                    <Puzzle puzzle_data={puzzle} ownProfileDisplay={true}/>
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

export default OwnProfile;