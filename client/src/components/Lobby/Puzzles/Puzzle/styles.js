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
        backgroundColor: 'rgb(50,0,200)',
        color: 'rgb(250,250,250)'
    },
    creatorText: {
        textDecoration: 'none',
        fontSize: '1.8rem'
    },
    dateText: {
        marginLeft: '1rem',
        fontSize: '1rem'
    },
    cardContent: {
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