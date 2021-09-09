import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@material-ui/core'
import axios from 'axios';
import UserProfile from './UserProfile/UserProfile';
import OwnProfile from './OwnProfile/OwnProfile';
import useStyles from './styles';

const Profile = ({ match }) => {

    const [userData, setUserData] = useState();
    const [errorMessage, setErrorMessage] = useState('User not found');
    const [isOwn, setOwner] = useState(false);
    const [hasUser, setHasUser] = useState(true);

    const classes = useStyles();

    const getUserData = async () => {
        const user_data = await axios.get(process.env.REACT_APP_API_URI+`/user/${match.params.id}`);
        if(!user_data.data.userID){
            setHasUser(false);
            return;
        }
        setUserData(user_data.data);
        let loggedUser = localStorage.getItem('user');
        if(loggedUser === user_data.data.userID){
            setOwner(true);
        }
    }

    useEffect(() => {
        if(match.params.id !== 'null'){
            getUserData()
        } else {
            setHasUser(false);
            setErrorMessage('Please sign in or create an account to view your profile');
        }
    }, []);

    if(hasUser){
        if(userData){
            if(isOwn){
                return(
                    <>
                        <OwnProfile userData={userData} />
                    </>  
                )
            } else {
                return(
                    <UserProfile userData={userData} />
                )
            }
        } else {
            return(
                <CircularProgress />
            ) 
        }
    } else {
        return(
            <Typography variant="body2" className={classes.errorMessage}>
                {errorMessage}
            </Typography>
        )
    }
}

export default Profile;