import React, { useState } from 'react';

import { Button } from '@material-ui/core';

import Register from './Register/Register';
import Login from './Login/Login';
import useStyles from './styles';



const UserManagement = (props) => {

    const { logUser } = props
    const [register, setRegister] = useState(false);

    const toggleRegister = () => {
        setRegister(true);
    }

    if(register){
        return(
            <Register logUser={logUser} />
        )
    } else {
        return(
            <>
                <Login logUser={logUser} register={toggleRegister}/>
            </>
        )
    }
}

export default UserManagement;