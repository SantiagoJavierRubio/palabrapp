import React from 'react';
import useStyles from './styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const Definition = (props) => {

    const { definition } = props;

    const classes = useStyles();

    return(
        <>
            <Card variant="outlined" className={classes.definitionCard}>
                <CardContent>
                    <Typography variant="h5">
                        {definition}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default Definition;