import React from 'react';
import { Dropdown } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Profile extends React.Component {

  render() {
    return (
      <Dropdown className="profile">
        <Dropdown.Toggle variant="none" id="dropdown-basic"><AccountCircleIcon style={{marginRight: "10px"}}/>{localStorage.getItem("name")}</Dropdown.Toggle>

        <Dropdown.Menu>
          <small>Управление аккаунтом</small>
          <Dropdown.Divider />
          <Dropdown.Item href="/" onClick={()=> alert(localStorage.getItem("token"))}>Get token</Dropdown.Item>
          <Dropdown.Item href="/" onClick={()=>{localStorage.clear()}}>Выход</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
export default Profile;
