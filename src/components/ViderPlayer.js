import React from 'react';

class VideoPlayer extends React.Component {

  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  GetData(list) {
    fetch('https://kodikapi.com/search?token=9f97924b4aae53e816f330c113b08294&with_material_data=true&id=' + list, {
      method: 'POST',
    }).then(res => res.json())
      .then(respons => {
        this.setState({ data: respons.results[0] });
        console.log("Video: ", respons.results[0]);
      })
  }

  render() {
    let params = (new URL(document.location)).searchParams;
    let data = this.state.data;
    if (!this.state.data) {
      this.GetData(params.get("id"));
      return <div>Загрузка данных....</div>
    }
    return (
      <div className={"central videoview"}>
        <p className="post-slot-button post-slot-buttonview">{data.title}</p>
        <p className="original-title">{data.title_orig}</p>
        {data.material_data != null
          ?
          <img style={{ float: "left", padding: "3px" }} src={data.material_data.poster_url} height="200px" />
          :
          <img style={{ float: "left", padding: "3px" }} src={require('../images/noposter.png')} height="200px" />
        }
        {data.material_data != null &&
          <div className="info-videoview">
            <p>Год: {data.year}</p>
            <p>Страна: {data.material_data.countries != null && data.material_data.countries.map((list) => <p style={{ display: "initial" }}>{list} </p>)}</p>
            <p>Жанры: {data.material_data.anime_genres == null ? data.material_data.genres.map((list) => <p style={{ display: "initial" }}>{list} </p>) : data.material_data.anime_genres.map((list) => <p style={{ display: "initial" }}>{list} </p>)}</p>
            <p>Продолжительность: {data.material_data.duration} мин.</p>
            <br />
            <p>{data.material_data.description != null && data.material_data.description}</p>
            <p className={"rating-info"} style={{ top: 0 }}>КиноПоиск: {data.material_data.kinopoisk_rating}</p>
            <p className={"rating-info"} style={{ top: "15px" }}>Imdb: {data.material_data.imdb_rating}</p>
            <p className={"rating-info"} style={{ top: "30px", color: "green" }}>{data.quality}</p>
          </div>
        }
        <br />
        <iframe src={data.link} width="100%" height="350" frameborder="0" allowfullscreen allow="autoplay *; fullscreen *"></iframe>

        <div className={"dop-info"}>
          <ul>Актеры: {data.material_data.actors != null &&
            data.material_data.actors.map((list) => <li>{list}</li>)}
          </ul>
          <ul>Режиссеры: {data.material_data.directors != null &&
            data.material_data.directors.map((list) => <li>{list}</li>)}
          </ul>
          <ul>Продюссеры: {data.material_data.producers != null &&
            data.material_data.producers.map((list) => <li>{list}</li>)}
          </ul>
          <ul>Сценаристы: {data.material_data.writers != null &&
            data.material_data.writers.map((list) => <li>{list}</li>)}
          </ul>
          <ul>Композиторы: {data.material_data.composers != null &&
            data.material_data.composers.map((list) => <li>{list}</li>)}
          </ul>
          <ul>Монтажеры: {data.material_data.editors != null &&
            data.material_data.editors.map((list) => <li>{list}</li>)}
          </ul>
          <ul>Художники: {data.material_data.designers != null &&
            data.material_data.designers.map((list) => <li>{list}</li>)}
          </ul>
          <ul>Операторы: {data.material_data.operators != null &&
            data.material_data.operators.map((list) => <li>{list}</li>)}
          </ul>
        </div>
      </div>
    );
  };
}

export default VideoPlayer;