import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {browserHistory} from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class PostForm extends Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const id = this.props.params.id;
    console.log(id);
    const title = this.refs.title.input.value;
    const content = this.refs.content.getValue();
    this.props.submit(id, title, content).then((res) => {
      console.log(res);
      if(!res.errors) {
        browserHistory.push('/');
      } else {
        // display errors
        console.log(res.errors);
      }
    });
  }

  render() {
    const {loading} = this.props;
    let post = this.props.post || {};
    return (
      <div>
      { loading ? '' :
        <Paper zDepth={3}>
          <TextField hintText="Title" ref="title" defaultValue={post.title} />
          <br />
          <TextField
            ref="content"
            defaultValue={post.content}
            floatingLabelText="Content"
            multiLine={true}
            rows={3}
           />
          <br />
          <RaisedButton label="Submit" primary={true} onTouchTap={this.submitForm}/>
          <br />
        </Paper>
      }
      </div>
    );
  }
}

PostForm.propTypes = {
  submit: React.PropTypes.func,
  post: React.PropTypes.object,
}
// idea: pass post from parent to edit? not good if parent do not have all the fields

// ID type in gql?
const GET_POST = gql`
  query ($id: String!) {
    post(id: $id) {
      _id,
      title,
      content,
    }
  }
`;

const SUBMIT_POST = gql`
  mutation submitPost($id: String, $title: String!, $content: String!) {
    submitPost(id: $id, title: $title, content: $content) {
      _id,
      title,
      content,
    }
  }
`;

// ownProps can be passed from router and meteor data
const PostFormWithData = graphql(GET_POST, {
  props: ({data: {loading, post}}) => {
    return {loading, post};
  },
  options: (ownProps) => (
    {variables: {id: ownProps.params.id}}
  ),
})(PostForm);

const PostFormWithDataAndMutation = graphql(SUBMIT_POST, {
  props: ({mutate}) => {
    return {
      submit(id, title, content) {
        return mutate({variables: {id, title, content}});
      }
    }
  }
})(PostFormWithData);

export default PostFormWithDataAndMutation;
