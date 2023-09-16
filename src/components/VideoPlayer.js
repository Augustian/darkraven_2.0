import React, { useEffect, useState } from 'react';
import { Favorite, Send, InsertEmoticon, Visibility, VisibilityOff, ExpandMore } from '@mui/icons-material';
import "../styles/VideoPlayerStyle.css";
import "../styles/stylecomment.css";
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Card, Popover } from '@mui/material';
import Film from './Template/Film';
import Loading from './Template/Loading';
import { useParams } from 'react-router-dom';
import { getCookie } from '..';
import { useHistory } from 'react-router-dom';

const VideoPlayer = (props) => {
  const [loading, setLoading] = useState(false);
  const [emoji, setEmoji] = useState([]);
  const [show, setShow] = useState(false);
  const [actors, setActors] = useState([]);
  const [data, setData] = useState(null);
  const [seriesnum, setSeriesNum] = useState(null);
  const [valueseries, setValueSeries] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [comments, setComments] = useState([]);
  const [viewed, setViewed] = useState(false);

  const history = useHistory();

  function GetEmojiList() {
    // fetch('http://site.alwaysdata.net/emoji.php', {
    //   method: 'POST',
    // }).then(res => res.json())
    //   .then(respons => {
    //     this.setState({ emoji: respons });
    //   });
  }
  function RenderActors() {
    if (data.material_data != null)
      if (data.material_data.actors != null)
        return (data.material_data.actors.map((list, index) => {
          let actor = actors[index];
          if (actor != null) {
            return (
              <div key={index} className="slot-actor" onClick={() => history.push("/actor/" + actor.id)}>
                <img src={actor.image} />
                <p>{actor.name}</p>
              </div>
            );
          } else {
            return (
              <div key={index} className="slot-actor">
                <img src={"https://kdm.biz.ua/image/catalog/no%20foto.png"} height="100" />
                <p>{list}</p>
              </div>
            );
          }
        }));
  }

  function SaveSeries(series, idvideo, link) {

    setValueSeries(link);
    setSeriesNum(series);
    var form = new FormData();
    form.append('series', series);
    form.append('idvideo', idvideo);
    form.append('table', localStorage.getItem("token"));
    // fetch('http://site.alwaysdata.net/resave.php', {
    //   method: 'POST',
    //   body: form,
    // })
  }

  function getActors(actors) {
    var form = new FormData();
    form.append('actors', actors);
    // fetch('http://site.alwaysdata.net/getdataactors.php', {
    //   method: 'POST',
    //   body: form,
    // }).then(res => res.json())
    //   .then(respons => {
    //     this.setState({ actors: respons });
    //   });
  }

  function GetData(list) {
    setLoading(true);
    fetch('https://kodikapi.com/search?token=9f97924b4aae53e816f330c113b08294&with_material_data=true&with_episodes=true&id=' + list)
      .then(res => res.json())
      .then(respons => {
        let dataApi = respons.results[0];
        setData(dataApi);

        GetEmojiList();
        // if (data.material_data != null)
        //   this.getActors(data.material_data.actors);

        var episodes = [];
        if (dataApi != null) {
          if (dataApi.seasons != null) {
            var seasons = Object.keys(dataApi.seasons);
            for (let i = 0; i < seasons.length; i++) {
              episodes.push(Object.values(dataApi.seasons[seasons[i]].episodes));
            }
          }
          setValueSeries(episodes.length > 0 ?
            episodes[0][0] :
            dataApi.link);
          setEpisodes(episodes);
          setSeasons(seasons);
          setSeriesNum(episodes.length > 0 ? 1 : null);
        }
        document.title = dataApi.title;
        setLoading(false);
      });


    var form = new FormData();
    form.append('id', props.meta.match.params.id);
    // fetch('http://site.alwaysdata.net/getcomments.php', {
    //   method: 'POST',
    //   body: form,
    // }).then(res => res.json())
    //   .then(respons => {
    //     this.setState({ comments: respons });
    //   });
  }
  function PastEmoji(emoji) {
    var selObj = window.getSelection();
    if (selObj.rangeCount > 0) {
      var selRange = selObj.getRangeAt(0);
      selRange.deleteContents();
      document.execCommand('insertText', false, emoji);
    }
  }
  function DateRegist(local) {
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
  function SendComment() {
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
        // fetch('http://site.alwaysdata.net/comments.php', {
        //   method: 'POST',
        //   body: form,
        // });

      } else {
        this.props.message('Комментарий не должен быть пустым!');
      }
    } else {
      this.props.message('Эта функция доступна только авторизованным лицам!');
    }
  }

  const params = useParams();

  useEffect(() => {
    GetData(params.id);
  }, [params.id])

  /*useEffect(() => {
    Watched(params.id);
  }, [])*/

  if (data == null) return <div>Загрузка данных....</div>

  const dataObj = {
    "title": data.title,
    "title_en": data.title_orig,
    "year": data.year,
    "poster_url": data.material_data.poster_url,
    "id_video": data.id,
    "countries": data.material_data.countries,
    "genres": data.material_data.genres,
    "duration": data.material_data.duration,
    "discription": data.material_data.description,
    "kinopoisk_rating": data.material_data.kinopoisk_rating,
    "imdb_rating": data.material_data.imdb_rating,
    "quality": data.quality,
  }

  return (
    <div className={"central videoview"}>
      <Loading open={loading} />

      <Film data={dataObj} {...props}/>

      <hr></hr>
      <div>
        <p style={{ color: "white", margin: "0" }}>Актеры:</p>
        <div className="actor-view">
          {RenderActors()}
        </div>
      </div>

      <hr></hr>
      {seriesnum != null && <h2 className="series">Серия {seriesnum}</h2>}
      <iframe src={valueseries} width="100%" height="350" frameBorder="0" allowFullScreen allow="autoplay *; fullscreen *"></iframe>


      {seasons != null && seasons.map((seasons, key) =>
        <Accordion key={key} style={{ borderColor: "#474b4e" }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ backgroundColor: "#262a2d" }}
          >
            Сезон {seasons}
          </AccordionSummary>

          <AccordionDetails className="episodes-list">
            {episodes[key] != null ? episodes[key].map((episode, keys) => <button key={keys} className={seriesnum == (keys + 1) ? "series-button series-active" : "series-button"} onClick={() => { SaveSeries((keys + 1), data.id, episode); }}>{keys + 1}</button>) : ""}
          </AccordionDetails>
        </Accordion>
      )}


      <div className="comments">
        {/* <Popover id="popover-basic">
            <Popover.Title as="h3">Смайлики</Popover.Title>
            <Popover.Content>
              {this.state.emoji.map((emoji, key) =>
                <button onClick={() => this.PastEmoji(emoji)} key={key}>{emoji}</button>
              )}
            </Popover.Content>
          </Popover> */}
        {/* <InputGroup>
            <FormControl placeholder="Введите комментарий..." ref={this.input} />
            <InputGroup.Append>
              <Button variant="secondary" ref={this.target} onClick={() => this.setState({ show: !this.state.show })}><InsertEmoticon style={{ fontSize: "20px" }} /></Button>
              <Button variant="secondary" onClick={() => this.SendComment()}><Send style={{ fontSize: "20px" }} /></Button>
            </InputGroup.Append>
          </InputGroup> */}
        <div className="list-comment">
          {comments.map((comm, key) =>
            <div key={key} className={(localStorage.getItem("name") == comm.name ? "my-comment" : "comment") + " " + comm.style}>
              <img src={comm.avatar} />
              <div className="content">
                <h1>{comm.name}</h1>
                <p>{comm.comment}</p>
                <small>{DateRegist(comm.date)}</small>
                <div className="angle"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}

export default VideoPlayer;