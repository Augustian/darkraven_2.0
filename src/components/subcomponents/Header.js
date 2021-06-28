import React from 'react';
import { Navbar, NavDropdown, Form, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';

class Header extends React.Component {

    constructor() {
        super();
    }
    serath = (e) => {
        this.props.searth(0, this.props.pageSize, e.value);
    }

    render() {
        return (
            <Navbar bg="none" className={"nav_bar pc-view"} expand="md" variant="none">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Главная</Nav.Link>
                        <NavDropdown onClick={() => this.props.getsave()} title="Избранное" id="basic-nav-dropdown" style={{ backgroundColor: "#0c1013", maxHeight: "200px" }}>
                            {this.props.BookMarks.map((mark, key) =>
                                <NavDropdown.Item key={"index=" + key}>
                                    <Link to={"/video_player/" + mark[2]} className="mark-slot">
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
                                    </Link>
                                </NavDropdown.Item>
                            )}

                        </NavDropdown>
                        <Nav.Link href="/top">Рекомендации</Nav.Link>
                        <Nav.Link href="/actors">Актеры</Nav.Link>
                        <Nav.Link href="/films">Фильмы</Nav.Link>
                        <Nav.Link href="/serials">Сериалы</Nav.Link>
                        <Nav.Link href="/doramy">Дорамы</Nav.Link>
                        <Nav.Link href="/anime">Аниме</Nav.Link>
                    </Nav>

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
                            <Form inline onSubmit={handleSubmit}>
                                <Form.Control
                                    type="text"
                                    name="value"
                                    value={values.value}
                                    onChange={handleChange}
                                    placeholder="Введите название..."
                                    className="mr-sm-2" />
                                <Button type="submit">Поиск</Button>
                            </Form>
                        )}
                    </Formik>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;