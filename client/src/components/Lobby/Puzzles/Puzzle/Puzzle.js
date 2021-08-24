import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Typography, Card, CardActions, CardContent, Fab, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import moment from 'moment'
import useStyles from './styles';
    

const Puzzle = (props) => {
    const classes = useStyles();
    const { puzzle_data, ownProfileDisplay } = props
    const { _id, stats, createdAt, secret, words, creator, clue } = puzzle_data;
    const [deleteDialogOpen, setDeleteDialog] = useState(false);

    const handleDelete = () => {
        axios.post('http://localhost:5000/posts/delete', {
            puzzleID: _id
        });
        handleClose();
        window.location.reload();
    }

    const handleClose = () => {
        setDeleteDialog(false);
    }

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
                    <div>
                        <Typography className={classes.clueText}>{clue}</Typography>
                        <Link to={`/play/${_id}`} className={classes.linkContainer}>
                            <Button startIcon={<PlayCircleFilledIcon />} color="primary" variant="contained" className={classes.playBtn}>
                                Solve
                            </Button>
                        </Link>
                    </div> 
                    <Typography variant="body2" className={classes.lengthText}>
                        ({secret.length} characters long)
                    </Typography>
                </div>
                <div className={classes.ratingContent}>
                    {stats.rating===0 ? (
                        <Typography variant="body2" className={classes.ratingText}>
                            Rating: No ratings yet
                        </Typography>
                    ):(
                        <Typography variant="body2" className={classes.ratingText}>
                            Rating: {stats.rating.toFixed(1)}/5
                        </Typography>
                    )}
                </div>
            </CardContent>
            <CardActions className={classes.cardActions}>
                {ownProfileDisplay ? (
                    <>
                        <Fab onClick={()=>setDeleteDialog(true)} size="small" color="secondary">
                            <DeleteIcon />
                        </Fab>
                        <Dialog open={deleteDialogOpen} onClose={handleClose}>
                            <DialogContent>
                                <DialogContentText className={classes.dialogText}>
                                    Are you sure you want to delete this puzzle?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary" variant="contained" autoFocus>
                                    No
                                </Button>
                                <Button onClick={handleDelete} color="secondary" variant="contained">
                                    Yes, delete it.
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                ):(
                    <Typography />
                )}
                <Button variant="contained" color="secondary" className={classes.shareBtn}>
                    <ShareIcon />
                </Button>
            </CardActions>
        </Card>
    );
}

export default Puzzle;