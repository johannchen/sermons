import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {browserHistory} from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from 'megadraft';

//import {upsertPost} from '/imports/api/methods';
// TODO: auto complete scripture, tags
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
    const scripture = this.refs.scripture.input.value;
    const tags = this.refs.tags.input.value;
    const content = editorStateToJSON(this.state.editorState);
    //upsertPost.call({postId, title, content});
    this.props.submit(id, title, scripture, tags, content).then((res) => {
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
            hintText="標題"
            floatingLabelText="標題"
            defaultValue={post.title}
            ref="title"
          />
          <br />
          <TextField
            hintText="經文"
            floatingLabelText="經文"
            defaultValue={post.scripture}
            ref="scripture"
          />
          <br />
          <TextField
            hintText="標記"
            floatingLabelText="標記"
            defaultValue={post.tags}
            ref="tags"
          />
          <br />
          <MegadraftEditor
            placeholder="請寫文章"
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
      scripture,
      tags,
      content,
    }
  }
`;

const SUBMIT_POST = gql`
  mutation submitPost($id: String, $title: String!, $scripture: String, $tags: String, $content: String) {
    submitPost(id: $id, title: $title, scripture: $scripture, tags: $tags, content: $content) {
      _id,
      title,
      scripture,
      tags,
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
      submit(id, title, scripture, tags, content) {
        return mutate({variables: {id, title, scripture, tags, content}});
      }
    }
  }
})(PostFormWithData);
export default PostFormWithDataAndMutation;
