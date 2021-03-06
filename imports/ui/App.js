import React from 'react';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Menu from './Menu';

export default class App extends React.Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(lightBaseTheme)};
  }

  render() {
    return (
      <div>
        <Menu />
        {this.props.children}
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

App.propTypes = {
}
