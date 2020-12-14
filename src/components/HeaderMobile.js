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
        this.props.searth(this.props.type, 0, this.props.pageSize, e.value);
    }

    render() {
        return (
            <div>
                <Accordion defaultActiveKey="0" className={"nav_bar mobile-view"}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1"><MenuIcon style={{color: "#FFD700"}}/></Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Link to="/">Главная</Link>
                                <a onClick={() => this.setState({ show: true })}>Избранное</a>
                                <Link to="/top">Рекомендации</Link>
                                <Link to="/films">Фильмы</Link>
                                <Link to="/serials">Сериалы</Link>
                                <Link to="/doramy">Дорамы</Link>
                                <Link to="/anime">Аниме</Link>
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
                    <Modal.Header closeButton style={{backgroundColor: "#171a1f", color: "#FFD700"}}>
                        <Modal.Title id="example-custom-modal-styling-title">Избранное</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor: "#171a1f", color: "#FFD700"}}>
                        {this.props.BookMarks.map((mark, key) =>
                            <div className="book-mark" key={"index=" + key}>
                                <Link to={"/video_player?id=" + mark[2]}>{mark[1]}</Link>
                                <Button
                                    variant="danger"
                                    style={{
                                        position: "absolute",
                                        right: "-50px",
                                        marginLeft: "25px",
                                        padding: "0 3px"
                                    }}
                                    onClick={() => {
                                        this.props.RemoveSaveBookMark(mark[0]);
                                        this.props.message("Успешное удаление: '" + mark[1] + "'");
                                    }}>Удалить</Button>
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
            // <Navbar bg="none" className={"nav_bar mobile-view"} expand="lg" variant="none">

            //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
            //     <Navbar.Collapse id="basic-navbar-nav">
            //         <Nav className="mr-auto">
            //             <Nav.Link href="/">Главная</Nav.Link>
            //             <NavDropdown title="Избранное" id="basic-nav-dropdown" style={{ backgroundColor: "#0c1013" }}>
            //                 {this.props.BookMarks.map((mark, key) =>
            //                     <NavDropdown.Item key={"index=" + key}>
            //                         <Link to={"/video_player/" + mark[2]}>{mark[1]}</Link>
            //                         <Button
            //                             variant="danger"
            //                             style={{
            //                                 position: "absolute",
            //                                 right: "-50px",
            //                                 marginLeft: "25px",
            //                                 padding: "0 3px"
            //                             }}
            //                             onClick={() => {
            //                                 this.props.RemoveSaveBookMark(mark[0]);
            //                                 this.props.message("Успешное удаление: '" + mark[1] + "'");
            //                             }}>Удалить</Button>
            //                     </NavDropdown.Item>
            //                 )}

            //             </NavDropdown>
            //             <Nav.Link href="/top">Рекомендации</Nav.Link>
            //             <Nav.Link href="/films">Фильмы</Nav.Link>
            //             <Nav.Link href="/serials">Сериалы</Nav.Link>
            //             <Nav.Link href="/doramy">Дорамы</Nav.Link>
            //             <Nav.Link href="/anime">Аниме</Nav.Link>
            //         </Nav>

            //         <Formik
            //             onSubmit={this.serath}
            //             initialValues={{
            //                 value: '',
            //             }}
            //         >
            //             {({
            //                 handleSubmit,
            //                 handleChange,
            //                 handleBlur,
            //                 values,
            //                 touched,
            //                 isValid,
            //                 errors,
            //             }) => (
            //                 <Form inline onSubmit={handleSubmit}>
            //                     <Form.Control
            //                         type="text"
            //                         name="value"
            //                         value={values.value}
            //                         onChange={handleChange}
            //                         placeholder="Введите название..."
            //                         className="mr-sm-2" />
            //                     <Button type="submit">Поиск</Button>
            //                 </Form>
            //             )}
            //         </Formik>
            //     </Navbar.Collapse>
            // </Navbar>
        );
    }
}
export default HeaderMobile;