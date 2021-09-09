import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    definitionCard: {
        padding: '.5rem',
        position: 'sticky',
        bottom: '1vh',
        minHeight: '15vh',
        height: 'fit-content',
        zIndex: 2,
    },
    definitionText: {
        fontSize: '4vh',
    }
}))