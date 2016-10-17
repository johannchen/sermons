import React, { Component } from 'react';
import {browserHistory} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {MegadraftEditor, editorStateFromRaw} from 'megadraft';


/*
<MegadraftEditor
  editorState={editorStateFromRaw(JSON.parse(post.content))}
  readOnly={true}
/>
*/
const Post = ({post}) => (
  <Card>
    <CardTitle
      title={post.title}
    />
    <CardText>
      <p>{JSON.parse(post.content).blocks[0].text}</p>
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
