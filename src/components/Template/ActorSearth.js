import React from 'react';
import "../../styles/EditPage.css";
import {
  BrowserRouter as Router,
  Link,
  Redirect
} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';

class ActorSearth extends React.Component {

  constructor() {
    super();

    this.state = {
      referrer: null,
      pageSize: 5,
      page: 1,
      Posts: null,
      PostValue: null,
      Info: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.meta.match.params.id !== this.props.meta.match.params.id) {
      this.GetData(this.props.meta.match.params.id, 0, this.state.pageSize);
      window.scrollTo(0, 0);
    }
  }

  GetData(id, Page, pageSize) {
    var form = new FormData();
    form.append('id', id);
    form.append('page', Page);
    form.append('pagesize', pageSize);
    fetch("http://site.alwaysdata.net/searthactor.php", {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ Posts: respons.video, PostValue: respons.length, Info: respons.info });
        console.log(respons);
      })
  }


  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;

    let data = this.state.Info;
    let post = this.state.Posts;

    if (data == null || post == null) {
      this.GetData(this.props.meta.match.params.id, 0, this.state.pageSize);
      return <div>Загрузка данных....</div>
    }

    return (
      <div className={"central videoview"}>
        <p className="post-slot-button post-slot-buttonview">{data.Name}</p>
        <img style={{ float: "left", padding: "3px" }} src={data.Image} height="200px" width="auto" />
        <div className="info-videoview" style={{ minHeight: "200px" }}>
          <p>Дата рождения: {data.Date}</p>
          <p>Рост: {data.Growth} м</p>
        </div>

        <h4 style={{ color: "white" }}>Найдено записей: {this.state.PostValue}</h4>
        <div style={{ padding: "15px" }}>
          {post.map((post, key) => {
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
            count={Math.ceil(this.state.PostValue / 5)}
            page={this.state.page}
            siblingCount={3}
            boundaryCount={2}
            onChange={(event, page) => {
              this.GetData(this.props.meta.match.params.id, page - 1, this.state.pageSize);
              window.scrollTo(0, 0);
              this.setState({ page: page });
            }} />
        </div>
      </div>
    );
  };
}

export default ActorSearth;