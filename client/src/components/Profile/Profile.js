import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile/UserProfile';
import OwnProfile from './OwnProfile/OwnProfile';
import useStyles from './styles';

const Profile = ({ match }) => {

    const [userData, setUserData] = useState();
    const [errorMessage, setErrorMessage] = useState('User not found');
    const [isOwn, setOwner] = useState(false);

    const getUserData = async () => {
        const user_data = await axios.get(process.env.REACT_APP_API_URI+`/user/${match.params.id}`);
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
            setErrorMessage('Please sign in or create an account to view your profile');
        }
    }, [])

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
            <h6>{errorMessage}</h6>
        )
    }
}

export default Profile;