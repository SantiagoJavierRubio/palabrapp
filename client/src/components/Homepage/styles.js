import { makeStyles } from '@material-ui/styles'

export default makeStyles(()=>({
    homeHeader: {
        fontSize: '2rem',
        textAlign: 'center'
    },
    homeExplain: {
        fontSize: '1.5rem',
        textAlign: 'center',
        marginTop: '1rem'
    },
    homeMain: {
        marginTop: '1rem',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: '.5rem',
        justifyContent: 'center',
        alignItems: 'center',
        '& h4': {
            fontSize: '1.5rem',
            fontWeight: 'bold'
        }
    },
    createCard: {
        background: 'radial-gradient(circle, rgba(255,177,79,1) 0%, rgba(255,66,0,1) 100%)'
    },
    lobbyCard: {
        background: 'radial-gradient(circle, rgba(210,79,255,1) 0%, rgba(83,21,255,1) 100%)'
    },
    puzzleCard: {
        marginTop: '1.5rem',
        '& .cardTitle': {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    },
}))