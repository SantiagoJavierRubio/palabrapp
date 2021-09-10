import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    mainContainer: {
        width: '100%',
        maxWidth: '1500px',
        overflow: 'hidden',
    },
    appBar: {
        color: 'rgb(245, 235, 250)',
        backgroundColor: '#1926ca',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2301061a' fill-opacity='0.28'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    },
    toolbar: {
        flexGrow: 1,
        margin: 0,
        overflow: 'hidden',
        [theme.breakpoints.down("sm")]: {
            padding: '0 .5rem',
        },
    },
    mainHeader: {
        fontSize: '3.5rem',
        marginLeft: '1rem',
        [theme.breakpoints.down("md")]: {
            fontSize: '3rem',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '2rem',
            marginLeft: '.5rem',
        },
        fontWeight: 900,
        flexGrow: 1
    },
    mainHeaderLink: {
        flexGrow: 1,
        textDecoration: 'none',
        color: 'inherit',
    },
    burgerMenu: {
        color: 'rgb(228, 228, 247)',
        width: 'fit-content'
    },
    userLink: {
        color: 'inherit',
        fontSize: '1.3rem',
        textDecoration: 'none',
        fontWeight: 800,
        [theme.breakpoints.down("md")]: {
            fontSize: '1.1rem',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '.8rem',
        },
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    appContainer: {
        padding: '1rem',
    },
    logoutBtn: {
        [theme.breakpoints.down("sm")]: {
            fontSize: '.6rem',
        },
        padding: '0.2rem',
        marginLeft: '0.3rem'
    },
    footerBox: {
        textAlign: 'center',
        marginTop: '50vh',
        margin: 'auto',
    },
})
)