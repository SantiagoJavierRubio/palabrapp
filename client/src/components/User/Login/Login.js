import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios';

const Login = (props) => {

    const [showModal, setModal] = useState(true);
    const { logUser, register } = props;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const log_data = {
            id: document.getElementById('login-id').value,
            password: document.getElementById('login-password').value
        }
        const validation = await axios.post('http://localhost:5000/user/validate', log_data);
        if(validation.data.userID){
            logUser(validation.data.userID);
            localStorage.setItem('user', validation.data.userID);
        }
    }

    return(
        <Modal open={showModal} onClose={()=>setModal(false)}>
            <Box>
                <Typography variant="h2">Sign in</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField required id="login-id" label="User ID" type="text" inputProps={{ minLength: 6, maxLength: 20 }} />
                    <TextField required id="login-password" label="Password" type="password" inputProps={{ minLength: 6, maxLength: 15 }} />
                    <Button variant="contained" type="submit">Login</Button>
                </form>
                <Button variant="contained" color="secondary" onClick={register}>
                    Register
                </Button>
            </Box>
        </Modal>
    )
}

export default Login;