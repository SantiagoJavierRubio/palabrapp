import React from 'react';
import Letter from './Letter';
import { Grid, Paper } from '@material-ui/core';
import useStyles from './styles';


const Word = (props) => {

    const { layout, position, setValue } = props;

    const classes = useStyles();

    

    switch (position) {
        case "left":
            return(
                layout.left.map(word => {
                    if(word === ""){
                        return(
                            <Grid key={word} className={classes.wordContainer} container justifyContent="flex-end" spacing={1} item>
                                    <Grid className={classes.letter} item>
                                            <p> </p>
                                    </Grid>
                            </Grid>
                        );
                    } else {
                        let i = -1;
                        return(
                            <Grid key={word} className={classes.wordContainer} container justifyContent="flex-end" spacing={1} item>
                            {word.split('').map(letter =>{
                                i++;
                                return(
                                    <Grid key={i} className={classes.letter} item>
                                        <Letter id={`l-${layout.left.indexOf(word)}-${i}`} setValue={setValue}/>
                                    </Grid>
                                )
                                
                            })}
                            </Grid>
                        );
                    }
                })
            );

        case "center":
            return(
                layout.center.map(word => {
                    let i=-1;
                    return(
                        <Grid key={word} className={classes.wordContainer} container justifyContent="center" spacing={1} item>
                        {word.split('').map(letter =>{
                            i++;
                            return(
                                <Grid key={i} className={classes.letter} item>
                                        <Letter id={`c-${layout.center.indexOf(word)}-${i}`} setValue={setValue}/>
                                </Grid>
                            )
                        })}
                        </Grid>
                    );
                })
            );

        case "right":
            return(
                layout.right.map(word => {
                    if(word === ""){
                        return(
                            <Grid key={word} className={classes.wordContainer} container justifyContent="flex-start" spacing={1} item>
                                    <Grid className={classes.letter} item>
                                        <p> </p>
                                    </Grid>
                            </Grid>
                        );
                    } else {
                        let i=-1;
                        return(
                            <Grid key={word} className={classes.wordContainer} container justifyContent="flex-start" spacing={1} item>
                            {word.split('').map(letter =>{
                                i++;
                                return(
                                    <Grid key={i} className={classes.letter} item>
                                            <Letter id={`r-${layout.right.indexOf(word)}-${i}`} setValue={setValue}/>
                                    </Grid>
                                )
                            })}
                            </Grid>
                        );
                    }
                })
            );

        default:
            return (
                <>
                </>
            )
    }
}

export default Word;