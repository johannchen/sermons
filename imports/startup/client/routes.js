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
          <Route path="/posts/new" component={PostForm} />
          <Route path="/posts/:id/edit" component={PostForm} />
        </Route>
      </Router>
    );
  }
}
