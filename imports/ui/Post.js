import React, { Component } from 'react';
import {browserHistory} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Post = ({post}) => (
  <Card>
    <CardHeader
      title={post.title}
    />
    <CardText>
      {post.content}
    </CardText>
    <CardActions>
      <FlatButton label="Edit" onTouchTap={
        () => browserHistory.push(`/posts/${post._id}/edit`)
      }/>
    </CardActions>
  </Card>
);

Post.propTypes = {
  post: React.PropTypes.object.isRequired
}

export default Post;
