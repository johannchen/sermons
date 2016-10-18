import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {browserHistory} from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from 'megadraft';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';

import {BIBLE} from './constants';

//import {upsertPost} from '/imports/api/methods';
// TODO: autocomplete tag
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: editorStateFromRaw(null),
      tag: '',
      tags: [],
    };
    this.tagStyles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleRequestDeleteTag = this.handleRequestDeleteTag.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.post) {
      this.setState({
        editorState: editorStateFromRaw(JSON.parse(nextProps.post.content)),
        tags: nextProps.post.tags || [],
      });
    }
  }

  onChange(editorState) {
    this.setState({editorState});
  }

  handleAddTag() {
    let {tags, tag} = this.state;
    tags.push(tag);
    this.setState({
      tag: '',
      tags,
    });
  }

  handleRequestDeleteTag(index) {
    let {tags} = this.state;
    tags.splice(tags.indexOf(index), 1);
    this.setState({tags});
  }

  submitForm() {
    const id = this.props.params.id;
    const title = this.refs.title.input.value;
    const scripture = this.refs.scripture.state.searchText;
    const tags = this.state.tags;
    const content = editorStateToJSON(this.state.editorState);
    //upsertPost.call({postId, title, content});
    this.props.submit(id, title, scripture, tags, content).then((res) => {
      //console.log(res);
      if(!res.errors) {
        browserHistory.push(`/posts/${res.data.submitPost._id}`);
        //browserHistory.push('/');
      } else {
        // display errors
        console.log(res.errors);
      }
    });
  }

  render() {
    const {loading, remove} = this.props;
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
          <AutoComplete
            hintText="經文"
            floatingLabelText="經文"
            dataSource={BIBLE}
            searchText={post.scripture}
            ref="scripture"
          />
          <br />
          <TextField
            hintText="加標記"
            floatingLabelText="加標記"
            value={this.state.tag}
            onChange={(e) => this.setState({tag: e.target.value})}
            onKeyDown={
              (e) => e.key === 'Enter' ? this.handleAddTag() : null
            }
          />
          <div style={this.tagStyles.wrapper}>
            {this.state.tags.map((tag, index) => (
              <Chip
                key={index}
                onRequestDelete={() => this.handleRequestDeleteTag(index)}
                style={this.tagStyles.chip}
              >
                {tag}
              </Chip>
            ))}
          </div>

          <br />
          <br />
          <MegadraftEditor
            placeholder="請寫文章"
            editorState={this.state.editorState}
            onChange={this.onChange} />
          <br />
          <RaisedButton label="提交" primary={true} onTouchTap={this.submitForm}/>
          <FlatButton label="取消" onTouchTap={() => browserHistory.push('/')} />
          {post._id ?
            <span>
              <RaisedButton label="刪除" secondary={true} onTouchTap={() => {
                if (confirm("你真的要刪除這篇文章嗎?")) {
                  remove(post._id);
                  browserHistory.push('/');
                }
              }} />
            </span>
          : ''}
          <br />
        </Paper>
      }
      </div>
    );
  }
}

PostForm.propTypes = {
  submit: React.PropTypes.func,
  remove: React.PropTypes.func,
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
  mutation submitPost($id: String, $title: String!, $scripture: String, $tags: [String], $content: String) {
    submitPost(id: $id, title: $title, scripture: $scripture, tags: $tags, content: $content) {
      _id,
      title,
      scripture,
      tags,
      content,
    }
  }
`;

const REMOVE_POST = gql`
  mutation removePost($id: String!) {
    removePost(id: $id)
  }
`;

// ownProps can be passed from router and meteor data
// skip query if no param id
const PostFormWithData = graphql(GET_POST, {
  props: ({data: {loading, post}}) => {
    return {loading, post};
  },
  options: (ownProps) => (
    {
      variables: {id: ownProps.params.id, },
      skip: !ownProps.params.id,
    }
  ),
})(PostForm);

const PostFormWithDataAndSubmit = graphql(SUBMIT_POST, {
  props: ({mutate}) => {
    return {
      submit(id, title, scripture, tags, content) {
        return mutate({variables: {id, title, scripture, tags, content}});
      }
    }
  }
})(PostFormWithData);

const PostFormWithDataAndMutation = graphql(REMOVE_POST, {
  props: ({mutate}) => {
    return {
      remove(id) {
        return mutate({variables: {id}});
      }
    }
  }
})(PostFormWithDataAndSubmit);

export default PostFormWithDataAndMutation;
