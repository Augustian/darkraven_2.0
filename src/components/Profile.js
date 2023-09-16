import { AutoAwesomeMotion, Favorite, Logout, Settings, Storage } from '@mui/icons-material';
import { Avatar, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { getCookie, logout, setCookie } from '..';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();
  let name = localStorage.getItem("name");
  return (
    <Tooltip title="Профиль">
      <>
        <div className="profile">
          <Avatar src={localStorage.getItem("icon")}
            width={"25px"}
            height={"25px"}
            alt={name}
            style={{ marginRight: 5 }}
          />
          <Typography onClick={handleClick} color="white">{name}</Typography>
        </div>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {localStorage.getItem("admin") == 1 &&
            <MenuItem onClick={() => history.push('/edit-database')}>
              <ListItemIcon>
                <Storage fontSize="small" />
              </ListItemIcon>
              Управление базой
            </MenuItem>
          }
          {localStorage.getItem("admin") == 1 &&
            <MenuItem onClick={() => history.push('/edit-actors')}>
              <ListItemIcon>
                <Storage fontSize="small" />
              </ListItemIcon>
              Управление актерами
            </MenuItem>
          }
          <MenuItem onClick={() => history.push('')}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Управление аккаунтом
          </MenuItem>
          <MenuItem onClick={() => history.push('/favorites')}>
            <ListItemIcon>
              <Favorite fontSize="small" />
            </ListItemIcon>
            Избранные
          </MenuItem>
          <MenuItem onClick={() => history.push("/watched")}>
            <ListItemIcon>
              <AutoAwesomeMotion fontSize="small" />
            </ListItemIcon>
            Просмотренные
          </MenuItem>
          <MenuItem onClick={() => logout()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Выход
          </MenuItem>
        </Menu>
      </>
    </Tooltip>
  );
}
export default Profile;
