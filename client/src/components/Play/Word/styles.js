import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    wordContainerLeft: {
        paddingTop: '.5rem',
        display: 'flex',
        justifyContent: "flex-end",
        flexWrap: "nowrap",
        flexGrow: 1,
    },
    wordContainerCenter: {
        paddingTop: '.5rem',
        paddingRight: '.5rem',
        paddingLeft: '.5rem',
        display: 'flex',
        justifyContent: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        width: 'fit-content',
    },
    wordContainerRight: {
        paddingTop: '.5rem',
        display: 'flex',
        justifyContent: "flex-start",
        flexWrap: "nowrap",
        flexGrow: 1,
    },
    letter: {
        width: '5rem',
        height: '5rem',
        [theme.breakpoints.down('md')]: {
            width: '3rem',
            height: '3rem',
        },
        [theme.breakpoints.down('sm')]: {
            width: '2rem',
            height: '2rem',
        },
        justifyContent: "space-evenly",
        alignItems: "center",
        textAlign: "center",
    },
    sideLetter: {
        backgroundColor: 'rgb(0,100,40)'
    },
    paper: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    },
    paperCenter: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'beige'
    },
    letterInput: {
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: '2.5rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '.8rem',
        },
        height: '80%',
        width: '100%',
        border: "none",
    },
    letterInputCenter: {
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: '2.5rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '.8rem',
        },
        height: '80%',
        width: '100%',
        border: "none",
        backgroundColor: 'beige'
    }
}))
