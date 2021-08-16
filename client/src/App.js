import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Material-UI imports
import { 
    Container, AppBar, Typography, Grow, Toolbar, IconButton, Drawer,
    List, ListItem, ListItemText, ListItemIcon, Button, Box
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PersonIcon from '@material-ui/icons/Person';

// Components
import Form from './components/Form/Form';
import Lobby from './components/Lobby/Lobby';
import Play from './components/Play/Play';
import UserManagement from './components/User/UserManagement';

// Styles import
import useStyles from './styles';

const App = () => {
    
    const [displayDrawer, setDrawerDisplay] = useState(false);
    const [user, setUser] = useState(null);

    const toggleDrawer = () => {
        setDrawerDisplay(!displayDrawer);
    }

    const ListItemLink = (props) => {
        return <ListItem button component="a" {...props} />;
    }

    useEffect(()=> {
        const loggedUser = localStorage.getItem('user');
        if (loggedUser && loggedUser !== undefined) {
            setUser(loggedUser)
        }
    }, []);

    const logUser = (user_data) => {
        setUser(user_data);
    }

    const handleLogOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const classes = useStyles();
    
    return(
        <Container maxWidth="lg">
            <AppBar position="static" color="inherit" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="top" open={displayDrawer} onClose={toggleDrawer}>
                        <List>
                            <ListItemLink href="/lobby">
                                <ListItemIcon>
                                    <SportsEsportsIcon />
                                    <ListItemText primary="Lobby" />
                                </ListItemIcon>
                            </ListItemLink>
                            <ListItemLink href="/profile">
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                    <ListItemText primary="Profile" />
                                </ListItemIcon>
                            </ListItemLink>
                            <ListItemLink href="/create">
                                <ListItemIcon>
                                    <AddCircleIcon />
                                    <ListItemText primary="Create puzzle" />
                                </ListItemIcon>
                            </ListItemLink>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <ArrowBackIosIcon />
                                </ListItemIcon>
                                <ListItemText primary="Back" />
                            </ListItem>
                        </List>
                    </Drawer>
                    <Typography variant="h1" align="center" className={classes.mainHeader} href="/">PalabrApp</Typography>
                    {user ? 
                        <>
                            <PersonIcon /><p>{user}</p><Button onClick={handleLogOut} >(Sign out)</Button>
                        </> 
                        :
                        <UserManagement logUser={logUser} />
                    }
                    
                </Toolbar>
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