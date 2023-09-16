import React, { useEffect, useState } from 'react';
import { VisibilityOff } from '@mui/icons-material';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import { Button, CircularProgress } from '@mui/material';
import { getCookie } from '..';
import Film from './Template/Film';

const Favorites = (props) => {
    const [data, setData] = useState(null);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);

    function RenderDB(page, pageSize) {
        fetch("http://site.alwaysdata.net/api/get_favorites.php", {
            method: 'POST',
            body: JSON.stringify({
                "jwt": getCookie("jwt"),
                "page": page,
                "pageSize": pageSize
            }),
        }).then(response => response.json())
            .then(respons => {
                if (respons.status == 200)
                    setData(respons)
            })
    }

    useEffect(() => {
        RenderDB(0, pageSize);
        window.scrollTo(0, 0);
    }, [])

    if (!data) { return <CircularProgress /> }

    return (
        <div className="central">
            {data.posts.map((post, key) =>
                <Film key={key} data={post} {...props} isWatched />
            )}

            <Pagination
                className="pagination"
                count={Math.ceil(data.count / pageSize)}
                page={page}
                siblingCount={3}
                boundaryCount={2}
                onChange={(event, page) => {
                    RenderDB(page - 1, pageSize);
                    window.scrollTo(0, 0);
                    setPage(page);
                }} />
        </div>
    );
}

export default Favorites;