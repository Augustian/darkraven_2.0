import { Table } from '@mui/material';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";

class Top extends React.Component {

    constructor() {
        super();
        this.state = {
            TopElements: [],
        };
    }
    componentDidMount() {
        this.GetTop();
    }

    GetTop() {
        fetch('https://kodikapi.com/list?token=9f97924b4aae53e816f330c113b08294&with_material_data=true&translation_type=voice&year=2020&sort=kinopoisk_rating&limit=50', {
            method: 'POST',
        }).then(res => res.json())
            .then(respons => {
                respons.results.map(result => {
                    this.setState(state => {
                        return {
                            TopElements: [...state.TopElements, {
                                poster: result.material_data ?
                                    <img src={result.material_data.poster_url} height="100px" /> :
                                    <img src={"https://st.kp.yandex.net/images/no-poster.gif"} height="100px" />,
                                title: <Link to={"/video_player/" + result.id}>{result.title}</Link>,
                                link: result.link,
                                year: result.year,
                                quality: result.quality,
                                genres: result.material_data ?
                                    result.material_data.genres : null,
                                kinopoisk_rating: result.material_data ?
                                    result.material_data.kinopoisk_rating :
                                    <p>Без оценки</p>
                            }],
                        }
                    })
                })
                console.log("Top: ", this.state.TopElements);
                console.log("Full: ", respons);
            })
    }

    render() {

        return (
            <div className="central">

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Постер</th>
                            <th>Название</th>
                            <th>Год</th>
                            <th>Качество</th>
                            <th>Жанры</th>
                            <th>Рейтинг</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.TopElements.map((post, key) =>
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{post.poster}</td>
                                <td>{post.title}</td>
                                <td>{post.year}</td>
                                <td>{post.quality}</td>
                                <td>{post.genres.map((genres, key) => {
                                    if (genres != null) {
                                        return (
                                            <div key={key} className="Tag">
                                                {genres}
                                            </div>);
                                    } else {
                                        return (<p key={key}>Без распределений по жанрам</p>);
                                    }
                                })}
                                </td>
                                <td>{post.kinopoisk_rating}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Top;