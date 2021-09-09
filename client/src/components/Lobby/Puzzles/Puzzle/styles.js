import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    puzzleCard: {
        display: 'flex',
        height: "100%",
        flexDirection: 'column',
        alignContent: 'stretch',
        alignItems: 'stretch',
    },
    cardTop: {
        padding: '.5rem',
        paddingBottom: '1rem',
        backgroundColor: '#2f3289',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c4b9d4' fill-opacity='0.29'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    },
    creatorText: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.8rem'
    },
    dateText: {
        color: 'white',
        marginLeft: '1rem',
        fontSize: '1rem'
    },
    cardContent: {
        backgroundColor: 'rgb(213, 223, 232)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    mainContent: {
        width: '100%',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between'

    },
    clueText: {
        fontStyle: 'italic',
        fontSize: '1.3rem',
    },
    linkContainer: {
        textDecoration: 'none',
    },
    linkContainer2: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover':{
            textDecoration: 'underline',
        }
    },
    lengthText: {
        fontStyle: 'italic',
        fontSize: '1rem'
    },
    ratingContent: {
        alignSelf: 'flex-end'
    },
    ratingText: {
        fontSize: '.9rem'
    },
    cardActions: {
        backgroundColor: 'rgb(213, 223, 232)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    shareBtn: {
    },
    dialogText: {
        color: 'black',
        fontSize: '1.3rem'
    },
    sharingOptions: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '1rem',
        marginBottom: '1rem'
    },
    shareFab: {
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        height: '50px',
        width: '50px'
    },
    copyFab: {
        height: '50px',
        width: '50px'
    },
    shareLink: {
        padding: '1rem',
        border: '2px solid gray',
        fontSize: '1rem',
        color: 'rgb(246, 246, 243)',
        backgroundColor: 'rgb(84, 95, 111)',
        overflow: 'auto'
    }
});