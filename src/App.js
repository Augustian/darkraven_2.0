import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Posts from './components/Posts'
import Left_Bar from './components/Left_Bar';
import Films from './components/Films';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import VideoPlayer from './components/VideoPlayer';
import Top from './components/Top';
import Searth from './components/Searth'
import Head from './components/Head';
import { Toast } from 'react-bootstrap';
import BD from './components/BD';
import Actors from "./components/Actors";
import EditPage from './components/subcomponents/EditPage';
import EditActors from './components/subcomponents/EditActors';
import ViewActors from './components/ViewActors';
import ActorSearth from './components/subcomponents/ActorSearth';
import Watched from './components/Watched';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      show: false,
      message: '',
      Posts: [],
      VideoContent: [],
      Recomend: [],
      PostValue: 0,
      VideoValuePage: 0,
      pageSize: 5,
      search: "",
      Type: 0,
    };

    this.SetSave = this.SetSave.bind(this);
    this.RenderPost = this.RenderPost.bind(this);
    this.Search = this.Search.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  onMessage(mess) {
    this.setState({ show: true, message: mess });
  }

  componentDidMount() {
    
    this.GetRecomendData();
  }

  GetRecomendData() {
    fetch('http://site.alwaysdata.net/recomend.php', {
      method: 'POST',
    }).then(res => res.json())
      .then(respons => {
        this.setState({ Recomend: respons.posts });
      })
  }

  SetSave(title, idvideo, ico) {
    var form = new FormData();
    form.append('title', title);
    form.append('idvideo', idvideo);
    form.append('ico', ico);
    form.append('table', localStorage.getItem("token"));
    fetch('http://site.alwaysdata.net/save.php', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ show: true, message: respons.message });
      })
  }

  RenderPost(type, Page, pageSize) {
    var form = new FormData();
    form.append('type', type);
    form.append('page', Page);
    this.setState({ pageSize: pageSize });
    form.append('pagesize', pageSize);
    form.append('token', localStorage.getItem("token"));
    console.log(form);
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

  Search(Page, pageSize, result) {
    this.setState({ pageSize: pageSize, search: result});
    var form = new FormData();
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
          <Head onMessage={this.onMessage} Search={this.Search} Type={this.state.Type} pageSize={this.state.pageSize} onMessage={this.onMessage} />
          <div className="option"></div>
          <Left_Bar data={this.state.Recomend} />
          {searth}

          <Switch>
            <Route exact path="/" render={() =><Posts />}/>
            <Route exact path="/top" render={() => <Top />}/>
            <Route exact path="/films" render={() =><Films Value={this.state.VideoValuePage} pageSize={this.state.pageSize} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="3" RenP={this.RenderPost} message={this.onMessage} />}/>
            <Route exact path="/serials" render={() =><Films Value={this.state.VideoValuePage} pageSize={this.state.pageSize} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="4" RenP={this.RenderPost} message={this.onMessage} />}/>
            <Route exact path="/doramy" render={() =><Films Value={this.state.VideoValuePage} pageSize={this.state.pageSize} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="5" RenP={this.RenderPost} message={this.onMessage} />}/>
            <Route exact path="/anime" render={() => <Films Value={this.state.VideoValuePage} pageSize={this.state.pageSize} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="6" RenP={this.RenderPost} message={this.onMessage} />}/>
            <Route path="/video_player/:id" render={(e) => <VideoPlayer meta={e} message={this.onMessage} SetSave={this.SetSave} />} />
            <Route path="/searth" render={() => <Searth message={this.onMessage} SearchFunc={this.Search} search={this.state.search} Value={this.state.VideoValuePage} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="7" />}/>
            <Route exact path="/edit-database" render={() => <BD message={this.onMessage} />}/>
            <Route exact path="/edit-actors" render={() => <Actors message={this.onMessage} />} />
            <Route path="/edaeditor/:id" render={(e) => <EditPage meta={e} message={this.onMessage}/>} />
            <Route path="/edaactor/:id" render={(e) => <EditActors meta={e} message={this.onMessage}/>} />
            <Route path="/actors" render={() => <ViewActors/>} />
            <Route path="/actor/:id" render={(e) => <ActorSearth meta={e}/>} />
            <Route path="/watched" render={() => <Watched message={this.onMessage}/>} />
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