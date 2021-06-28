import React from 'react';
import "../../styles/EditPage.css";
import { Card, Accordion, Button } from 'react-bootstrap';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import {
  BrowserRouter as Router,
  Link,
  Redirect
} from "react-router-dom";

class EditPage extends React.Component {

  constructor() {
    super();

    this.state = {
      referrer: null,
      Info: null,
      message: null,
      countrieslist: [],
      genreslist: [],
    };
  }

  Init() {
    try {
      let data = this.state.Info;

      this.title.value = data.title;
      this.title_orig.value = data.title_orig;
      this.poster.value = data.poster;
      this.year.value = data.year;
      this.setState({ countrieslist: data.countries.split(",") });
      this.setState({ genreslist: data.genres.split(",") });
      this.duration.value = data.duration;
      this.description.value = data.discription;
      this.kinopoisk_rating.value = data.kinopoisk_rating;
      this.imdb_rating.value = data.imdb_rating;
      this.quality.value = data.quality;
      this.actors.value = data.actors;
      this.directors.value = data.directors;
      this.producers.value = data.producers;
      this.writers.value = data.writers;
      this.composers.value = data.composers;
      this.editors.value = data.editors;
      this.designers.value = data.designers;
      this.operators.value = data.operators;
    } catch {
      this.setState({ referrer: "/" });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.meta.match.params.id !== this.props.meta.match.params.id) {
      this.GetData(this.props.meta.match.params.id);
    }
  }

  GetData(id) {
    var form = new FormData();
    form.append('id', id);
    form.append('token', localStorage.getItem("token"));
    fetch("http://site.alwaysdata.net/editorview.php", {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        if (respons != null) {
          this.setState({ Info: respons });
        } else {
          this.setState({ referrer: "/" });
        }
        //console.log(respons);
        this.Init();
      })
  }

  saveInfo(id) {
    console.log(this.state);
    var form = new FormData();
    form.append('id', id);

    form.append('title', this.title.value);
    form.append('title_orig', this.title_orig.value);
    form.append('image', this.poster.value);
    form.append('year', this.year.value);
    form.append('countries', this.state.countrieslist);
    form.append('genres', this.state.genreslist);
    form.append('duration', this.duration.value);
    form.append('description', this.description.value);
    form.append('kinopoisk_rating', this.kinopoisk_rating.value);
    form.append('imdb_rating', this.imdb_rating.value);
    form.append('quality', this.quality.value);
    form.append('actors', this.actors.value);
    form.append('directors', this.directors.value);
    form.append('producers', this.producers.value);
    form.append('writers', this.writers.value);
    form.append('composers', this.composers.value);
    form.append('editors', this.editors.value);
    form.append('designers', this.designers.value);
    form.append('operators', this.operators.value);

    form.append('token', localStorage.getItem("token"));
    fetch("http://site.alwaysdata.net/saveeditor.php", {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        if (respons != null) {
          this.setState({ message: respons.message });
          this.props.message(respons.message);
        } else {
          this.setState({ referrer: "/" });
        }
      })
  }

  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;

    let data = this.state.Info;

    if (data == null) {
      this.GetData(this.props.meta.match.params.id);
      return <div>Загрузка данных....</div>
    }

