import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    mainLobby: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    sortingBox: {
        alignSelf: 'flex-end',
        display: 'flex',
        alignItems: 'center',
    },
    moreBtn: {
        marginTop: '1rem',
        alignSelf: 'center'
    }
}));