import { AppBar, Divider, Grid, IconButton, Menu, Toolbar, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Box from 'Elements/Box';
import {
  Home,
  Logout,
  MenuOpenTwoTone,
  MenuTwoTone,
  Notifications,
  Person,
  Settings
} from '@mui/icons-material';
import { useState } from 'react';
import NotificationItem from 'Elements/Item';

import UserPic from 'Assets/Images/team-4-800x800.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from 'Elements/Breadcrumbs';
import Avatar from 'Elements/Avatar';
import useWindowPosition from 'Hooks/useWindowPosition';
import {
  getLoginPattern,
  getProfilePattern,
  getProfileSetupPattern,
  getSettingPattern
} from 'Routes/routeConfig';
import CircularProgressWithLabel from 'Elements/CircularProgressWithLabel';
import { MINI_SIDENAV, LOGOUT } from 'APIs/constants';
import { navbar, navbarContainer, navbarIconButton, navbarRow } from './styles';

const DashboardNavbar = ({ user, progress, notification, isMini }) => {
  const customization = useSelector((state) => state.customization);
  const themes = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const route = pathname.split('/').slice(1);
  const position = useWindowPosition();
  const handleMiniSidenav = () =>
    dispatch({ type: MINI_SIDENAV, value: !customization.miniSidenav });

  const handleMenu = (event) => setOpenMenu(event.currentTarget);
  const handleMenuClose = () => setOpenMenu(false);
  const handleProfileMenu = (event) => setOpenProfileMenu(event.currentTarget);
  const handleProfileMenuClose = () => setOpenProfileMenu(false);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={Boolean(openMenu)}
      onClose={handleMenuClose}
      sx={({ breakpoints }) => ({
        top: 50,
        [breakpoints.down('sm')]: {
          left: 0
        },
        [breakpoints.up('md')]: {
          left: progress === 100 ? -100 : -155
        }
      })}
    >
      {notification && notification.length > 0 ? (
        notification.map((item, index) => (
          <NotificationItem
            key={index}
            image={<Person />}
            title={['New message', 'from Laur']}
            date="13 minutes ago"
            onClick={handleMenuClose}
          />
        ))
      ) : (
        <NotificationItem title={['No new Notifications']} />
      )}
    </Menu>
  );

  const renderProfileMenu = () => (
    <Menu
      anchorEl={openProfileMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={Boolean(openProfileMenu)}
      onClose={handleProfileMenuClose}
      sx={({ breakpoints }) => ({
        [breakpoints.down('sm')]: {
          top: 40,
          left: 0
        },
        [breakpoints.up('md')]: {
          top: 55,
          left: -20
        }
      })}
    >
      <NotificationItem
        color="secondary"
        title={[
          'Hello,',
          `${
            user && user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : 'Welcome'
          }`
        ]}
        disabled
        onClick={handleProfileMenuClose}
      />
      <Divider />
      {pathname !== getProfileSetupPattern() ? (
        <NotificationItem
          color="secondary"
          image={<Person />}
          title={['Manage Account']}
          onClick={handleProfileMenuClose}
          component={Link}
          to={getProfilePattern()}
        />
      ) : null}
      {pathname !== getProfileSetupPattern() ? (
        <NotificationItem
          color="secondary"
          image={<Settings />}
          title={['Settings']}
          onClick={handleProfileMenuClose}
          component={Link}
          to={getSettingPattern()}
        />
      ) : null}
      <NotificationItem
        color="secondary"
        image={<Logout />}
        title={['Logout']}
        onClick={() => {
          handleProfileMenuClose();
          navigate(getLoginPattern());
          dispatch({ type: LOGOUT });
        }}
      />
    </Menu>
  );

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar: position > 10 })}
      blur={10}
    >
      <Toolbar sx={(theme) => navbarContainer(theme, { position: 'static' })}>
        {pathname !== getProfileSetupPattern() ? (
          <>
            <Box color="white" sx={(theme) => navbarRow(theme, { isMini })}>
              {!customization.miniSidenav ? (
                <IconButton
                  size="large"
                  color={position > 10 ? 'dark' : 'white'}
                  sx={navbarIconButton}
                  variant="contained"
                  onClick={handleMiniSidenav}
                >
                  <MenuTwoTone />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  color={position > 10 ? 'dark' : 'white'}
                  sx={navbarIconButton}
                  variant="contained"
                  onClick={handleMiniSidenav}
                >
                  <MenuOpenTwoTone />
                </IconButton>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Breadcrumbs
                icon={<Home />}
                title={route[route.length - 1]}
                route={route}
                light={position > 10}
              />
            </Box>
          </>
        ) : (
          <Box />
        )}
        <Box sx={(theme) => navbarRow(theme, { isMini })}>
          <Grid container columnGap={2} alignItems="center">
            {pathname !== getProfileSetupPattern() ? (
              <>
                <Grid item>
                  <IconButton
                    size="large"
                    color={position > 10 ? 'dark' : 'white'}
                    sx={navbarIconButton}
                    variant="contained"
                    onClick={handleMenu}
                  >
                    <Notifications />
                  </IconButton>
                </Grid>
                {progress !== 100 && (
                  <Grid item component={Link} to={getProfilePattern()}>
                    <CircularProgressWithLabel value={progress || 0} />
                  </Grid>
                )}
              </>
            ) : null}
            <Grid item>
              <Avatar
                src={user && user.profilePic && user.profilePic !== '' ? user.profilePic : UserPic}
                alt={UserPic}
                size={window.innerWidth < themes.breakpoints.values.md ? 'sm' : 'md'}
                variant="circle"
                onClick={handleProfileMenu}
                sx={{
                  cursor: 'pointer',
                  img: {
                    objectFit: 'cover'
                  }
                }}
              />
            </Grid>
          </Grid>
          {renderMenu()}
          {renderProfileMenu()}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false
};

export default DashboardNavbar;
