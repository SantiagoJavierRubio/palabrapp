import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(()=>({
    mainHeader: {
        fontSize: '3rem',
        marginLeft: '1rem',
        fontWeight: 900,
        flexGrow: 1
    },
    mainHeaderLink: {
        fontSize: '3rem',
        marginLeft: '1rem',
        fontWeight: 900,
        flexGrow: 1,
        textDecoration: 'none',
        color: 'inherit' 
    },
    appContainer: {
        padding: '1rem',
    },
    logoutBtn: {
        padding: '0.2rem',
        marginLeft: '0.3rem'
    }
})
)