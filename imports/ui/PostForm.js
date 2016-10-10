import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class PostForm extends Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const title = this.refs.title.input.value;
    const content = this.refs.content.getValue();
    this.props.submit(title, content).then((res) => {
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
    return (
      <div>
        <Paper zDepth={3}>
          <TextField hintText="Title" ref="title" />
          <br />
          <TextField
            ref="content"
            floatingLabelText="Content"
            multiLine={true}
            rows={3}
           />
          <br />
          <RaisedButton label="Submit" primary={true} onTouchTap={this.submitForm}/>
          <br />
        </Paper>
      </div>
    );
  }
}

PostForm.propTypes = {
  submit: React.PropTypes.func,
}

const SUBMIT_POST = gql`
  mutation submitPost($title: String!, $content: String!) {
    submitPost(title: $title, content: $content)
  }
`;

const PostFormWithData = graphql(SUBMIT_POST, {
  props: ({mutate}) => {
    return {
      submit(title, content) {
        return mutate({variables: {title, content}});
      }
    }
  }
})(PostForm);

export default PostFormWithData;
