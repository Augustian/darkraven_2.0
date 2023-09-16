import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { useEffect } from 'react';
import Film from './Template/Film';

const Films = (props) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    const onShowSizeChange = (current, size) => {
        setPageSize(size);
    }

    useEffect(() => {
        props.RenP(props.type, 0, props.pageSize)
    }, [props.type])

    useEffect(() => {
        setPageSize(props.pageSize);
    }, [pageSize])

    const data = props.ContentVideo;
    if (!data) { return <div>Загрузка данных....</div> }

    return (
        <div className="central">
            {data.posts.map((post, key) =>
                <Film key={key} data={post} {...props}/>
            )}

            <Pagination
                className="pagination"
                count={Math.ceil(data.count / pageSize)}
                page={page}
                siblingCount={3}
                boundaryCount={2}
                onChange={(event, page) => {
                    props.Func(props.type, page - 1, pageSize);
                    window.scrollTo(0, 0);
                    setPage(page);
                }} />
        </div>
    );
}

export default Films;