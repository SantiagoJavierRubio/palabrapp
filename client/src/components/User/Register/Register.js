import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Modal, Box, Typography, ClickAwayListener } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useStyles from './styles';

const Register = (props) => {

    const { toggleRegister, toggleView } = props;

    const [idHelp, setIdHelp] = useState({ text: 'You will need this to log in later', error: false });
    const [showModal, setModal] = useState(true);
    const [isRegistred, setRegistred] = useState(false);

    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userInput = {
            id: document.getElementById("register-id").value,
            username: document.getElementById('register-name').value,
            password: document.getElementById('register-password').value
        }
        let check_user = {data: false}
        try {
            let check_user = await axios.get(`http://localhost:5000/user/${userInput.id}`);
        } catch {
            let check_user = {data: false}
        }
        if(check_user.data){
            setIdHelp({ text: 'ID taken, try another.', error: true});
        } else {
            try{
                await axios.post('http://localhost:5000/user/new', userInput);
                const user_data = await axios.get(`http://localhost:5000/user/${userInput.id}`);
                setRegistred(true);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleClose = () => {
        setModal(false);
        toggleView();
        toggleRegister();
    }

    return(
        <ClickAwayListener onClickAway={handleClose}>
            <Modal open={showModal} onClose={handleClose} className={classes.registerModal} BackdropProps={{invisible: true}}>
                {isRegistred ? ( 
                    <Box className={classes.registerBox}>
                        <CheckCircleIcon className={classes.registredIcon} />
                        <Typography variant="h6" className={classes.registredText}>Your registration is complete.</Typography>
                        <Button onClick={toggleRegister} variant="contained" color="secondary" startIcon={<ArrowBackIcon />}>
                            Sign in
                        </Button>
                    </Box>
                ) : (
                    <Box className={classes.registerBox}>
                    <Typography variant="h2" className={classes.registerHeader}>Register</Typography>
                    <form onSubmit={handleSubmit} className={classes.registerForm}>
                        <TextField required id="register-id" label="User ID" type="text" inputProps={{ minLength: 6, maxLength: 20 }} helperText={idHelp.text} error={idHelp.error} />
                        <TextField required id="register-name" label="Username" type="text" helperText="Main name other users will see." />
                        <TextField required id="register-password" label="Password" type="password" inputProps={{ minLength: 6, maxLength: 15 }} />
                        <Button variant="contained" type="submit" color="primary" className={classes.submitBtn}>Submit</Button>
                    </form>
                </Box>
                )}
            </Modal>
        </ClickAwayListener>
    )
}

export default Register;