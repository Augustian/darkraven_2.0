import React from 'react';
import { Button } from 'react-bootstrap';
import { Favorite, Visibility } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';

class Films extends React.Component {

    constructor() {
        super();
        this.state = {
            pageSize: 5,
            page: 1,
        };
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }

    componentDidMount() {
        this.props.RenP(this.props.type, 0, this.props.pageSize)
    }

    onShowSizeChange(current, pagesize) {
        this.setState({ pageSize: pagesize });
    }

    addWatched(id) {
        var form = new FormData();
        form.append('id', id);
        form.append('token', localStorage.getItem("token"));
        fetch("http://site.alwaysdata.net/addwatch.php", {
            method: 'POST',
            body: form,
        });

        this.props.Func(this.props.type, this.state.page - 1, this.state.pageSize);
    }

    render() {
        const data = this.props.ContentVideo;
        if (!data) { return <div>Загрузка данных....</div> }

        return (
            <div className="central">
                {data.map((post, key) => {
                    if (post.title != null) {
                        return (
                            <div key={key} className="post-slot">
                                <Button className="ForeverVideo" onClick={() => {
                                    if (localStorage.getItem("name")) {
                                        this.props.SetSave(post.title, post.id_video, post.poster != null ? post.poster : 'https://st.kp.yandex.net/images/no-poster.gif');
                                    } else { this.props.message('Эта функция доступна только авторизованным лицам!'); }
                                }}>
                                    <Favorite />
                                </Button>
                                <Button className="ForeverVideo" style={{ right: "60px" }} onClick={() => {
                                    if (localStorage.getItem("name")) {
                                        this.setState({ viewed: !this.state.viewed });
                                        this.addWatched(post.id_video);
                                        this.props.message('Вы пометили видео запись просмотренной.');
                                    } else { this.props.message('Эта функция доступна только авторизованным лицам!'); }
                                }}>
                                    <Visibility />
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
                        this.props.Func(this.props.type, page - 1, this.state.pageSize);
                        window.scrollTo(0, 0);
                        this.setState({ page: page });
                    }} />
            </div>
        );
    }
}

export default Films;