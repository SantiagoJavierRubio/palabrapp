import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    definitionCard: {
        padding: '.5rem',
        position: 'sticky',
        bottom: '1rem',
        minHeight: '15vh',
        height: 'fit-content',
        zIndex: 4,
        [`${theme.breakpoints.down('sm')} and (orientation: portrait) and (max-device-width: 480px)`]: {
            display: 'none',
        }
    },
    definitionText: {
        fontSize: '2.5rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem'
        }
    }
}))