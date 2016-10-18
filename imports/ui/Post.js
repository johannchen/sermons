import React, { Component } from 'react';
import {browserHistory} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Post = ({post}) => (
  <Card>
    <CardTitle
      title={post.title}
      subtitle={`${post.scripture} ${post.tags}`}
    />
    <CardText>
      <p>{JSON.parse(post.content).blocks[0].text}</p>
    </CardText>
    <CardActions>
      <FlatButton label="修改" onTouchTap={
        () => browserHistory.push(`/posts/${post._id}/edit`)
      }/>
      <FlatButton label="閱讀全文" onTouchTap={
        () => browserHistory.push(`/posts/${post._id}`)
      }/>
    </CardActions>
  </Card>
);

Post.propTypes = {
  post: React.PropTypes.object.isRequired
}

export default Post;
