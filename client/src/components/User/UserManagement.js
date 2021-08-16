import React, { useState } from 'react';

import { Button } from '@material-ui/core';

import Register from './Register/Register';
import Login from './Login/Login';
import useStyles from './styles';



const UserManagement = (props) => {

    const { logUser } = props
    const [register, setRegister] = useState(false);
    const [loginView, setLoginView] = useState(false)

    const toggleRegister = () => {
        setRegister(!register);
    }

    const toggleView = () => {
        setLoginView(!loginView)
    }

    if(loginView){
        return(
            <>
                <Button variant="outlined" onClick={toggleView}>Sign In</Button>
                {register ? (
                    <Register logUser={logUser} toggleRegister={toggleRegister} toggleView={toggleView}/>
                ) : (
                    <Login logUser={logUser} toggleRegister={toggleRegister} toggleView={toggleView}/>
                )}
            </>
        )
    } else {
        return(
            <Button variant="outlined" onClick={toggleView}>Sign In</Button>
        )
    }

}

export default UserManagement;