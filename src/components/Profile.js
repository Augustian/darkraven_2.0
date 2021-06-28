import React from 'react';
import { Dropdown } from 'react-bootstrap';

class Profile extends React.Component {

  constructor() {
    super();
    this.state = {
      isModerator: 0,
    }
  }
  CheckModerator() {
    var form = new FormData();
    form.append('token', localStorage.getItem("token"));
    fetch('http://site.alwaysdata.net/checkmoderator.php', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        console.log(respons);
        if (respons != null)
          this.setState({ isModerator: respons });
      })
  }

  render() {
    return (
      <Dropdown className="profile">
        <Dropdown.Toggle variant="none" id="dropdown-basic" onMouseDown={() => this.CheckModerator()}><img src={localStorage.getItem("icon")} width={"25px"} height={"25px"} style={{ marginRight: "10px", borderRadius: "10px", objectFit: "cover" }} />{localStorage.getItem("name")}</Dropdown.Toggle>

        <Dropdown.Menu>
          <small style={{ color: "grey" }}>Управление аккаунтом</small>
          {this.state.isModerator == 1 &&
            <div>
              <Dropdown.Item href="/edit-database">Управление базой</Dropdown.Item>
              <Dropdown.Item href="/edit-actors">Управление актерами</Dropdown.Item>
              <Dropdown.Divider />
            </div>}
          <Dropdown.Item href="/watched">Просмотренные</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/" onClick={() => { localStorage.clear() }}>Выход</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
export default Profile;
