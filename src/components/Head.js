import React from 'react';
import { Carousel } from 'react-bootstrap';
import Header from './subcomponents/Header';
import HeaderMobile from './subcomponents/HeaderMobile';
import Login from './Login';
import Profile from './Profile';

class Head extends React.Component {

    constructor() {
        super();

        this.state = {
            BookMarks: [],
            SliderPost: [],
        }
        this.GetSave = this.GetSave.bind(this);
    }

    componentDidMount() {
        this.GetSliderData();
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

    GetSliderData() {
        fetch('http://site.alwaysdata.net/headslider.php', {
            method: 'POST',
        }).then(res => res.json())
            .then(respons => {
                this.setState({ SliderPost: respons.posts });
            })
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h3>Dark <span style={{ backgroundColor: "#ffd700", color: "#262a2d", padding: "0 5px 3px 5px", borderRadius: "5px" }}>Raven</span></h3>
                    {localStorage.getItem("token") != null ? <Profile /> : <Login message={this.props.onMessage} />}
                </div>

                <Header searth={this.props.Search} type={this.props.Type} pageSize={this.props.pageSize} BookMarks={this.state.BookMarks} RemoveSaveBookMark={this.RemoveSaveBookMark} message={this.props.onMessage} getsave={this.GetSave} />
                <HeaderMobile searth={this.props.Search} type={this.props.Type} pageSize={this.props.pageSize} BookMarks={this.state.BookMarks} RemoveSaveBookMark={this.RemoveSaveBookMark} message={this.props.onMessage} getsave={this.GetSave} />

                <Carousel style={{ height: "400px" }}>
                    {this.state.SliderPost.map((items, key) =>
                        <Carousel.Item key={key}>
                            <div class="item">
                                <a href={"/video_player/" + items.idvideo}>
                                    <div className="carusel_item">
                                        <div className="carusel_background" style={{ backgroundImage: "url(" + items.photo + ")" }}></div>
                                        <div className={"carusel_info"}><div><h2>{items.title}</h2><p>{items.discr}</p></div><img src={items.photo} style={{ width: "170px" }} /></div>
                                    </div>
                                </a>
                            </div>
                        </Carousel.Item>
                    )}
                </Carousel>
            </div>
        );
    };
}

export default Head;