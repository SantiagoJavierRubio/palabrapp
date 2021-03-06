import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, ClickAwayListener } from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios';

const Login = (props) => {

    const [showModal, setModal] = useState(true);
    const [logError, setError] = useState({ usr: false, pass: false });
    const { logUser, toggleRegister, toggleView } = props;
    const classes = useStyles()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const log_data = {
            id: document.getElementById('login-id').value,
            password: document.getElementById('login-password').value
        }
        const validation = await axios.post(process.env.REACT_APP_API_URI+'/user/validate', log_data);
        if(!validation.data.noUser){
            if(validation.data.userID){
                        logUser(validation.data.userID);
                        toggleView();
                        localStorage.setItem('user', validation.data.userID);
                    } else {
                        setError({ usr: false, pass: true });
                    }
        } else {
            setError({ usr: true, pass: false })
        }
    }

    const handleClose = () => {
        setModal(false);
        toggleView();
    }

    return(
        <ClickAwayListener onClickAway={handleClose}>
            <Modal open={showModal} BackdropProps={{invisible: true}} onClose={handleClose} className={classes.loginModal}>
                <Box className={classes.loginBox}>
                    <Typography variant="h2" className={classes.loginHeader}>Sign in</Typography>
                    <form onSubmit={handleSubmit} className={classes.loginForm}>
                        <TextField required id="login-id" label="User ID" type="text" inputProps={{ minLength: 6, maxLength: 20 }} error={logError.usr}/>
                        <TextField required id="login-password" label="Password" type="password" inputProps={{ minLength: 6, maxLength: 15 }} error={logError.pass} />
                        <Button variant="contained" color="primary" type="submit">Login</Button>
                    </form>
                    <Box className={classes.loginNew}>
                        <Typography variant="h6" className={classes.newText}>New?</Typography>
                        <Button variant="contained" color="secondary" onClick={toggleRegister}>
                            Register
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </ClickAwayListener>
    )
}

export default Login;