import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(()=>({
    loginModal: {
        margin: '0 auto',
        position: 'absolute',
        marginTop: '50vh',
        transform: 'translate(0, -50%)',
        display: 'flex',
        width: 'fit-content',
        height: 'fit-content',
        backgroundColor: '#999',
        border: '3px solid black',
        boxShadow: '1px 1px',
    },
    loginBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexGrow: 1,
        margin: '1rem',
        padding: '1rem'
        
    },
    loginHeader: {
        fontSize: '3rem',
        fontWeight: 500,
        marginTop: 0,
    },
    loginForm: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        alignItems: 'center',
    },
    loginNew: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: '1rem',
        alignItems: 'baseline'
    },
    newText: {
        paddingRight: '1rem',
        fontSize: '1.2rem',
    }
}))