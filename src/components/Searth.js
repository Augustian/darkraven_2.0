import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pagination from '@mui/material/Pagination';
import { Button, Typography } from '@mui/material';
import Film from './Template/Film';

const Search = (props) => {
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);

    function onShowSizeChange(current, pagesize) {
        setPageSize(pagesize);
    }

    useEffect(() => {
        document.title = "Поиск по сайту: " + props.search;
    }, [props.search])

    const data = props.ContentVideo;
    if (!data) {
        return <div className="central">
            <h2 style={{ color: "white" }}>Поиск по сайту: нет результатов!</h2>
        </div>
    }
    return (
        <div className="central">
            <Typography variant='h5' color={"white"}>Поиск по сайту: {props.search}</Typography>
            {data.map((post, key) =>
                <Film key={key} data={post} props={props} />
            )}
            {data.length == 0 && <Typography color={"whitesmoke"}>Не дало результатов</Typography>}

            <Pagination
                className="pagination"
                count={Math.ceil(props.Value / 5)}
                page={page}
                siblingCount={3}
                boundaryCount={2}
                onChange={(event, page) => {
                    props.SearchFunc(page - 1, pageSize, props.search);
                    window.scrollTo(0, 0);
                    setPage(page);
                }} />

        </div>
    );
}

export default Search;