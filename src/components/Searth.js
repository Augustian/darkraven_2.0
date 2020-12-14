import React from 'react';
import { Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Pagination from '@material-ui/lab/Pagination';

class Films extends React.Component {

    constructor() {
        super();
        this.state = {
            referrer: null,
            pageSize: 5,
            page: 1,
        };
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }

    onShowSizeChange(current, pagesize) {
        console.log(current, pagesize);
        this.setState({ pageSize: pagesize });
    }

    render() {
        const data = this.props.ContentVideo;
        //console.log(data);
        //console.log(this.state.pageSize);
        if (!data) {
            return <div className="central">
                <h2 style={{ color: "white" }}>Поиск по сайту: нет результатов!</h2>
            </div>
        }

        const { referrer } = this.state;
        if (referrer) return <Redirect to={referrer} />;

        return (
            <Router>
                <div className="central">
                    <h2 style={{ color: "white" }}>Поиск по сайту:</h2>
                    {data.map((post, key) => {
                        if (post.title != null) {
                            return (
                                <div key={key} className="post-slot">
                                    <Button className="ForeverVideo" onClick={() => {
                                        if (localStorage.getItem("name")) {
                                            this.props.SetSave(post.title, post.id_video);
                                            this.props.message('Добавлено!');
                                        } else { this.props.message('Эта функция доступна только авторизованным лицам!'); }
                                    }}>
                                        <FavoriteIcon />
                                    </Button>

                                    {post.poster != null ? <img src={post.poster} height="200px" /> : <img src={require('../images/noposter.png')} height="200px" />}
                                    <Button className="post-slot-button" variant="link" onClick={() => { this.setState({ referrer: "/video_player?id=" + post.id_video }) }}><Link to={"/video_player?id=" + post.id_video}>{post.title}</Link></Button>
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
                                        <p style={{ color: "white" }}>Нет информации!</p>}
                                </div>
                            )
                        }
                    })}

                    <Pagination
                        className="pagination"
                        count={Math.ceil(this.props.Value / 5)}
                        page={this.state.page}
                        siblingCount={3}
                        boundaryCount={2}
                        onChange={(event, page) => {
                            this.props.sear(this.props.type, page - 1, this.state.pageSize, this.props.search);
                            window.scrollTo(0, 0);
                            this.setState({ page: page });
                        }} />

                </div>
            </Router>
        );
    }
}

export default Films;