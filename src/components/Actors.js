import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';

class Actors extends React.Component {

    constructor() {
        super();
        this.state = {
            referrer: null,
            Content: [],
            ValuePage: null,
            pageSize: 5,
            page: 1,
        };
    }

    componentDidMount() {
        this.RenderDB(0, this.state.pageSize);
        window.scrollTo(0, 0);
    }

    DeleteFilm(name, id) {
        if (window.confirm("Вы действительно желаете удалить запись о актере, " + name + "?")) {
            var form = new FormData();
            form.append('id', id);
            form.append('token', localStorage.getItem("token"));
            fetch("http://site.alwaysdata.net/deleteactor.php", {
                method: 'POST',
                body: form,
            });
            this.props.message("Успешное удаление: '" + name + "'");
            this.RenderDB(this.state.page, this.state.pageSize);
        }
    }

    RenderDB(Page, pageSize) {
        var form = new FormData();
        form.append('page', Page);
        form.append('pagesize', pageSize);

        fetch("http://site.alwaysdata.net/dbactors.php", {
            method: 'POST',
            body: form,
        }).then(res => res.json())
            .then(respons => {
                this.setState({ Content: respons.actors, ValuePage: respons.length, pageSize: pageSize });
                //console.log(respons);
            })
    }

    render() {
        const data = this.state.Content;
        if (!data) { return <div>Загрузка данных....</div> }

        const { referrer } = this.state;
        if (referrer) return <Redirect to={referrer} />;
        return (
            <Router>
                <div className="central">
                    <Button style={{ width: "100%", margin: "5px 0" }} onClick={() => this.setState({ referrer: "/edaactor/new" })}>Добавить</Button>
                    {this.state.Content.map((post, key) => {
                        if (post.Name != null)
                            return <div key={key} className="post-slot">
                                <Button className="ForeverVideo" onClick={() => { this.setState({ referrer: "/edaactor/" + post.id }) }}>
                                    <Link to={"/edaactor/" + post.id}>
                                        <EditIcon style={{ color: "white" }} />
                                    </Link>
                                </Button>
                                <Button variant="danger" className="ForeverVideo" style={{ marginRight: "60px" }} onClick={() => {this.DeleteFilm(post.Name, post.id);}}>
                                    <DeleteIcon />
                                </Button>
                                <a className="post-slot-button">{post.Name}</a>
                                <img src={post.Image} height="200px" />
                                {post.DateofBirth != null ?
                                    <div className="info_panel">
                                        <p>Дата рождения: {post.DateofBirth}</p>
                                        <p>Рост: {post.Growth} м</p>
                                    </div>
                                    :
                                    <p style={{ color: "white" }}>Нет информации!</p>
                                }
                            </div>
                    })}

                    <Pagination
                        className="pagination"
                        count={Math.ceil(this.state.ValuePage / 5)}
                        page={this.state.page}
                        siblingCount={3}
                        boundaryCount={2}
                        onChange={(event, page) => {
                            this.RenderDB(page - 1, this.state.pageSize);
                            window.scrollTo(0, 0);
                            this.setState({ page: page });
                        }} />
                </div>
            </Router >
        );
    }
}

export default Actors;