import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    winnerMain: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    puzzleData: {
        textAlign: 'center'
    },
    congratsText: {
        fontSize: '3rem'
    },
    puzzleInfo: {
        fontSize: '3rem'
    },
    puzzleSecret: {
        fontSize: '2rem',
        color: 'red',
        marginTop: '.5rem',
        border: '.2rem solid red'
    },
    optionsMenu: {
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '60%'
    },
    optionLink: {
        textDecoration: 'none',
    },
    orTypo: {
        alignSelf: 'center',
        marginLeft: '.5rem',
        marginRight: '.5rem'
    },
}))