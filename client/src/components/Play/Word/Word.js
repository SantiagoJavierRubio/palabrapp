import React, { useState, useEffect } from 'react';
import Letter from './Letter';
import CompletedLetter from './CompletedLetter';
import { Grid } from '@material-ui/core';
import useStyles from './styles';


const Word = (props) => {

    const { layout, position, setValue, gameState } = props;
    const [cssClass, setClass] = useState();

    const classes = useStyles();

    useEffect(()=>{
        switch(position){
            case "left":
                return setClass(classes.wordContainerLeft);
            case "center":
                return setClass(classes.wordContainerCenter);
            case "right":
                return setClass(classes.wordContainerRight);
        }
    }, [])

    return(
        layout[`${position}`].map((word, wordIndex) => {
            if(word === ""){
                return(
                    <Grid key={word+wordIndex} className={cssClass} container spacing={1} item>
                            <Grid className={classes.letter} item>
                                    <p> </p>
                            </Grid>
                    </Grid>
                );
            } else {
                return(
                    <Grid key={word+wordIndex} className={cssClass} container spacing={1} item>
                    {word.split('').map((letter, letterIndex) =>{
                        if(gameState.correct.includes(wordIndex)){
                            return(
                                <Grid key={letterIndex} className={classes.letter} item>
                                    <CompletedLetter id={`${position[0]}-${layout[`${position}`].indexOf(word, wordIndex)}-${letterIndex}`} setValue={setValue} correctLetter={letter} position={position} />
                                </Grid>
                            )
                        } else if(gameState.vertical && position==='center'){
                            return(
                                <Grid key={letterIndex} className={classes.letter} item>
                                    <CompletedLetter id={`${position[0]}-${layout[`${position}`].indexOf(word, wordIndex)}-${letterIndex}`} setValue={setValue} correctLetter={letter} position={position} />
                                </Grid>
                            )
                        } else if (gameState.wrong.includes(wordIndex)){
                            return(
                                <Grid key={letterIndex} className={classes.letter} item>
                                    <Letter id={`${position[0]}-${layout[`${position}`].indexOf(word, wordIndex)}-${letterIndex}`} setValue={setValue} position={position} color={'red'}/>
                                </Grid>
                            )
                        } else {
                            return(
                                <Grid key={letterIndex} className={classes.letter} item>
                                    <Letter id={`${position[0]}-${layout[`${position}`].indexOf(word, wordIndex)}-${letterIndex}`} setValue={setValue} position={position} color={'black'}/>
                                </Grid>
                            )
                        }
                    })}
                    </Grid>
                );
            }; 
        })
    );
}

export default Word;