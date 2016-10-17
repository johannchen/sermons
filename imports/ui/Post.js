import React, { Component } from 'react';
import {browserHistory} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {MegadraftEditor, editorStateFromRaw} from 'megadraft';


const Post = ({post}) => (
  <Card>
    <CardTitle
      title={post.title}
    />
    <CardText>
      <MegadraftEditor
        editorState={editorStateFromRaw(JSON.parse(post.content))}
        readOnly={true}
      />
    </CardText>
    <CardActions>
      <FlatButton label="Edit" onTouchTap={
        () => browserHistory.push(`/posts/${post._id}/edit`)
      }/>
      <FlatButton label="Read More" onTouchTap={
        () => browserHistory.push(`/posts/${post._id}`)
      }/>
    </CardActions>
  </Card>
);

Post.propTypes = {
  post: React.PropTypes.object.isRequired
}

export default Post;
