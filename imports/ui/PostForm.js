import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {browserHistory} from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from 'megadraft';

//import {upsertPost} from '/imports/api/methods';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.post) {
      this.setState({
        editorState: editorStateFromRaw(JSON.parse(nextProps.post.content))
      });
    }
  }

  onChange(editorState) {
    this.setState({editorState});
  }

  submitForm() {
    const id = this.props.params.id;
    const title = this.refs.title.input.value;
    const content = editorStateToJSON(this.state.editorState);
    //console.log(this.state.editorState);
    //console.log(content);
    //upsertPost.call({postId, title, content});
    this.props.submit(id, title, content).then((res) => {
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
    const style = {paddingLeft: 60, paddingBottom: 20};
    return (
      <div>
      { loading ? '' :
        <Paper style={style} zDepth={3}>
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            defaultValue={post.title}
            ref="title"
          />
          <br />
          <MegadraftEditor
            placeholder="Please write here, (you can format the text by highlight it)"
            editorState={this.state.editorState}
            onChange={this.onChange} />
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
  mutation submitPost($id: String, $title: String!, $content: String) {
    submitPost(id: $id, title: $title, content: $content) {
      _id,
      title,
      content
    }
  }
`;

// ownProps can be passed from router and meteor data
// skip query if no param id
const PostFormWithData = graphql(GET_POST, {
  props: ({data: {loading, post}}) => {
    return {loading, post};
  },
  options: (ownProps) => (
    {variables: {id: ownProps.params.id, skip: !ownProps.params.id}}
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
