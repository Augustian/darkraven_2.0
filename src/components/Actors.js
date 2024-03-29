import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';
import { getCookie } from '..';
import { useHistory } from 'react-router-dom';
import ActorSlot from './Template/ActorSlot';

const Actors = (props) => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);

    function RenderDB(page, pageSize) {
        fetch("http://site.alwaysdata.net/api/get_actors.php", {
            method: 'POST',
            body: JSON.stringify({
                "jwt": getCookie("jwt"),
                "page": page,
                "pageSize": pageSize
            }),
        }).then(res => res.json())
            .then(respons => {
                setData(respons.actors);
                setCount(respons.count);
                //console.log(respons);
            })
    }

    useEffect(() => {
        RenderDB(0, pageSize);
        window.scrollTo(0, 0);
    }, [])

    const history = useHistory();

    if (!data) { return <div>Загрузка данных....</div> }
    return (
        <div className="central">
            <Button style={{ width: "100%", margin: "5px 0" }} onClick={() => history.push("/edaactor/new")}>Добавить</Button>
            {data.map((post, key) =>
                <ActorSlot key={key} data={post} />
            )}

            <Pagination
                className="pagination"
                count={Math.ceil(count / 5)}
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

export default Actors;