    return (
      <div className={"central videoview"}>
        <p className="post-slot-button post-slot-buttonview editor-title"><input placeholder={data.title} ref={el => this.title = el} /></p>
        <p className="original-title editor-title"><input placeholder={data.title_orig} ref={el => this.title_orig = el} /></p>
        <Button className="ForeverVideo" style={{ top: "-32px" }} onClick={() => this.saveInfo(data.id_video)}><SaveIcon /></Button>
        <img style={{ float: "left", padding: "3px" }} src={data.poster} height="200px" width="auto" ref={el => { this.image = el; }} />
        <input className={"editor-poster"} placeholder={data.poster} onChange={(e) => { e.target.value != "" ? this.image.src = e.target.value : this.image.src = data.poster; console.log(this.image); }} ref={el => this.poster = el} />
        <div className="info-videoview">
          <p>Год: <input className={"editor-input"} placeholder={data.year} ref={el => this.year = el} /></p>
          <p>Страна: <input className={"editor-input"} placeholder={data.countries != "" ? data.countries : ""} ref={el => this.countries = el} />
            <button className={"add-item"} onClick={() => {
              this.setState({ countrieslist: [...this.state.countrieslist, this.countries.value] });
              this.countries.value = null;
            }
            }>+</button>
          </p>
          <div className="data-list">
            {this.state.countrieslist.map((countrie, key) => {
              return (
                <div className="Tag" key={key}>
                  {countrie}
                  <button className={"delete-item"} onClick={() =>
                    this.setState({ countrieslist: this.state.countrieslist.filter((_, i) => i !== key) })
                  }>
                    <CloseIcon style={{ fontSize: "12px" }} />
                  </button>
                </div>
              );
            }
            )}
          </div>
          <p>Жанры: <input className={"editor-input"} placeholder={data.genres != "" ? data.genres : ""} ref={el => this.genres = el} />
            <button className={"add-item"} onClick={() => {
              this.setState({ genreslist: [...this.state.genreslist, this.genres.value] });
              this.genres.value = null;
            }
            }>+</button>
            <div className="data-list">
              {this.state.genreslist.map((genres, key) => {
                return (
                  <div className="Tag" key={key}>
                    {genres}
                    <button className={"delete-item"} onClick={() =>
                      this.setState({ genreslist: this.state.genreslist.filter((_, i) => i !== key) })
                    }>
                      <CloseIcon style={{ fontSize: "12px" }} />
                    </button>
                  </div>
                );
              }
              )}
            </div>
          </p>
          <p>Продолжительность: <input className={"editor-input"} placeholder={data.duration} ref={el => this.duration = el} /> мин.</p>
          <br />
          <p>Описание: <textarea className={"editor-area"} placeholder={data.description != "" && data.description} ref={el => this.description = el} /></p>
          <p className={"rating-info"} style={{ top: 0 }}>КиноПоиск: <input className={"editor-input"} placeholder={data.kinopoisk_rating} style={{ width: "200px" }} ref={el => this.kinopoisk_rating = el} /></p>
          <p className={"rating-info"} style={{ top: "30px" }}>Imdb: <input className={"editor-input"} placeholder={data.imdb_rating} style={{ width: "200px" }} ref={el => this.imdb_rating = el} /></p>
          <p className={"rating-info"} style={{ top: "60px", color: "green" }}>Качество: <input className={"editor-input"} placeholder={data.quality} style={{ width: "200px" }} ref={el => this.quality = el} /></p>
        </div>
        <hr></hr>
        <iframe src={data.link + "?hide_selectors=true"} width="100%" height="350" frameborder="0" allowfullscreen allow="autoplay *; fullscreen *"></iframe>
        <Accordion>
          {/*seasons != null ? seasons.map((seasons, key) => {
            return (
              <Card key={key} style={{ borderColor: "#474b4e" }}>
                <Card.Header style={{ backgroundColor: "#262a2d" }}>
                  <Accordion.Toggle as={Button} variant="link" style={{ width: "100%" }} eventKey={seasons}>
                    Сезон {seasons}
                  </Accordion.Toggle>
                </Card.Header>

                <Accordion.Collapse eventKey={seasons}>
                  <Card.Body className="episodes-list">
                    {episodes != null ? episodes.map((episode, keys) => <button className={this.state.seriesnum == (keys + 1) ? "series-button series-active" : "series-button"} onClick={() => { this.SaveSeries((keys + 1), data.id, episode); }}>{keys + 1}</button>) : ""}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          }) : ""*/}
        </Accordion>

        <div className={"dop-info"}>
          <p>Актеры: <textarea className={"editor-area"} placeholder={data.actors != "" ? data.actors : ""} ref={el => this.actors = el} /></p>
          <p>Режиссеры: <textarea className={"editor-area"} placeholder={data.directors != "" ? data.directors : ""} ref={el => this.directors = el} /></p>
          <p>Продюссеры: <textarea className={"editor-area"} placeholder={data.producers != "" ? data.producers : ""} ref={el => this.producers = el} /></p>
          <p>Сценаристы: <textarea className={"editor-area"} placeholder={data.writers != "" ? data.writers : ""} ref={el => this.writers = el} /></p>
          <p>Композиторы: <textarea className={"editor-area"} placeholder={data.composers != "" ? data.composers : ""} ref={el => this.composers = el} /></p>
          <p>Монтажеры: <textarea className={"editor-area"} placeholder={data.editors != "" ? data.editors : ""} ref={el => this.editors = el} /></p>
          <p>Художники: <textarea className={"editor-area"} placeholder={data.designers != "" ? data.designers : ""} ref={el => this.designers = el} /></p>
          <p>Операторы: <textarea className={"editor-area"} placeholder={data.operators != "" ? data.operators : ""} ref={el => this.operators = el} /></p>
        </div>
      </div >
    );
  };
}

export default EditPage;