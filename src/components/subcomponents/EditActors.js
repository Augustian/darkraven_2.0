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

class EditActors extends React.Component {

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

      this.title.value = data.Name;
      this.DateofBirth.value = data.DateofBirth;
      this.Growth.value = data.Growth;
      this.poster.value = data.Image;
    } catch {
      this.setState({ referrer: "/" });
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      Info: {
        Name: "Имя",
        DateofBirth: "Дата рождения",
        Growth: "Рост",
        Image: "https://st.kp.yandex.net/images/no-poster.gif"
      }
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.meta.match.params.id !== this.props.meta.match.params.id) {
      this.GetData(this.props.meta.match.params.id);
      window.scrollTo(0, 0);
    }
  }

  GetData(id) {
    var form = new FormData();
    form.append('id', id);
    form.append('token', localStorage.getItem("token"));
    fetch("http://site.alwaysdata.net/actorview.php", {
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
    //console.log(this.state);
    var form = new FormData();
    form.append('type', this.props.meta.match.params.id == "new" ? 1 : 0);
    form.append('id', id);
    form.append('Name', this.title.value);
    form.append('DateofBirth', this.DateofBirth.value);
    form.append('Growth', this.Growth.value);
    form.append('Image', this.poster.value);

    form.append('token', localStorage.getItem("token"));
    fetch("http://site.alwaysdata.net/createactor.php", {
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
        //console.log(respons.message);
      })
  }

  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;

    let data = this.state.Info;

    if (data == null) {
      if (this.props.meta.match.params.id != "new")
        this.GetData(this.props.meta.match.params.id);

      return <div>Загрузка данных....</div>
    }

    return (
      <div className={"central videoview"}>
        <p className="post-slot-button post-slot-buttonview editor-title"><input placeholder={data.Name} ref={el => this.title = el} /></p>
        <Button className="ForeverVideo" style={{ top: "-32px" }} onClick={() => this.saveInfo(this.props.meta.match.params.id)}><SaveIcon /></Button>
        <img style={{ float: "left", padding: "3px" }} src={data.Image} height="200px" width="auto" ref={el => { this.image = el; }} />
        <input className={"editor-poster"} placeholder={data.Image} onChange={(e) => e.target.value != "" ? this.image.src = e.target.value : this.image.src = data.Image} ref={el => this.poster = el} />
        <div className="info-videoview">
          <p>Дата рождения: <input className={"editor-input"} placeholder={data.DateofBirth} ref={el => this.DateofBirth = el} /></p>
          <p>Рост: <input className={"editor-input"} placeholder={data.Growth} ref={el => this.Growth = el} /> м</p>
        </div>
      </div >
    );
  };
}

export default EditActors;