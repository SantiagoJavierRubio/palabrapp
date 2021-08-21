import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    ratingMain: {
        marginTop: '1rem',
        textAlign: 'center',
        width: '100%',
        height: '100%'
    },
    rateStar: {
        color: 'gold',
    },
    star:{
        fontSize: '6vh',
    },
    avgRating: {
        fontSize: '2rem'
    }
}))