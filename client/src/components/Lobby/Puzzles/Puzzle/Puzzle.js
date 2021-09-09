import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Typography, Card, CardActions, CardContent, Fab, Dialog, DialogActions, DialogContent, DialogContentText, Tooltip, Box, IconButton, FormLabel } from '@material-ui/core';
import { EmailShareButton, WhatsappShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';
import { EmailIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from "react-share";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import moment from 'moment'
import useStyles from './styles';
    

const Puzzle = (props) => {
    const classes = useStyles();
    const { puzzle_data, ownProfileDisplay } = props
    const { _id, stats, createdAt, secret, creator, clue } = puzzle_data;
    const [deleteDialogOpen, setDeleteDialog] = useState(false);
    const [shareDialogOpen, setShareDialog] = useState(false);
    const [puzzleLink, setPuzzleLink] = useState('');
    const [copyText, setCopied] = useState('Copy link')

    useEffect(()=> {
        setPuzzleLink(`${window.location.origin}/play/${_id}`)
    })

    const handleDelete = () => {
        axios.post(process.env.REACT_APP_API_URI + '/posts/delete', {
            puzzleID: _id
        });
        handleClose();
        window.location.reload();
    }

    const handleClose = () => {
        setDeleteDialog(false);
        setShareDialog(false);
    }

    const handleCopyLink = (e) => {
        navigator.clipboard.writeText(puzzleLink);
        setCopied('Copied');
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
                        <Fab onClick={()=>setDeleteDialog(true)} size="small" color="primary">
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
                                <Button onClick={handleDelete} color="primary" variant="contained">
                                    Yes, delete it.
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                ):(
                    <Typography />
                )}
                <Button onClick={()=>setShareDialog(true)} variant="contained" color="primary" className={classes.shareBtn}>
                    <ShareIcon />
                </Button>
                <Dialog open={shareDialogOpen} onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText className={classes.dialogText}>
                            Share this puzzle
                        </DialogContentText>
                        <Typography className={classes.shareLink}>
                            {puzzleLink}
                        </Typography>
                        <Box className={classes.sharingOptions}>
                            <Tooltip arrow title="Mail">
                                <Fab className={classes.shareFab}>
                                    <EmailShareButton url={puzzleLink}>
                                        <EmailIcon round={true} size={50} />
                                    </EmailShareButton>
                                </Fab>
                            </Tooltip>
                            <Tooltip arrow title="Whatsapp">
                                <Fab className={classes.shareFab}>
                                    <WhatsappShareButton url={puzzleLink}>
                                        <WhatsappIcon round={true} size={50}/>
                                    </WhatsappShareButton>
                                </Fab>
                            </Tooltip>
                            <Tooltip arrow title="Telegram">
                                <Fab className={classes.shareFab}>
                                    <TelegramShareButton url={puzzleLink}>
                                        <TelegramIcon round={true} size={50}/>
                                    </TelegramShareButton> 
                                </Fab>
                            </Tooltip>
                            <Tooltip arrow title="Tweet">
                                <Fab className={classes.shareFab}>
                                    <TwitterShareButton url={puzzleLink}>
                                        <TwitterIcon round={true} size={50}/>
                                    </TwitterShareButton>
                                </Fab>
                            </Tooltip>
                            <Tooltip arrow title={copyText}>
                                <Fab className={classes.copyFab} onClick={handleCopyLink} >
                                   <FileCopyIcon /> 
                                </Fab>
                            </Tooltip>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
        </Card>
    );
}

export default Puzzle;