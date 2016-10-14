import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {MegadraftEditor, editorStateFromRaw} from 'megadraft';

//TODO: style post
const PostDetails = ({loading, post}) => (
  <div>
    {loading ? 'loading' :
      <Card>
        <CardHeader
          title={post.title}
          subtitle={`${post.scripture} ${post.tags}`}
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
        </CardActions>
      </Card>

    }
  </div>
);

PostDetails.propTypes = {
  post: React.PropTypes.object
}

const GET_POST_DATA = gql`
  query ($id: String!){
    post(id: $id) {
      _id,
      title,
      scripture,
      tags,
      content,
    }
  }
`;

const PostWithData = graphql(GET_POST_DATA, {
  props: ({data: {loading, post}}) => {
    return {loading, post};
  },
  options: (ownProps) => (
    {variables: {id: ownProps.params.id}}
  ),
})(PostDetails);

export default PostWithData;
