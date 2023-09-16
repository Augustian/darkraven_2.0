import React, { useEffect, useState } from 'react';
import Header from './Template/Header';
import HeaderMobile from './Template/HeaderMobile';
import Login from './Login';
import Profile from './Profile';
import { Swiper, SwiperSlide } from "swiper/react";
import { getCookie } from "../index";
import { Fade, Slide, useScrollTrigger } from '@mui/material';

const Head = (props) => {

    const [bookMarks, setBookMarks] = useState([]);
    const [sliderPost, setSliderPost] = useState([]);

    const GetSave = () => {
        var form = new FormData();
        form.append('table', localStorage.getItem("token"));
        fetch('http://site.alwaysdata.net/write.php', {
            method: 'POST',
            body: form,
        }).then(res => res.json())
            .then(respons => {
                this.setState({ BookMarks: respons.marks });
            })
    }

    const RemoveSaveBookMark = (id) => {
        var form = new FormData();
        form.append('id', id);
        form.append('table', localStorage.getItem("token"));
        fetch('http://site.alwaysdata.net/remove.php', {
            method: 'POST',
            body: form,
        })
    }

    const GetSliderData = () => {
        fetch('http://site.alwaysdata.net/api/slider.php', {
            method: 'POST',
        }).then(res => res.json())
            .then(respons => {
                setSliderPost(respons);
            })
    }

    const trigger = useScrollTrigger({
        target: undefined,
        disableHysteresis: true,
        threshold: 40,
      });

    useEffect(() => {
        GetSliderData();
    }, [])
    return (
        <>
            <div className="header">
                <h3>Kino <span style={{ backgroundColor: "#ffd700", color: "#262a2d", padding: "0 5px 3px 5px", borderRadius: "5px" }}>Wold</span></h3>
                {getCookie('jwt') == "" && <Login message={props.onMessage} />}
            </div>

            <Header profileShow={trigger} searth={props.Search} type={props.Type} pageSize={props.pageSize} BookMarks={bookMarks} RemoveSaveBookMark={RemoveSaveBookMark} message={props.onMessage} getsave={GetSave} />
            <HeaderMobile searth={props.Search} type={props.Type} pageSize={props.pageSize} BookMarks={bookMarks} RemoveSaveBookMark={RemoveSaveBookMark} message={props.onMessage} getsave={GetSave} />

            <div>
                <Swiper style={{ height: "400px" }} >
                    {sliderPost.map((items, key) =>
                        <SwiperSlide key={key}>
                            <div className="item">
                                <a href={"/video_player/" + items.id_video}>
                                    <div className="carusel_item">
                                        <div className="carusel_background" style={{ backgroundImage: "url(" + items.poster_url + ")" }}></div>
                                        <div className={"carusel_info"}>
                                            <div>
                                                <h2>{items.title}</h2>
                                                <p>{items.description}</p>
                                            </div>
                                            <img src={items.poster_url} style={{ width: "170px" }} />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </>
    );
};

export default Head;