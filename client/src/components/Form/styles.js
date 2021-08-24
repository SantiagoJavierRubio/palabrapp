import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    secretForm: {
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        marginTop: '.5rem',
        marginBottom: '.5rem'
    },
    createBtn: {
        marginTop: '.5rem',
    },
    secretTitle: {
        textDecoration: 'underline',
        fontSize: '4rem',
        textAlign: 'center',
        marginTop: '1rem',
    },
    wordContainer: {
        marginTop: '1rem',
        fontSize: '2rem',
        textTransform: 'uppercase',
    },
    secretWord: {
        fontWeight: 'bold',
        color: 'crimson',
        border: '.1rem solid grey',
        borderRadius: '20%',
        margin: '0rem .2rem'
    },
    buttonsBox: {
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
    },
    loadingCircle: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem',
    },
    donePage: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '1rem',
        flexDirection: 'column',
    },
}));