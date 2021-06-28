import React from 'react';
import { Button } from 'react-bootstrap';
import { VisibilityOff } from '@material-ui/icons';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';

class Watched extends React.Component {

    constructor() {
        super();
        this.state = {
            referrer: null,
            Content: [],
            ValuePage: null,
            pageSize: 5,
            page: 1,
        };
    }

    componentDidMount() {
        this.RenderDB(0, this.state.pageSize);
        window.scrollTo(0, 0);
    }

    removeWatch(id) {
        var form = new FormData();
        form.append('id', id);
        form.append('token', localStorage.getItem("token"));
        fetch("http://site.alwaysdata.net/removewatch.php", {
            method: 'POST',
            body: form,
        });
        this.RenderDB(this.state.page - 1, this.state.pageSize);
    }

    RenderDB(Page, pageSize) {
        var form = new FormData();
        form.append('page', Page);
        form.append('pagesize', pageSize);
        form.append('token', localStorage.getItem("token"));
        fetch("http://site.alwaysdata.net/watched.php", {
            method: 'POST',
            body: form,
        }).then(res => res.json())
            .then(respons => {
                this.setState({ Content: respons.video, ValuePage: respons.length, pageSize: pageSize });
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
                    {data.map((post, key) => {
                        if (post.title != null)
                            return <div key={key} className="post-slot">
                                <Button className="ForeverVideo" onClick={() => {
                                    if (localStorage.getItem("name")) {
                                        this.props.message('Вы пометили видео запись не просмотренной.');
                                        this.removeWatch(post.id_video);
                                    } else { this.props.message('Эта функция доступна только авторизованным лицам!'); }
                                }}>
                                    <VisibilityOff />
                                </Button>
                                <a className="post-slot-button" href={"/video_player/" + post.id_video}>{post.title}</a>
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
                    })}

                    <Pagination
                        className="pagination"
                        count={Math.ceil(this.state.ValuePage / 5)}
                        page={this.state.page}
                        siblingCount={3}
                        boundaryCount={2}
                        onChange={(event, page) => {
                            this.RenderDB(page - 1, this.state.pageSize);
                            window.scrollTo(0, 0);
                            this.setState({ page: page });
                        }} />
                </div>
            </Router >
        );
    }
}

export default Watched;