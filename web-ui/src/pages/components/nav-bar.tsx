import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AccountCircle, Menu as MenuIcon} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import {signOut} from "@aws-amplify/auth";
import {userSlice} from "../../reducers/user-slice";
import {
    ALL_MY_TICKETS_ROUTE,
    ALL_SERVICES_ROUTE,
    AUTH_PAGE_ROUTE,
    MY_SHOP_ROUTE,
    OPEN_TICKETS_ROUTE
} from "../../utils/consts";
import {UserTypeEnum} from "../../core/types";
import {AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../core/redux";




const NavBar = () => {const {t} = useTranslation();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const {user, userIsLoading, userError, isAuth} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery('(max-width:768px)');console.log('userType: ' + user.type + ' isAuth: ' + isAuth);




    const handleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };


    const handleLogout = async () => {
        try {
            await signOut();
            dispatch(userSlice.actions.signOut());
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };


    return (
        <AppBar position="static">
            <Toolbar>
                {isMobile ? (
                    <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenu}
                            sx={{marginRight: 'auto'}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: 'center'}}>
                            {t('navbar.logo')}
                        </Typography>
                        <Menu
                            open={isMenuOpen}
                            onClose={handleMenu}
                            onClick={handleMenu}
                        >
                            {user.type === UserTypeEnum.TASKER && isAuth && (
                                <MenuItem>
                                    My Responses
                                </MenuItem>
                            )}
                            {user.type !== UserTypeEnum.TASKER && (
                                <MenuItem component={Link} to={ALL_SERVICES_ROUTE}>
                                    Services
                                </MenuItem>
                            )}
                            {user.type === UserTypeEnum.SIMPLE && !isAuth && (
                                <>
                                    <MenuItem>
                                        Log in
                                    </MenuItem>
                                    <MenuItem>
                                        {t('navbar.become_a_tasker')}
                                    </MenuItem>
                                </>
                            )}
                            {(user.type === UserTypeEnum.SIMPLE) && (
                                <MenuItem component={Link} to={OPEN_TICKETS_ROUTE}>
                                    Tickets
                                </MenuItem>
                            )}
                            {(user.type === UserTypeEnum.CUSTOMER || user.type === UserTypeEnum.TASKER) && isAuth && (
                                <MenuItem>
                                    My Tickets
                                </MenuItem>
                            )}
                            {(user.type === UserTypeEnum.CUSTOMER || user.type === UserTypeEnum.TASKER) && isAuth && (
                                <MenuItem>
                                    Chat
                                </MenuItem>
                            )}
                            {(user.type === UserTypeEnum.CUSTOMER || user.type === UserTypeEnum.TASKER) && isAuth && (
                                <MenuItem>
                                    Account
                                </MenuItem>
                            )}
                            {(user.type === UserTypeEnum.CUSTOMER || user.type === UserTypeEnum.TASKER) && isAuth && (
                                <MenuItem component={Link} to={MY_SHOP_ROUTE}>
                                    Shop
                                </MenuItem>
                            )}
                            {(user.type === UserTypeEnum.CUSTOMER || user.type === UserTypeEnum.TASKER) && isAuth && (
                                <MenuItem>
                                    <Typography>Balance: {}</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                ) : (
                    <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {t('navbar.logo')}
                        </Typography>
                        {(user.type === UserTypeEnum.CUSTOMER || user.type === UserTypeEnum.TASKER) && isAuth && (
                            <MenuItem component={Link} to={MY_SHOP_ROUTE}>
                                Shop
                            </MenuItem>
                        )}
                        {user.type === UserTypeEnum.TASKER && isAuth && (
                            <Typography variant="h6" component="div" sx={{paddingRight: 2}}>
                                My Responses
                            </Typography>
                        )}
                        {user.type !== UserTypeEnum.TASKER && (
                            <MenuItem component={Link} to={ALL_SERVICES_ROUTE}>
                                <Typography variant="h6"
                                            sx={{paddingRight: 2}}>
                                    Services
                                </Typography>
                            </MenuItem>
                            )}
                        {(user.type === UserTypeEnum.SIMPLE) && (
                            <MenuItem component={Link} to={OPEN_TICKETS_ROUTE}>
                                Tickets
                            </MenuItem>
                        )}
                        {user.type === UserTypeEnum.SIMPLE && !isAuth && (
                            <MenuItem component={Link} to={AUTH_PAGE_ROUTE}>
                                <Typography variant="h6" component="div" sx={{ paddingRight: 2 }}>
                                    Log in
                                </Typography>
                            </MenuItem>
                            )}
                        {user.type === UserTypeEnum.TASKER && isAuth && (
                            <MenuItem onClick={handleLogout}>
                                <Typography variant="h6" component="div" sx={{ paddingRight: 2 }}>
                                    Log out
                                </Typography>
                            </MenuItem>
                        //<Typography variant="h6" component="div" sx={{ paddingRight: 2 }}>
                            //{t('navbar.become_a_tasker')}
                        //</Typography>
                            )}
                        {(user.type === UserTypeEnum.CUSTOMER || user.type === UserTypeEnum.TASKER) && isAuth && (
                            <MenuItem component={Link} to={ALL_MY_TICKETS_ROUTE}>
                                <Typography variant="h6" component="div" sx={{paddingRight: 2}}>
                                    My Tickets
                                </Typography>
                            </MenuItem>
                        )}
                        {(user.type === UserTypeEnum.CUSTOMER || user.type === UserTypeEnum.TASKER) && isAuth && (
                            <Typography variant="h6" component="div" sx={{paddingRight: 2}}>
                                Chat
                            </Typography>
                        )}
                        {(user.type === UserTypeEnum.CUSTOMER || user.type === UserTypeEnum.TASKER) && isAuth && (
                            <Typography variant="h6" component="div" sx={{paddingRight: 2}}>
                                Account
                            </Typography>
                        )}
                        {isAuth && (
                            <IconButton size="large" edge="end" color="inherit">
                                <AccountCircle/>
                            </IconButton>
                        )}
                        {(user.type === UserTypeEnum.CUSTOMER || user.type === UserTypeEnum.TASKER) && isAuth && (
                            <MenuItem>
                                <Typography>Balance: {user.balance}</Typography>
                            </MenuItem>
                        )}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;