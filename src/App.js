import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Posts from './components/Posts'
import Left_Bar from './components/Left_Bar';
import Films from './components/Films';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import VideoPlayer from './components/ViderPlayer';
import Top from './components/Top';
import Searth from './components/Searth'
import Head from './components/Head';
import { Toast } from 'react-bootstrap';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      show: false,
      message: '',
      BookMarks: [],
      Posts: [],
      SliderPost: [],
      VideoContent: [],
      Recomend: [],
      PostValue: 0,
      VideoValuePage: 0,
      pageSize: 5,
      search: "",
      Type: 0,
    };

    this.GetData = this.GetData.bind(this);
    this.RenderPost = this.RenderPost.bind(this);
    this.Search = this.Search.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  onMessage(mess) {
    this.setState({ show: true, message: mess });
  }

  componentDidMount() {
    this.GetData(0);
    this.GetSave();
    this.GetSliderData();
    this.GetRecomendData();
  }

  GetData(list) {
    var form = new FormData();
    form.append('list', list);
    fetch('http://site.alwaysdata.net/posts.php', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ Posts: respons.posts, PostValue: respons.postsvalue });
      })
  }

  GetSliderData() {
    fetch('http://site.alwaysdata.net/headslider.php', {
      method: 'POST',
    }).then(res => res.json())
      .then(respons => {
        this.setState({ SliderPost: respons.posts });
        console.log("SliderData: ", respons.posts);
      })
  }

  GetRecomendData() {
    fetch('http://site.alwaysdata.net/recomend.php', {
      method: 'POST',
    }).then(res => res.json())
      .then(respons => {
        this.setState({ Recomend: respons.posts });
      })
  }

  SetSave(title, idvideo) {
    var form = new FormData();
    form.append('title', title);
    form.append('idvideo', idvideo);
    form.append('table', localStorage.getItem("token"));
    fetch('http://site.alwaysdata.net/save.php', {
      method: 'POST',
      body: form,
    })
  }

  GetSave() {
    var form = new FormData();
    form.append('table', localStorage.getItem("token"));
    fetch('http://site.alwaysdata.net/write.php', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ BookMarks: respons.marks });
        console.log("Save: ", respons.marks);
      })
  }

  RemoveSaveBookMark(id) {
    var form = new FormData();
    form.append('id', id);
    form.append('table', localStorage.getItem("token"));
    fetch('http://site.alwaysdata.net/remove.php', {
      method: 'POST',
      body: form,
    })
  }

  RenderPost(type, Page, pageSize) {
    var form = new FormData();
    form.append('type', type);
    form.append('page', Page);
    this.setState({ pageSize: pageSize });
    form.append('pagesize', pageSize);

    fetch("http://site.alwaysdata.net/datavideo.php", {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ VideoContent: respons, VideoValuePage: respons.length });
        console.log("Video: ", this.state.VideoContent);
      })

    this.setState({ Type: type });
  }

  Search(type, Page, pageSize, result) {
    this.setState({ pageSize: pageSize, search: result, Type: type });
    var form = new FormData();
    form.append('type', type);
    form.append('page', Page);
    form.append('pagesize', pageSize);
    form.append('result', result);

    fetch("http://site.alwaysdata.net/searth.php", {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ VideoContent: respons, VideoValuePage: respons.length });
        console.log("Searth: ", this.state.VideoContent);
      })
  }

  render() {
    let searth = this.state.search != '' ? <Redirect to={"/searth"} /> : null;

    return (
      <Router>
        <div className={"main-conteiner"}>
          <Head onMessage={this.onMessage} SliderPost={this.state.SliderPost} Search={this.Search} Type={this.state.Type} pageSize={this.state.pageSize} BookMarks={this.state.BookMarks} RemoveSaveBookMark={this.RemoveSaveBookMark} onMessage={this.onMessage} />
          <div className="option"></div>
          <Left_Bar data={this.state.Recomend} />
          {searth}
          <Switch>

            <Route exact path="/">
              <Posts Content={this.state.Posts} Value={this.state.PostValue} Func={this.GetData} />
            </Route>
            <Route exact path="/top">
              <Top />
            </Route>
            <Route exact path="/films">
              <Films Value={this.state.VideoValuePage} pageSize={this.state.pageSize} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="3" RenP={this.RenderPost} message={this.onMessage} />
            </Route>
            <Route exact path="/serials">
              <Films Value={this.state.VideoValuePage} pageSize={this.state.pageSize} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="4" RenP={this.RenderPost} message={this.onMessage} />
            </Route>
            <Route exact path="/doramy">
              <Films Value={this.state.VideoValuePage} pageSize={this.state.pageSize} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="5" RenP={this.RenderPost} message={this.onMessage} />
            </Route>
            <Route exact path="/anime">
              <Films Value={this.state.VideoValuePage} pageSize={this.state.pageSize} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="6" RenP={this.RenderPost} message={this.onMessage} />
            </Route>

            <Route exact path="/video_player">
              <VideoPlayer />
            </Route>

            <Route path="/searth">
              <Searth message={this.onMessage} search={this.state.search} Value={this.state.VideoValuePage} sear={this.Search} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="7" />
            </Route>

            <Route render={() => <h1 style={{ textAlign: "center", color: "#fff" }}>Такой страницы нема)</h1>} />
          </Switch>

          <div className={"message"}>
            <Toast onClose={() => this.setState({ show: false })} show={this.state.show} delay={3000} autohide>
              <Toast.Header>
                <strong className="mr-auto">Уведомление!</strong>
              </Toast.Header>
              <Toast.Body>{this.state.message}</Toast.Body>
            </Toast>
          </div>
        </div>

      </Router>
    );
  }
}

export default App;