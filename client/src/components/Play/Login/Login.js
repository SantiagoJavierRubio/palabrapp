import React from 'react';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios';

const Login = (props) => {

    const classes = useStyles()

    const { updateLogin } = props;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const log_data = {
            id: document.getElementById('login-id').value,
            password: document.getElementById('login-password').value
        }
        const validation = await axios.post(process.env.REACT_APP_API_URI+'/user/validate', log_data);
        if(validation.data.userID){
            localStorage.setItem('user', validation.data.userID);
            updateLogin();
        }
    }

    return(
        <Box className={classes.loginBox}>
            <Typography variant="h2" className={classes.loginHeader}>Sign in</Typography>
            <form onSubmit={handleSubmit} className={classes.loginForm}>
                <TextField required id="login-id" label="User ID" type="text" inputProps={{ minLength: 6, maxLength: 20 }} />
                <TextField required id="login-password" label="Password" type="password" inputProps={{ minLength: 6, maxLength: 15 }} />
                <Button variant="contained" color="primary" type="submit" className={classes.loginBtn}>Login</Button>
            </form>
        </Box>
    )
}

export default Login;