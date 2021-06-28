import React from 'react';
import { Card, Accordion, Form, Modal, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import MenuIcon from '@material-ui/icons/Menu';

class HeaderMobile extends React.Component {

    constructor() {
        super();
        this.state = {
            show: false,
        };
    }

    serath = (e) => {
        this.props.searth(0, this.props.pageSize, e.value);
    }

    render() {
        return (
            <div>
                <Accordion defaultActiveKey="0" className={"nav_bar mobile-view"}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1"><MenuIcon style={{ color: "#FFD700" }} /></Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <a href="/">Главная</a>
                                <a onClick={() => { this.props.getsave(); this.setState({ show: true }); }}>Избранное</a>
                                <a href="/top">Рекомендации</a>
                                <a href="/actors">Актеры</a>
                                <a href="/films">Фильмы</a>
                                <a href="/serials">Сериалы</a>
                                <a href="/doramy">Дорамы</a>
                                <a href="/anime">Аниме</a>

                                <Formik
                                    onSubmit={this.serath}
                                    initialValues={{
                                        value: '',
                                    }}
                                >
                                    {({
                                        handleSubmit,
                                        handleChange,
                                        handleBlur,
                                        values,
                                        touched,
                                        isValid,
                                        errors,
                                    }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Control
                                                type="text"
                                                name="value"
                                                value={values.value}
                                                onChange={handleChange}
                                                placeholder="Введите название..."
                                                className="mr-sm-2" />
                                            <Button type="submit" style={{ width: "100%" }}>Поиск</Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Modal
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton style={{ backgroundColor: "#171a1f", color: "#FFD700" }}>
                        <Modal.Title id="example-custom-modal-styling-title">Избранное</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "#171a1f", color: "#FFD700" }}>
                        {this.props.BookMarks.map((mark, key) =>
                            <div className="book-mark" key={"index=" + key}>
                                <a href={"/video_player/" + mark[2]} className="mark-slot">
                                    <h1>{mark[1]}</h1>
                                    <img src={mark[3]} height="70px" />
                                    {mark[4] != 0 && <h2>Отсановились на {mark[4]} серии</h2>}
                                    <Button
                                        variant="danger"
                                        style={{
                                            position: "absolute",
                                            bottom: "0px",
                                            right: "0px",
                                            padding: "0 3px"
                                        }}
                                        onClick={() => {
                                            this.props.RemoveSaveBookMark(mark[0]);
                                            this.props.message("Успешное удаление: '" + mark[1] + "'");
                                        }}>Удалить</Button>
                                </a>
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
export default HeaderMobile;