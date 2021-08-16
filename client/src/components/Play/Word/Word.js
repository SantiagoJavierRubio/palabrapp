import React from 'react';
import Letter from './Letter';
import { Grid } from '@material-ui/core';
import useStyles from './styles';


const Word = (props) => {

    const { layout, position, setValue } = props;

    const classes = useStyles();

    switch (position) {
        case "left":
            let a=-1;
            return(
                layout.left.map(word => {
                    a++;
                    if(word === ""){
                        return(
                            <Grid key={word+a} className={classes.wordContainer} container justifyContent="flex-end" spacing={1} item>
                                    <Grid className={classes.letter} item>
                                            <p> </p>
                                    </Grid>
                            </Grid>
                        );
                    } else {
                        let i = -1;
                        return(
                            <Grid key={word+a} className={classes.wordContainer} container justifyContent="flex-end" spacing={1} item>
                            {word.split('').map(letter =>{
                                i++;
                                return(
                                    <Grid key={i} className={classes.letter} item>
                                        <Letter id={`l-${layout.left.indexOf(word, a)}-${i}`} setValue={setValue} />
                                    </Grid>
                                )
                                
                            })}
                            </Grid>
                        );
                    }; 
                })
            );

        case "center":
            let b = -1;
            return(
                layout.center.map(word => {
                    b++;
                    let i = -1;
                    return(
                        <Grid key={word+b} className={classes.wordContainer} container justifyContent="center" spacing={1} item>
                        {word.split('').map(letter =>{
                            i++;
                            return(
                                <Grid key={i} className={classes.letter} item>
                                        <Letter id={`c-${layout.center.indexOf(word, b)}-${i}`} setValue={setValue} />
                                </Grid>
                            )
                        })}
                        </Grid>
                    );
                })
            );

        case "right":
            let c = -1;
            return(
                layout.right.map(word => {
                    c++;
                    if(word === ""){
                        return(
                            <Grid key={word+c} className={classes.wordContainer} container justifyContent="flex-start" spacing={1} item>
                                    <Grid className={classes.letter} item>
                                        <p> </p>
                                    </Grid>
                            </Grid>
                        );
                    } else {
                        let i=-1;
                        return(
                            <Grid key={word+c} className={classes.wordContainer} container justifyContent="flex-start" spacing={1} item>
                            {word.split('').map(letter =>{
                                i++;
                                return(
                                    <Grid key={i} className={classes.letter} item>
                                            <Letter id={`r-${layout.right.indexOf(word, c)}-${i}`} setValue={setValue} />
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