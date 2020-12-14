import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Header from './Header';
import HeaderMobile from './HeaderMobile';
import Login from './Login';
import Profile from './Profile';

class Head extends React.Component {

    render() {
        let profile;
        if (localStorage.getItem("token")) {
            profile = <Profile />;
        } else {
            profile = <Login message={this.props.onMessage} />;
        }
        return (
            <div>
                <div className="header">
                    <h3>Dark <span style={{ backgroundColor: "#ffd700", color: "#262a2d", padding: "0 5px 3px 5px", borderRadius: "5px" }}>Raven</span></h3>
                    {profile}
                </div>

                <Header searth={this.props.Search} type={this.props.Type} pageSize={this.props.pageSize} BookMarks={this.props.BookMarks} RemoveSaveBookMark={this.props.RemoveSaveBookMark} message={this.props.onMessage} />
                <HeaderMobile searth={this.props.Search} type={this.props.Type} pageSize={this.props.pageSize} BookMarks={this.props.BookMarks} RemoveSaveBookMark={this.props.RemoveSaveBookMark} message={this.props.onMessage} />

                <Carousel style={{ height: "400px" }}>
                    {this.props.SliderPost.map((items, key) =>
                        <Carousel.Item key={key}>
                            <div class="item">
                                <div className="carusel_item">
                                    <div className="carusel_background" style={{ backgroundImage: "url(" + items.photo + ")" }}></div>
                                    <div className={"carusel_info"}><div><Link to={"/video_player?id=" + items.idvideo}><h2>{items.title}</h2></Link><p>{items.discr}</p></div><img src={items.photo} style={{ width: "170px" }} /></div>
                                </div>
                            </div>
                        </Carousel.Item>
                    )}
                </Carousel>
            </div>
        );
    };
}

export default Head;