import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Card, CardActions, CardContent } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ShareIcon from '@material-ui/icons/Share';
import moment from 'moment'
import useStyles from './styles';
    

const Puzzle = (props) => {
    const classes = useStyles();
    const { puzzle_data } = props
    const { _id, rating, createdAt, secret, words, creator } = puzzle_data;

    return(
        <Card className={classes.puzzleCard}>
            <div className={classes.cardTop}>
                <Typography variant="h4" className={classes.creatorText}>
                    <Link className={classes.linkContainer2} to={`/profile/${creator.userID}`}>{creator.username}</Link>'s Puzzle
                </Typography>
                <Typography variant="body2" className={classes.dateText}>
                    {moment(createdAt).fromNow()}
                </Typography>
            </div>
            <CardContent className={classes.cardContent}>
                <div className={classes.mainContent}>
                    <Link to={`/play/${_id}`} className={classes.linkContainer}>
                        <Button startIcon={<PlayCircleFilledIcon />} color="primary" variant="contained" className={classes.playBtn}>
                            Solve
                        </Button>
                    </Link>
                    <Typography variant="body2" className={classes.lengthText}>
                        ({secret.length} characters long)
                    </Typography>
                </div>
                <div className={classes.ratingContent}>
                    {rating===0 ? (
                        <Typography variant="body2" className={classes.ratingText}>
                            Rating: No ratings yet
                        </Typography>
                    ):(
                        <Typography variant="body2" className={classes.ratingText}>
                            Rating: {rating}/10
                        </Typography>
                    )}
                </div>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button variant="outlined" color="secondary" className={classes.shareBtn}>
                    <ShareIcon />
                </Button>
            </CardActions>
        </Card>
    );
}

export default Puzzle;