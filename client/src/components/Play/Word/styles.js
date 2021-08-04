import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    wordContainer: {
        flexWrap: "nowrap",
        width: "100%",
    },
    letter: {
        height: "100%",
        minHeight: "10vh",
        width: "7vw",
        minWidth: "5vw",
        maxWidth: "10vw",
        justifyContent: "space-evenly",
        alignItems: "center",
        textAlign: "center",
    },
    paper: {
        height: "100%",
        width: "100%"
    },
    letterInput: {
        textTransform: "uppercase",
        paddingBottom: '.5rem',
        textAlign: "center",
        fontSize: "80%",
        width: "80%",
        border: "none",
    }
}))
