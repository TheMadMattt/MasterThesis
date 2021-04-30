import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
    Toolbar,
    Typography,
    IconButton,
    Drawer, AppBar, MenuList, MenuItem, ListItemText, ListItemIcon
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Routes from "../routes/Routes";
import { NavLink, withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            textAlign: "left",
            flexGrow: 1,
        },
        homeLink: {
            textDecoration: "none",
            color: "white",
        },
        drawer: {
            width: 300,
        },
        fullList: {
            width: 'auto',
        },
    }),
);

const NavigationBar = (props) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (drawerState) => setIsOpen(drawerState);

    const activeRoute = (routeName) => {
        return props.location.pathname === routeName ? true : false;
    }

    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    onClick={() => toggleDrawer(!isOpen)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            <a href="/" className={classes.homeLink}>React</a>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <Drawer classes={{ paper: classes.drawer }}
                    open={isOpen}
                    onClose={() => toggleDrawer(false)}>
                <div className={classes.fullList}
                     role="presentation"
                     onClick={() => toggleDrawer(false)}>
                    <MenuList>
                        {Routes.map((prop, key) => {
                            return (
                                <NavLink to={prop.path}
                                         style={{ textDecoration: 'none', color: 'black' }}
                                         key={key}>
                                    <MenuItem selected={activeRoute(prop.path)}>
                                        <ListItemIcon>{prop.icon}</ListItemIcon>
                                        <ListItemText primary={prop.sidebarName} />
                                    </MenuItem>
                                </NavLink>
                            );
                        })}
                    </MenuList>
                </div>
            </Drawer>
        </div>
    );
};

export default withRouter(NavigationBar);
