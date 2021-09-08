import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(()=>({
    registerModal: {
        margin: '0 auto',
        position: 'absolute',
        marginTop: '50vh',
        transform: 'translate(0, -50%)',
        display: 'flex',
        width: 'fit-content',
        height: 'fit-content',
        backgroundColor: 'rgb(234,234,234)',
        border: '3px solid black',
        boxShadow: '1px 1px',
    },
    registerBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexGrow: 1,
        margin: '1rem',
        padding: '1rem',
        
    },
    registerHeader: {
        fontSize: '3rem',
        fontWeight: 500,
        marginTop: 0,
    },
    registerForm: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem',
        alignItems: 'stretch',
    },
    submitBtn: {
        marginTop: '1rem',
    },
    registredIcon: {
        fontSize: '2rem',
        alignSelf: 'center',
        color: '#5AEB60',
    },
    registredText: {
        fontSize: '2rem',
        fontWeight: 400,
    },
}))