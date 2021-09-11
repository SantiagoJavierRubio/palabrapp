import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    tiltMsg: {
        display: 'none',
        [`${theme.breakpoints.down('sm')} and (orientation: portrait) and (max-device-width: 480px)`]: {
            display: 'block',
        }
    },
    puzzleBox: {
        display: 'flex',
        marginTop: '.5rem',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginBottom: '1rem',
        [`${theme.breakpoints.down('sm')} and (orientation: portrait) and (max-device-width: 480px)`]: {
            display: 'none',
        }
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
    arrowsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    puzzleClue: {
        fontSize: '2rem',
    },
    dialogHeader: {
        textAlign: 'center',
        fontSize: '2rem',
        color: 'black',
    },
    dialogMessage: {
        textAlign: 'center',
        fontSize: '1.5rem'
    },
    dialogQuestion: {
        marginTop: '2rem'
    }
}))

