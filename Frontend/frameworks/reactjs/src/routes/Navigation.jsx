import {NavLink} from "react-router-dom";
import {Collapse, ListItemIcon, ListItemText, MenuItem, MenuList} from "@material-ui/core";
import React, {useState} from "react";
import {RoutesForDrawer} from "./Routes";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const MenuItemCollapse = (prop) => {
    const checkRouteActive = () => {
        const isActive = prop.children.find(child => prop.activeRoute(child.route));
        return !!isActive;
    }
    const [open, setIsOpen] = useState(checkRouteActive);
    const classes = useStyles();

    return (
        <>
            <MenuItem onClick={() => setIsOpen(!open)}>
                <ListItemIcon>{prop.icon}</ListItemIcon>
                <ListItemText primary={prop.sidebarName} />
                <ListItemIcon>{open ? <ExpandLessIcon/> : <ExpandMoreIcon/> }</ListItemIcon>
            </MenuItem>
            <Collapse in={open}>
                <MenuList disablePadding>
                    { prop.children.map((child, key) =>
                        <MenuItemLink key={key} {...child} className={classes.nested}
                                      selected={prop.activeRoute(child.route)}
                                      closeDrawer={prop.closeDrawer}/>
                    )}
                </MenuList>
            </Collapse>
        </>
    )
}

const MenuItemLink = (prop) => {
    return (
        <NavLink to={prop.route} onClick={prop.closeDrawer}
                 style={{ textDecoration: 'none', color: 'black' }}>
            <MenuItem selected={prop.selected} className={prop.className}>
                <ListItemIcon>{prop.icon}</ListItemIcon>
                <ListItemText primary={prop.sidebarName} />
            </MenuItem>
        </NavLink>
    )
}

export const NavigationList = (props) => {
    const activeRoute = (routeName) => {
        return props.location.pathname === routeName;
    }

    const closeDrawer = () => {
        props.toggleDrawer(false);
    }

    return (
        <MenuList>
            {
                RoutesForDrawer.map((prop, key) => {
                    return (prop.children.length > 0 ?
                            <MenuItemCollapse key={key}
                                              {...prop}
                                              activeRoute={activeRoute}
                                              closeDrawer={closeDrawer}/> :
                            <MenuItemLink key={key}
                                          {...prop}
                                          selected={activeRoute(prop.route)}
                                          closeDrawer={closeDrawer}/>
                    )
                })
            }
        </MenuList>
    )
}

export default NavigationList;
