import React from 'react';
import { Button } from 'react-bootstrap';
import FavoriteIcon from '@material-ui/icons/Favorite';
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

    onShowSizeChange(current, pagesize) {
        this.setState({ pageSize: pagesize });
    }

    render() {
        const data = this.props.ContentVideo;
        if (!data) {
            return <div className="central">
                <h2 style={{ color: "white" }}>Поиск по сайту: нет результатов!</h2>
            </div>
        }
        return (
            <div className="central">
                <h2 style={{ color: "white" }}>Поиск по сайту:</h2>
                {data.map((post, key) => {
                    if (post.title != null) {
                        return (
                            <div key={key} className="post-slot">
                                <Button className="ForeverVideo" onClick={() => {
                                    if (localStorage.getItem("name")) {
                                        this.props.SetSave(post.title, post.id_video, post.poster != null ? post.poster : 'https://st.kp.yandex.net/images/no-poster.gif');
                                    } else { this.props.message('Эта функция доступна только авторизованным лицам!'); }
                                }}>
                                    <FavoriteIcon />
                                </Button>

                                <a className="post-slot-button" href={"/video_player/" + post.id_video}>{post.title}</a>
                                {post.poster != null ? <img src={post.poster} height="200px" /> : <img src={"https://st.kp.yandex.net/images/no-poster.gif"} height="200px" />}
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
                        this.props.sear(page - 1, this.state.pageSize, this.props.search);
                        window.scrollTo(0, 0);
                        this.setState({ page: page });
                    }} />

            </div>
        );
    }
}

export default Films;