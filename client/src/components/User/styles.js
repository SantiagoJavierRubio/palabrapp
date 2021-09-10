import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    loginBtn: {
        [theme.breakpoints.down("md")]: {
            fontSize: '.9rem',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '.6rem',
        },
        
    }
}))