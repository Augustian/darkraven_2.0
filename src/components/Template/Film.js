import { Favorite, FavoriteBorder, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Film = ({ data, SetSave, addWatched, message }) => {
    const [viewed, setViewed] = useState(false);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        setViewed(data.id_viewed == null ? false : true);
        setFavorite(data.id_favorite == null ? false : true);

        console.log(data)
    }, [])
    return (
        <div className="post-slot">
            <div className="action_panel">
                <div style={{ flex: 1 }}>
                    <NavLink className="post-slot-button" to={"/video_player/" + data.id_video}><p>{data.title} ({data.year})</p></NavLink>
                    <NavLink className="post-slot-button original-title" to={"/video_player/" + data.id_video}><p>{data.title_en}</p></NavLink>
                </div>
                <ButtonGroup variant="outlined" style={{ margin: 5 }}>
                    <Tooltip title={favorite ? "В избранных" : "Добавить в избранное"}>
                        <Button color="secondary" onClick={() => {
                            if (localStorage.getItem("name")) {
                                SetSave(data.id_video, setFavorite);
                            } else { message('Эта функция доступна только авторизованным лицам!'); }
                        }}>
                            {favorite ? <Favorite /> : <FavoriteBorder />}
                        </Button>
                    </Tooltip>
                    <Tooltip title={viewed ? "В просмотренные" : "Добавить в просмотренные"}>
                        <Button color={!viewed ? "info" : "success"} onClick={() => {
                            if (localStorage.getItem("name")) {
                                addWatched(data.id_video, setViewed);
                                message(!viewed ? 'Вы пометили видео запись просмотренной.' : 'Вы пометили видео запись не просмотренной.');
                            } else { message('Эта функция доступна только авторизованным лицам!'); }
                        }}>
                            {viewed ? <Visibility /> : <VisibilityOff />}
                        </Button>
                    </Tooltip>
                </ButtonGroup>
            </div>
            <div className="flex_block">
                <img src={data.poster_url} />
                {data.year != null ?
                    <div className="info_panel">
                        <p>Год: {data.year}</p>
                        <p>Страна: {data.countries}</p>
                        <p>Жанры: {data.genres}</p>
                        <p>Продолжительность: {data.duration} мин.</p>
                        <br />
                        <p>{data.discription != null && data.discription}</p>
                        {data.kinopoisk_rating > 0 && <p className="kino_poisk">КиноПоиск: {data.kinopoisk_rating}</p>}
                        {data.imdb_rating > 0 && <p className="imdb">Imdb: {data.imdb_rating}</p>}
                        <p className="quality">{data.quality}</p>
                    </div>
                    :
                    <p style={{ color: "white" }}>Нет информации!</p>}
            </div>
        </div>
    )
}

export default Film;