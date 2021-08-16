import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    puzzleContainer: {
        padding: "none",
        paddingTop: "5vh",
        fontSize: "5vh",
    },
    sideContainer: {
        flexWrap: "nowrap",
    },
    loadingCircle: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem',
    },
}))

