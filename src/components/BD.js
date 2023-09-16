import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';

class BD extends React.Component {

    constructor() {
        super();
        this.state = {
            referrer: null,
            Content: [],
            ValuePage: null,
            pageSize: 5,
            page: 1,
            type: 0,
        };
    }

    componentDidMount() {
        this.RenderDB(0, 0, this.state.pageSize);
    }

    DeleteFilm(name, id) {
        if (window.confirm("Вы действительно желаете удалить видеозапись, " + name + "?")) {
            var form = new FormData();
            form.append('id', id);
            form.append('token', localStorage.getItem("token"));
            fetch("http://site.alwaysdata.net/deleteeditor.php", {
                method: 'POST',
                body: form,
            });
            this.props.message("Успешное удаление: '" + name + "'");
            this.RenderDB(this.state.type, this.state.page, this.state.pageSize);
        }
    }

    RenderDB(type, Page, pageSize) {
        var form = new FormData();
        form.append('type', type);
        form.append('page', Page);
        form.append('pagesize', pageSize);

        fetch("http://site.alwaysdata.net/dbdatavideo.php", {
            method: 'POST',
            body: form,
        }).then(res => res.json())
            .then(respons => {
                this.setState({ Content: respons.video, ValuePage: respons.length, pageSize: pageSize });
                //console.log(respons);
            })
    }

    render() {
        const data = this.state.Content;
        if (!data) { return <div>Загрузка данных....</div> }

        const { referrer } = this.state;
        if (referrer) return <Redirect to={referrer} />;
        return (
            <Router>
                <div className="central">
                    {this.state.Content.map((post, key) => {
                        if (post.title != null) {
                            return (
                                <div key={key} className="post-slot">
                                    <Button className="ForeverVideo" onClick={() => { this.setState({ referrer: "/edaeditor/" + post.id_video }) }}>
                                        <Link to={"/edaeditor/" + post.id_video}>
                                            <EditIcon style={{ color: "white" }} />
                                        </Link>
                                    </Button>
                                    <Button variant="danger" className="ForeverVideo" style={{ marginRight: "60px" }} onClick={() => {this.DeleteFilm(post.title, post.id_video);}}>
                                        <DeleteIcon />
                                    </Button>
                                    <a className="post-slot-button">{post.title}</a>
                                    <img src={post.poster} height="200px" />
                                    {post.year != null ?
                                        <div className="info_panel">
                                            <p>Год: {post.year}</p>
                                            <p>Страна: {post.countries}</p>
                                            <p>Жанры: {post.genres}</p>
                                            <p>Продолжительность: {post.duration} мин.</p>
                                            <br />
                                            <p>{post.discription != null && post.discription}</p>
                                            <p className="kino_poisk">КиноПоиск: {post.kinopoisk_rating}</p>
                                            <p className="imdb">Imdb: {post.imdb_rating}</p>
                                            <p className="quality">{post.quality}</p>
                                        </div>
                                        :
                                        <p style={{ color: "white" }}>Нет информации!</p>
                                    }
                                </div>
                            )
                        }
                    })}

                    <Pagination
                        className="pagination"
                        count={Math.ceil(this.state.ValuePage / 5)}
                        page={this.state.page}
                        siblingCount={3}
                        boundaryCount={2}
                        onChange={(event, page) => {
                            this.RenderDB(this.state.type, page - 1, this.state.pageSize);
                            window.scrollTo(0, 0);
                            this.setState({ page: page });
                        }} />
                </div>
            </Router >
        );
    }
}

export default BD;