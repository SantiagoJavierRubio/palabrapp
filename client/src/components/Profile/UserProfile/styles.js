import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(()=>({
    main: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    userInfo: {
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'column'
    },
    basicInfo: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'stretch'
    },
    userAvatar: {
        width: '3rem',
        height: '3rem',
    },
    userName: {
        fontSize: '3rem',
        fontWeight: 500,
        marginLeft: '.5rem',
    },
    moreInfo: {
        marginTop: '.5rem',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    about: {
        flexGrow: 1,
    },
    aboutHeader: {
        fontSize: '1.5rem',
        fontWeight: 250
    },
    aboutText: {
        paddingLeft: '1rem',
        paddingRight: '2rem'
    },
    puzzlesData: {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    dataText: {
        fontSize: '1rem',
        fontWeight: 400
    },
    userPuzzles: {
        marginTop: '2rem',
    },
    puzzlesHeader: {
        fontSize: '2.5rem',
        fontWeight: 600
    },
    puzzleContainer: {
        alignItems: 'stretch',
        padding: '1rem'
    }
})
)