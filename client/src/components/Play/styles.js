import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    puzzleBox: {
        display: 'flex',
        marginTop: '.5rem',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginBottom: '1rem'
    },
    sideContainer: {
        flexWrap: "nowrap",
        width: 'fit-content',
        flexDirection: "column",
    },
    loadingCircle: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem',
    },
}))

