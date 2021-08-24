import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(()=>({
    loginBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1,
        margin: '1rem',
        padding: '1rem'
        
    },
    loginHeader: {
        fontSize: '2rem',
        textAlign: 'center',
        fontWeight: 500,
        marginTop: 0,
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '1rem',
        alignItems: 'center',
    },
    loginBtn: {
        marginTop: '1rem',
    }
}))