import React from 'react';
import './styles/App.scss';
import Posts from './components/Posts'
import Left_Bar from './components/Left_Bar';
import Films from './components/Films';
import { Switch, Route } from "react-router-dom";
import VideoPlayer from './components/VideoPlayer';
import Top from './components/Top';
import Searth from './components/Searth'
import Head from './components/Head';
import BD from './components/BD';
import Actors from "./components/Actors";
import EditPage from './components/Template/EditPage';
import EditActors from './components/Template/EditActors';
import ActorSearth from './components/Template/ActorSearth';
import Watched from './components/Watched';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { getCookie, logout, setCookie } from '.';
import { useHistory } from 'react-router-dom';
import Loading from './components/Template/Loading';
import Favorites from './components/Favorites';

const Routers = () => {
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [videoValuePage, setVideoValuePage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState("");
  const [type, setType] = useState(0);

  const history = useHistory();

  const onMessage = (mess) => {
    setShow(true);
    setMessage(mess);
  }

  const GetRecomendData = () => {
    setLoading(true);
    fetch('http://site.alwaysdata.net/api/get_recomend_content.php', {
      method: 'POST',
    }).then(res => res.json())
      .then(respons => {
        setRecommend(respons);
        setLoading(false);
      })
  }

  const SetSave = (idPost, setFavorite) => {
    fetch('http://site.alwaysdata.net/api/switch_favorite.php', {
      method: 'POST',
      body: JSON.stringify({
        'jwt': getCookie('jwt'),
        'id_post': idPost,
      }),
    }).then(res => res.json())
      .then(respons => {
        setShow(true);
        if (respons.status == 200) {
          setMessage("Добавлено в Избранное");
          setFavorite(true);
        }
        else if (respons.status == 201) {
          setMessage("Удалено из Избранных");
          setFavorite(false);
        }
      })
  }

  const addWatched = (idPost, setState) => {
    fetch('http://site.alwaysdata.net/api/switch_view.php', {
      method: 'POST',
      body: JSON.stringify({
        'jwt': getCookie('jwt'),
        'id_post': idPost,
      }),
    }).then(res => res.json())
      .then(respons => {
        if (respons.status == 200 || respons.status == 201)
          setState(respons.status == 200 ? true : false);
      });
  }

  const RenderPost = (type, Page, pageSize) => {
    setLoading(true);
    var form = new FormData();
    form.append('type', type);
    form.append('page', Page);
    setPageSize(pageSize);
    form.append('pageSize', pageSize);

    fetch("http://site.alwaysdata.net/api/get_content.php", {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        setPosts(respons);
        setLoading(false);
      })

    setType(type);
  }

  const Search = (Page, pageSize, result) => {
    setLoading(true);
    setPageSize(pageSize);
    setSearch(result);
    var form = new FormData();
    form.append('page', Page);
    form.append('pageSize', pageSize);
    form.append('value', result);

    fetch("http://site.alwaysdata.net/api/searth.php", {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        setPosts(respons);
        setLoading(false);
      })
  }

  const onUpdateToken = () => {
    let jwt = getCookie("jwt");
    fetch('http://site.alwaysdata.net/api/update_token.php', {
      method: 'POST',
      body: JSON.stringify({
        'jwt': jwt,
      }),
    }).then(e => e.json()).then(v => {
      if (v.message == "Access granted.") {
        setCookie("jwt", v.token, 1);
        onMessage('Вход возобновлен!');
      } else {
        logout();
      }
    });
  }

  useEffect(() => {
    if (search != '') history.push("/searth");
  }, [search])

  useEffect(() => {
    GetRecomendData();
    onUpdateToken();
  }, [])


  return (
    <div className={"main-conteiner"}>
      <Loading open={loading} />

      <Head onMessage={onMessage} Search={Search} Type={type} pageSize={pageSize} />
      <div className="option"></div>
      <Left_Bar data={recommend} />

      <Switch>
        <Route exact path="/" render={() => <Posts />} />
        <Route exact path="/top" render={() => <Top />} />
        <Route exact path="/films" render={() => <Films Value={videoValuePage} pageSize={pageSize} Func={RenderPost} SetSave={SetSave} ContentVideo={posts} type="3" RenP={RenderPost} message={onMessage} addWatched={addWatched} />} />
        <Route exact path="/serials" render={() => <Films Value={videoValuePage} pageSize={pageSize} Func={RenderPost} SetSave={SetSave} ContentVideo={posts} type="4" RenP={RenderPost} message={onMessage} addWatched={addWatched} />} />
        <Route exact path="/doramy" render={() => <Films Value={videoValuePage} pageSize={pageSize} Func={RenderPost} SetSave={SetSave} ContentVideo={posts} type="5" RenP={RenderPost} message={onMessage} addWatched={addWatched} />} />
        <Route exact path="/anime" render={() => <Films Value={videoValuePage} pageSize={pageSize} Func={RenderPost} SetSave={SetSave} ContentVideo={posts} type="6" RenP={RenderPost} message={onMessage} addWatched={addWatched} />} />
        <Route path="/video_player/:id" render={(e) => <VideoPlayer meta={e} message={onMessage} SetSave={SetSave} addWatched={addWatched} />} />
        <Route path="/searth" render={() => <Searth message={onMessage} SearchFunc={Search} search={search} Value={videoValuePage} SetSave={SetSave} ContentVideo={posts} type="7" />} />
        <Route exact path="/edit-database" render={() => <BD message={onMessage} />} />
        <Route exact path="/edit-actors" render={() => <Actors message={onMessage} />} />
        <Route path="/edaeditor/:id" render={(e) => <EditPage meta={e} message={onMessage} />} />
        <Route path="/edaactor/:id" render={(e) => <EditActors meta={e} message={onMessage} />} />
        <Route path="/favorites" render={() => <Favorites SetSave={SetSave} message={onMessage} addWatched={addWatched} />} />
        <Route path="/actor/:id" render={(e) => <ActorSearth meta={e} />} />
        <Route path="/watched" render={() => <Watched SetSave={SetSave} message={onMessage} addWatched={addWatched} />} />
        <Route render={() => <h1 style={{ textAlign: "center", color: "#fff" }}>Такой страницы нема)</h1>} />
      </Switch>

      <Snackbar
        open={show}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={() => setShow(false)}
      >
        <Alert onClose={() => setShow(false)} severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Routers;