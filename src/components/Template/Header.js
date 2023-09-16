import styled from '@emotion/styled';
import { Adb } from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, Container, Fade, IconButton, InputBase, Menu, MenuItem, Slide, TextField, Toolbar, Tooltip, Typography, alpha } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from "react-router-dom";
import Profile from '../Profile';
import { getCookie } from '../..';

const Header = (props) => {
    const searchInput = useRef();

    const serath = () => {
        props.searth(0, props.pageSize, searchInput.current.value);
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '40px',
        width: '40px',
        // position: 'absolute',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(0)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    const pages = [{
        href: "/",
        title: 'Главная'
    }, {
        href: "/top",
        title: 'Топ'
    }, {
        href: "/films",
        title: "Фильмы"
    }, {
        href: "/serials",
        title: "Сериалы"
    },{
        href: "/doramy",
        title: "Дорамы"
    }, {
        href: "/anime",
        title: "Аниме"
    }];

    const history = useHistory();
    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, key) => (
                            <div key={key}>
                                <Button
                                    onClick={page?.click == null ? () => history.push(page.href) : page.click}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.title}
                                </Button>
                                {page.menu}
                            </div>
                        ))}
                    </Box>
                    <div style={{ display: "flex" }}>
                        <Search>
                            <StyledInputBase
                                inputRef={searchInput}
                                placeholder="Поиск..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <SearchIconWrapper onClick={serath}>
                            <SearchIcon />
                        </SearchIconWrapper>
                    </div>

                    {getCookie('jwt') != "" &&
                        <Profile />
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;