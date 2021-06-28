import React from 'react';
import { Card, Accordion, Button, FormControl, InputGroup, Popover, Overlay } from 'react-bootstrap';
import {Favorite, Send, InsertEmoticon, Visibility, VisibilityOff} from '@material-ui/icons';
import "../styles/VideoPlayerStyle.css";
import "../styles/stylecomment.css";

class VideoPlayer extends React.Component {

  constructor() {
    super();

    this.state = {
      emoji: [],
      show: false,
      actors: [],
      data: null,
      seriesnum: null,
      valueseries: null,
      episodes: [],
      seasons: [],
      selectedButton: null,
      comments: [],
      viewed: false,
    };

    this.target = React.createRef();
    this.input = React.createRef();
  }

  componentDidMount(){
    this.Watched(this.props.meta.match.params.id, 0);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.meta.match.params.id !== this.props.meta.match.params.id) {
      this.GetData(this.props.meta.match.params.id);
      this.Watched(this.props.meta.match.params.id, 0);
    }
  }

  GetEmojiList() {
    fetch('http://site.alwaysdata.net/emoji.php', {
      method: 'POST',
    }).then(res => res.json())
      .then(respons => {
        this.setState({ emoji: respons });
      });
  }

  RenderActors() {
    let data = this.state.data;
    if (data.material_data != null)
      if (data.material_data.actors != null)
        return (data.material_data.actors.map((list, index) => {
          let actor = this.state.actors[index];
          if (actor != null) {
            return (
              <div className="slot-actor">
                <img src={actor.image} />
                <p>{actor.name}</p>
              </div>
            );
          } else {
            return (
              <div className="slot-actor">
                <img src={"https://kdm.biz.ua/image/catalog/no%20foto.png"} height="100" />
                <p>{list}</p>
              </div>
            );
          }
        }));
  }

  SaveSeries(series, idvideo, link) {

    this.setState({ valueseries: link, seriesnum: series });
    var form = new FormData();
    form.append('series', series);
    form.append('idvideo', idvideo);
    form.append('table', localStorage.getItem("token"));
    fetch('http://site.alwaysdata.net/resave.php', {
      method: 'POST',
      body: form,
    })
  }

  getActors(actors) {
    var form = new FormData();
    form.append('actors', actors);
    fetch('http://site.alwaysdata.net/getdataactors.php', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ actors: respons });
      });
  }

  Watched(id, replace) {
    var form = new FormData();
    form.append('id', id);
    form.append('replace', replace);
    form.append('token', localStorage.getItem("token"));
    fetch('http://site.alwaysdata.net/switchwatch.php', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ viewed: respons.status });
      });
  }

  GetData(list) {
    fetch('https://kodikapi.com/search?token=9f97924b4aae53e816f330c113b08294&with_material_data=true&with_episodes=true&id=' + list)
      .then(res => res.json())
      .then(respons => {
        this.setState({ data: respons.results[0] });

        this.GetEmojiList();
        let data = this.state.data;
        if (data.material_data != null)
          this.getActors(data.material_data.actors);

        var episodes = [];
        if (data.seasons != null) {
          var seasons = Object.keys(data.seasons);
          for (let i = 0; i < seasons.length; i++) {
            episodes.push(Object.values(data.seasons[seasons[i]].episodes));
          }
        }
        this.setState({
          valueseries: episodes.length > 0 ?
            episodes[0][0] :
            data.link,
          episodes: episodes,
          seasons: seasons,
          seriesnum: episodes.length > 0 ? 1 : null,
        });

        console.log(episodes);
      });


    var form = new FormData();
    form.append('id', this.props.meta.match.params.id);
    fetch('http://site.alwaysdata.net/getcomments.php', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ comments: respons });
      });
  }

  PastEmoji(emoji) {
    var selObj = window.getSelection();
    if (selObj.rangeCount > 0) {
      var selRange = selObj.getRangeAt(0);
      selRange.deleteContents();
      document.execCommand('insertText', false, emoji);
    }
  }

  DateRegist(local) {
    let lastvisit = new Date(Date.parse(local));
    let totaldate = new Date(Date.now());
    if (lastvisit.toLocaleDateString() === totaldate.toLocaleDateString()) {
      if (lastvisit.getHours() == totaldate.getHours()) {
        if (lastvisit.getMinutes() == totaldate.getMinutes()) {
          return "Только что!";
        }
        return (totaldate.getMinutes() - lastvisit.getMinutes()) + " минут назад";
      } else {
        return (totaldate.getHours() - lastvisit.getHours()) + " часов назад";
      }
    } else {
      if (lastvisit.getDay() == totaldate.getDay() - 1) {
        return "Вчера";
      } else {
        return lastvisit.toLocaleDateString();
      }
    }
  }

  SendComment() {
    if (localStorage.getItem("token") != null) {
      if (this.input.current.value.length > 0 && this.input.current.value !== "" && this.input.current.value.trim()) {
        let newcomment = {
          Name: localStorage.getItem("name"),
          Comment: this.input.current.value,
          Data: new Date(Date.now()).toUTCString(),
          Avatar: localStorage.getItem("icon"),
          style: localStorage.getItem("style"),
        }
        this.input.current.value = null;
        this.setState({ comments: [newcomment, ...this.state.comments] });
        var form = new FormData();
        form.append('id', this.props.meta.match.params.id);
        form.append('comments', JSON.stringify([newcomment, ...this.state.comments]));
        fetch('http://site.alwaysdata.net/comments.php', {
          method: 'POST',
          body: form,
        });

      } else {
        this.props.message('Комментарий не должен быть пустым!');
      }
    } else {
      this.props.message('Эта функция доступна только авторизованным лицам!');
    }
  }

  render() {
    let data = this.state.data;
    let episodes = this.state.episodes;
    let seasons = this.state.seasons;

    if (data == null) {
      this.GetData(this.props.meta.match.params.id);
      return <div>Загрузка данных....</div>
    }
    return (
      <div className={"central videoview"}>
        <p className="post-slot-button post-slot-buttonview">{data.title}</p>
        <p className="original-title">{data.title_orig}</p>
        <Button className="ForeverVideo" onClick={() => {
          if (localStorage.getItem("name")) {
            this.props.SetSave(data.title, data.id, data.material_data != null ? data.material_data.poster_url : 'https://st.kp.yandex.net/images/no-poster.gif');
          } else { this.props.message('Эта функция доступна только авторизованным лицам!'); }
        }}>
          <Favorite />
        </Button>
        <Button className="ForeverVideo" style={{right: "60px"}} onClick={() => {
          if (localStorage.getItem("name")) {
            this.Watched(data.id, 1);
            this.state.viewed == true ? this.props.message('Вы пометили видео запись не просмотренной.') : this.props.message('Вы пометили видео запись просмотренной.');
          } else { this.props.message('Эта функция доступна только авторизованным лицам!'); }
        }}>
          {this.state.viewed == true ? <VisibilityOff /> : <Visibility />}
        </Button>
        {data.material_data != null
          ?
          <img style={{ float: "left", padding: "3px" }} src={data.material_data.poster_url} height="200px" />
          :
          <img style={{ float: "left", padding: "3px" }} src={"https://st.kp.yandex.net/images/no-poster.gif"} height="200px" />
        }
        {data.material_data != null &&
          <div className="info-videoview">
            <p>Год: {data.year}</p>
            <p>Страна: {data.material_data.countries != null && data.material_data.countries.map((list) => <p style={{ display: "initial" }}>{list} </p>)}</p>
            <p>Жанры: {data.material_data.genres != null && data.material_data.genres.map((list) => <p style={{ display: "initial" }}>{list} </p>)}</p>
            <p>Продолжительность: {data.material_data.duration} мин.</p>
            <br />
            <p>{data.material_data.description != null && data.material_data.description}</p>
            <p className={"rating-info"} style={{ top: 0 }}>КиноПоиск: {data.material_data.kinopoisk_rating}</p>
            <p className={"rating-info"} style={{ top: "15px" }}>Imdb: {data.material_data.imdb_rating}</p>
            <p className={"rating-info"} style={{ top: "30px", color: "green" }}>{data.quality}</p>
          </div>
        }
        <hr></hr>

        <div>
          <p style={{ color: "white", margin: "0" }}>Актеры:</p>
          <div className="actor-view">
            {this.RenderActors()}
          </div>
        </div>

        <hr></hr>
        { this.state.seriesnum != null && <h2 className="series">Серия {this.state.seriesnum}</h2>}
        <iframe src={this.state.valueseries} width="100%" height="350" frameborder="0" allowfullscreen allow="autoplay *; fullscreen *"></iframe>

        <Accordion>
          {seasons != null ? seasons.map((seasons, key) => {
            return (
              <Card key={key} style={{ borderColor: "#474b4e" }}>
                <Card.Header style={{ backgroundColor: "#262a2d" }}>
                  <Accordion.Toggle as={Button} variant="link" style={{ width: "100%" }} eventKey={seasons}>
                    Сезон {seasons}
                  </Accordion.Toggle>
                </Card.Header>

                <Accordion.Collapse eventKey={seasons}>
                  <Card.Body className="episodes-list">
                    {episodes[key] != null ? episodes[key].map((episode, keys) => <button className={this.state.seriesnum == (keys + 1) ? "series-button series-active" : "series-button"} onClick={() => { this.SaveSeries((keys + 1), data.id, episode); }}>{keys + 1}</button>) : ""}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          }) : ""}
        </Accordion>

        <div className="comments">
          <Overlay target={this.target.current} show={this.state.show} placement="top-end">
            <Popover id="popover-basic">
              <Popover.Title as="h3">Смайлики</Popover.Title>
              <Popover.Content>
                {this.state.emoji.map((emoji, key) =>
                  <button onClick={() => this.PastEmoji(emoji)} key={key}>{emoji}</button>
                )}
              </Popover.Content>
            </Popover>
          </Overlay>
          <InputGroup>
            <FormControl placeholder="Введите комментарий..." ref={this.input} />
            <InputGroup.Append>
              <Button variant="secondary" ref={this.target} onClick={() => this.setState({ show: !this.state.show })}><InsertEmoticon style={{ fontSize: "20px" }} /></Button>
              <Button variant="secondary" onClick={() => this.SendComment()}><Send style={{ fontSize: "20px" }} /></Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="list-comment">
            {this.state.comments.map((comm) =>
              <div className={(localStorage.getItem("name") == comm.Name ? "my-comment" : "comment") + " " + comm.style}>
                <img src={comm.Avatar} />
                <div className="content">
                  <h1>{comm.Name}</h1>
                  <p>{comm.Comment}</p>
                  <small>{this.DateRegist(comm.Data)}</small>
                  <div className="angle"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div >
    );
  };
}

export default VideoPlayer;