import React from 'react';
import { Container, AppBar, Typography, Grow } from '@material-ui/core';
import Form from './components/Form/Form';
import Lobby from './components/Lobby/Lobby';
import Play from './components/Play/Play';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    
    return(
        <Container maxWidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">Palabrapp</Typography>
            </AppBar>
            <Grow in>
                <Container>
                   <Router>
                       <Switch>
                        <Route path="/lobby" component={Lobby} />
                        <Route path="/create" component={Form} />
                        <Route path="/play/:id" component={Play} />
                       </Switch>
                   </Router>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;