import React, { useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Modal, TextField } from '@mui/material';
import { logout, setCookie } from "../index";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showreg, setShowreg] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    fetch('http://site.alwaysdata.net/api/login.php', {
      method: 'POST',
      body: JSON.stringify({
        'email': email,
        'password': password
      }),
    }).then(res => res.json())
      .then(respons => {
        if (respons.token != null) {
          setCookie("jwt", respons.token, 1);
          fetch('http://site.alwaysdata.net/api/validate_token.php', {
            method: 'POST',
            body: JSON.stringify({
              'jwt': respons.token,
            }),
          }).then(e => e.json()).then(v => {
            if (v.message == "Access granted.") {
              localStorage.setItem("name", v.data.name);
              localStorage.setItem("admin", v.data.admin);
              localStorage.setItem("email", v.data.email);
              //localStorage.setItem("icon", v.data.icon);
              //localStorage.setItem("style", v.data.style);
              props.message('Успех!');
            } else {
              logout();
              props.message('Ошибка входа!');
            }
          });
        } else {
          props.message('Не правильный логин или пароль!');
        }
      })
  };

  const onRegister = (e) => {
    e.preventDefault();
    fetch('http://site.alwaysdata.net/api/create_user.php', {
      method: 'POST',
      contentType: 'application/json',
      body: JSON.stringify({
        'email': email,
        'password': password,
        'name': name,
      }),
    }).then(e => e.json()).then(v => {
      if (v.message == "User was created.") {
        props.message('Успех!');
      } else {
        props.message(v.message);
      }
    })
    setShowreg(false);
  };

  const showModal = () => { setShow(true); setShowreg(false) };
  const showModalreg = () => { setShow(false); setShowreg(true) };

  const handleClose = () => setShow(false);

  const handleCloseReg = () => setShowreg(false);

  return (
    <div style={{ position: "static" }}>
      <Button className="reg" color="warning" onClick={() => showModalreg()}>Регистрация</Button>
      <Button color="warning" className="auth" onClick={() => showModal()}>
        <ExitToAppIcon style={{ marginRight: "5px", fontSize: "15px" }} />
        <span>Войти</span>
      </Button>
      <Dialog open={show} onClose={() => handleClose()} maxWidth="xs">
        <DialogTitle>Авторизация</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="login"
            label="Логин"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(v) => setEmail(v.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(v) => setPassword(v.target.value)}
          />
          <Button fullWidth color='secondary' onClick={(e) => onLogin(e)}>Войти</Button>
          <p style={{ textAlign: "center" }}>Если у вас все еще нет аккаунта, то вы можете его зарегестрировать нажав <a className="link-redirect" onClick={() => showModalreg()}>сюда!</a></p>
        </DialogContent>
        {/* <DialogActions>
        </DialogActions> */}
      </Dialog>

      <Dialog open={showreg} onClose={() => handleCloseReg()} maxWidth="xs">
        <DialogTitle >Регистрация</DialogTitle>
        <DialogContent>

          <DialogContentText>
            Зарегистрируйте аккаунт чтобы получить дополнительные возможности сайта, например воспользоваться функцией избанных
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="login"
            label="Логин"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(v) => setEmail(v.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(v) => setPassword(v.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Имя пользователя"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(v) => setName(v.target.value)}
          />
          <Button fullWidth color='secondary' onClick={(e) => onRegister(e)}>Зарегистрироваться</Button>

          <p style={{ textAlign: "center" }}>Если у вас уже есть аккаунт, то вы можете войти нажав <a className="link-redirect" onClick={() => showModal()}>сюда!</a>
          </p>
        </DialogContent>
        {/* <DialogActions>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

export default Login