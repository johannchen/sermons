import React, {Component} from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '/imports/ui/App';
import PostForm from '/imports/ui/PostForm';
import PostList from '/imports/ui/PostList';

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={App}>
          <Route path="/" component={PostList} />
          <Route path="/new" component={PostForm} />
        </Route>
      </Router>
    );
  }
}
