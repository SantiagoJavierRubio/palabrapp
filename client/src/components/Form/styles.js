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
        marginBottom: '.5rem',
        '& input': {
            fontSize: '2rem',
        }
    },
    createBtn: {
        marginTop: '.5rem',
    },
    secretTitle: {
        textDecoration: 'underline',
        fontSize: '4rem',
        marginTop: '1rem',
        marginBottom: '1rem',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            fontSize: '3rem',
            marginTop: '.8rem',
            marginBottom: '.8rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
            marginTop: '.5rem',
            marginBottom: '.5rem',
        },  
    },
    wordContainer: {
        marginTop: '1rem',
        fontSize: '3rem',
        textTransform: 'uppercase',
        flexWrap: 'nowrap',
        [theme.breakpoints.down('md')]: {
            fontSize: '2rem',
            marginTop: '.4rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
            marginTop: '.2rem',
        },
    },
    secretWord: {
        fontWeight: 'bold',
        color: 'crimson',
        backgroundColor: 'beige',
        border: '.1rem solid grey',
        borderRadius: '20%',
        margin: '0rem .2rem',
        maxWidth: '4rem',
        minWidth: '3rem',
        [theme.breakpoints.down('md')]: {
            maxWidth: '3rem',
            minWidth: '2rem',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '2rem',
            minWidth: '1rem',
        }, 
    },
    buttonsBox: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            marginTop: '1rem',
        },
    },
    formBtn: {
        fontSize: '1.3rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '.8rem',
        },
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
    donePageBtn: {
        marginTop: '1.5rem'
    }
}));