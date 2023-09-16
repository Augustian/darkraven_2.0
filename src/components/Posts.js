import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Post from './Template/Post';

const Posts = (props) => {

    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState(null);

    const GetData = (page) => {
        var form = new FormData();
        form.append('page', page);
        form.append('pageSize', 10);
        form.append('type', 3);
        fetch('http://site.alwaysdata.net/api/get_content.php', {
            method: 'POST',
            body: form,
        }).then(res => res.json())
            .then(respons => {
                console.log(respons);
                setPosts(respons);
            })
    }

    useEffect(() => {
        GetData(0);
    }, [])

    const data = posts;
    if (!data) { return <div>Загрузка данных....</div> }

    return (
        <div className="central">
            {data.posts.map((post, key) =>
                <Post key={key} data={post} />
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

export default Posts;