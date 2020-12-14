import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, Modal, Form } from 'react-bootstrap';
import { Formik } from 'formik';

class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      loading: false,
      show: false,
      showreg: false,
    };
  }

  onLogin = (values) => {
    console.log('Success:', values);

    var form = new FormData();
    form.append('login', values.login);
    form.append('password', values.password);
    fetch('http://site.alwaysdata.net/login.php', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        if (respons.token != null) {
          console.log(respons);
          localStorage.setItem("token", respons.token);
          localStorage.setItem("name", respons.name);
          localStorage.setItem("icon", respons.icon);
          this.props.message('Успех!');
          window.location.reload();
        } else {
          this.props.message('Не правильный логин или пароль!');
        }
      })
  };

  onRegister = (values) => {
    console.log('Success:', values);

    var form = new FormData();
    form.append('login', values.login);
    form.append('password', values.password);
    form.append('name', values.name);
    fetch('http://site.alwaysdata.net/register.php', {
      method: 'POST',
      body: form,
    })
    this.props.message('Успех!');
    this.setState({ showreg: false });
  };

  showModal = () => { this.setState({ show: true, showreg: false }); };
  showModalreg = () => { this.setState({ showreg: true, show: false}); };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleCloseReg = () => this.setState({ showreg: false });
  handleShowReg = () => this.setState({ showreg: true });

  render() {
    return (
      <div style={{ position: "static" }}>
        <button className="reg" onClick={this.showModalreg}>Регистрация</button>
        <Button type="primary" className="auth" onClick={this.showModal}><ExitToAppIcon style={{ marginRight: "5px", fontSize: "15px", marginTop: "-5px" }} /><span>Войти</span></Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Авторизация</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Formik
              onSubmit={this.onLogin}
              initialValues={{
                login: '',
                password: '',
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
                <Form Validate onSubmit={handleSubmit} >
                  <Form.Row>
                    <Form.Group className={"input-slot-style"}>
                      <Form.Label>Логин</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="login"
                        value={values.login}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className={"input-slot-style"}>
                      <Form.Label>Пароль</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Button type="submit">Войти</Button>
                </Form>
              )}
            </Formik>

          </Modal.Body>
          <Modal.Footer>
            <p style={{ textAlign: "center" }}>Если у вас все еще нет аккаунта, то вы можете его зарегестрировать нажав <a className="link-redirect" onClick={this.showModalreg}>сюда!</a></p>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showreg} onHide={this.handleCloseReg}>
          <Modal.Header closeButton>
            <Modal.Title>Регистрация</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Formik
              onSubmit={this.onRegister}
              initialValues={{
                login: '',
                password: '',
                name: '',
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
                <Form Validate onSubmit={handleSubmit} >
                  <Form.Row>
                    <Form.Group className={"input-slot-style"}>
                      <Form.Label>Логин</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="login"
                        value={values.login}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className={"input-slot-style"}>
                      <Form.Label>Пароль</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className={"input-slot-style"}>
                      <Form.Label>Имя</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Button type="submit">Зарегистрироваться</Button>
                </Form>
              )}
            </Formik>

          </Modal.Body>
          <Modal.Footer>
            <p style={{ textAlign: "center" }}>Если у вас уже есть аккаунт, то вы можете войти нажав <a className="link-redirect" onClick={this.showModal}>сюда!</a></p>
          </Modal.Footer>
        </Modal>

        {/*

              <Modal
                title="Регистрация"
                visible={this.state.visible2}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[]}
              >

                <Form
                  {...this.layout}
                  name="Логин"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.onRegister}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item label="Логин" name="username"
                    rules={[{
                        required: true,
                        message: 'Поле обязательное!',
                      },]}>
                    <Input />
                  </Form.Item>

                  <Form.Item label="Пароль" name="password"
                    rules={[{
                        required: true,
                        message: 'Поле обязательное!',
                      },]}>
                    <Input.Password />
                  </Form.Item>

                  <Form.Item label="Имя" name="name"
                    rules={[{
                        required: true,
                        message: 'Поле обязательное!',
                      },]}>
                    <Input />
                  </Form.Item>

                  <Form.Item {...this.tailLayout}>

                    <Button htmlType="button" onClick={this.handleCancel}>Назад</Button>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={this.handleOk}>Отправить</Button>

                  </Form.Item>
                </Form>

                    </Modal>*/}
      </div>
    );
  }
}

export default Login