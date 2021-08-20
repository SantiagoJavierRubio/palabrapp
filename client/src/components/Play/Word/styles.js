import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    wordContainerLeft: {
        paddingTop: '1.5vh',
        display: 'flex',
        justifyContent: "flex-end",
        flexWrap: "nowrap",
        flexGrow: 1,
    },
    wordContainerCenter: {
        paddingTop: '1.5vh',
        paddingRight: '.7vw',
        paddingLeft: '.7vw',
        display: 'flex',
        justifyContent: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        width: 'fit-content',
    },
    wordContainerRight: {
        paddingTop: '1.5vh',
        display: 'flex',
        justifyContent: "flex-start",
        flexWrap: "nowrap",
        flexGrow: 1,
    },
    letter: {
        width: '5vw',
        height: '5vw',
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
        fontSize: '3.5vw',
        height: '80%',
        width: '100%',
        border: "none",
    },
    letterInputCenter: {
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: '3.5vw',
        height: '80%',
        width: '100%',
        border: "none",
        backgroundColor: 'beige'
    }
}))
