import React from 'react';
import { browserHistory } from 'react-router';
//import {Roles} from 'meteor/alanning:roles';

import {green600} from 'material-ui/styles/colors';
//import {orange800} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';

//import MenuRight from './MenuRight';
//import {SITE} from '../helpers/constant';

/*
function goJoinPage() {
  browserHistory.push('/join');
}

function goLoginPage() {
  browserHistory.push('/login');
}
*/

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  goHome() {
    this.handleClose();
    browserHistory.push('/');
  }

  render() {
    //const { currentUser } = this.props;
    let title = "聖言資源中心";
    let bgColor = {};
    return (
      <div id="menu">
        <AppBar
          title={title}
          onTitleTouchTap={this.goHome}
          style={bgColor}
          onLeftIconButtonTouchTap={this.handleOpen.bind(this)}
          iconElementRight={
            <FlatButton label="登錄" />}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.goHome}>書店</MenuItem>
        </Drawer>
      </div>
    );
  }
}

Menu.propTypes = {
  //currentUser: React.PropTypes.object
}

export default Menu;
