import React, {Component} from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '/imports/ui/App';
import PostForm from '/imports/ui/PostForm';

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={App}>
          <Route path="/" component={PostForm} />
        </Route>
      </Router>
    );
  }
}
