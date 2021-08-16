import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Modal, Box, Typography } from '@material-ui/core';
import useStyles from './styles';

const Register = (props) => {

    const { logUser } = props;

    const [idHelp, setIdHelp] = useState({ text: 'You will need this to log in later', error: false });
    const [showModal, setModal] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userInput = {
            id: document.getElementById("register-id").value,
            username: document.getElementById('register-name').value,
            password: document.getElementById('register-password').value
        }
        let check_user = await axios.get(`http://localhost:5000/user/${userInput.id}`);
        if(check_user.data){
            setIdHelp({ text: 'ID taken, try another.', error: true});
        } else {
            try{
                axios.post('http://localhost:5000/user/new', userInput);
                const user_data = await axios.get(`http://localhost:5000/user/${userInput.id}`);
                setModal(false);
                logUser(user_data.userID);
                localStorage.setItem('user', user_data.userID);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return(
        <Modal open={showModal} onClose={()=>setModal(false)}>
            <Box>
                <Typography variant="h2">Register</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField required id="register-id" label="User ID" type="text" inputProps={{ minLength: 6, maxLength: 20 }} helperText={idHelp.text} error={idHelp.error} />
                    <TextField required id="register-name" label="Username" type="text" helperText="Main name other users will see." />
                    <TextField required id="register-password" label="Password" type="password" inputProps={{ minLength: 6, maxLength: 15 }} />
                    <Button variant="contained" type="submit">Submit</Button>
                </form>
            </Box>
        </Modal>
    )
}

export default Register;