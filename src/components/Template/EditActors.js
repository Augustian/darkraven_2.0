import React, { useEffect, useState } from 'react';
import "../../styles/EditPage.css";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {
  BrowserRouter as Router,
  Link,
  Redirect
} from "react-router-dom";
import { Button } from '@mui/material';
import { getCookie } from '../..';

const EditActors = (props) => {

  const [data, setData] = useState(null);

  function GetData(id) {
    fetch("http://site.alwaysdata.net/api/get_actor.php", {
      method: 'POST',
      body: JSON.stringify({
        "id": id,
        "jwt": getCookie("jwt"),
      }),
    }).then(res => res.json())
      .then(respons => {
        if (respons.status == 200) {
          setData(respons.info);
        }
      })
  }

  function onSave(id) {
    fetch("http://site.alwaysdata.net/api/create_actor.php", {
      method: 'POST',
      body: JSON.stringify({
        "type": props.meta.match.params.id == "new" ? 1 : 0,
        "id": id,
        "name": data.name,
        "date_of_birth": data.date_of_birth,
        "growth": data.growth,
        "image": data.image,
        "jwt": getCookie("jwt")
      }),
    }).then(res => res.json())
      .then(respons => {
        if (respons.status == 200)
          props.message("Successful");
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setData({
      name: "Имя",
      date_of_birth: "Дата рождения",
      growth: "Рост",
      image: "https://st.kp.yandex.net/images/no-poster.gif"
    });
  }, [])

  useEffect(() => {
    if (props.meta.match.params.id != "new")
      GetData(props.meta.match.params.id);
    window.scrollTo(0, 0);
  }, [props.meta.match.params.id])

  if (data == null) return <div>Загрузка данных....</div>

  return (
    <div className={"central videoview"}>
      <p className="post-slot-button post-slot-buttonview editor-title">
        <input
          placeholder={data.name}
          onChange={(e) => setData(old => ({
            "name": e.target.value,
            "date_of_birth": old.date_of_birth,
            "growth": old.growth,
            "image": old.image
          }))} />
      </p>
      <Button className="ForeverVideo" style={{ top: "-32px" }} onClick={() => onSave(props.meta.match.params.id)}>
        <SaveIcon />
      </Button>
      <img style={{ float: "left", padding: "3px" }} src={data.image} height="200px" width="auto" />
      <input className={"editor-poster"}
        placeholder={data.image}
        onChange={(e) => setData(old => ({
          "name": old.name,
          "date_of_birth": old.date_of_birth,
          "growth": old.growth,
          "image": e.target.value
        }))}
      />
      <div className="info-videoview">
        <p>Дата рождения: <input
          className={"editor-input"}
          placeholder={data.date_of_birth}
          onChange={(e) => setData(old => ({
            "name": old.name,
            "date_of_birth": e.target.value,
            "growth": old.growth,
            "image": old.image
          }))}
        /></p>
        <p>Рост: <input
          className={"editor-input"}
          placeholder={data.growth}
          onChange={(e) => setData(old => ({
            "name": old.name,
            "date_of_birth": old.date_of_birth,
            "growth": e.target.value,
            "image": old.image
          }))} /> м</p>
      </div>
    </div >
  );
};

export default EditActors;