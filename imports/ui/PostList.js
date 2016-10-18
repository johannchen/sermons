import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import Post from './Post';
import {searchPosts, fetchAllPosts} from './actions';

//TODO: show first paragraph
//TODO: search post, tags, content
const PostList = ({loading, posts, refetch, fetchAll, search, term}) => {
  return (
    <div>
      { loading ?
        <CircularProgress />
        :
        <div>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <RaisedButton label="New Post"
                onTouchTap={
                  () => browserHistory.push("/posts/new")
                } />
              <TextField hintText="Search"
                defaultValue={term}
                onKeyDown={
                  (e) => e.key === 'Enter' ? search({term: e.target.value}) : null
                }/>
              <ToolbarTitle text={`Total: ${posts.length}`} />
            </ToolbarGroup>
            <ToolbarGroup>
              <RaisedButton label="Fetch All" onTouchTap={
                () => {
                  fetchAll();
                  refetch();
                }
              } />
            </ToolbarGroup>
          </Toolbar>
          <div>
            {posts ? posts.map(post => <Post key={post._id} post={post} />) : <p>No post found.</p>}
          </div>
        </div>
      }
    </div>
  );
}

PostList.propTypes = {
  posts: React.PropTypes.array,
  refetch: React.PropTypes.func,
  fetchAll: React.PropTypes.func,
  search: React.PropTypes.func,
  term: React.PropTypes.string,
};

const GET_POSTS_DATA = gql`
  query ($term: String){
    posts(term: $term){
      _id,
      title,
      scripture,
      tags,
      content,
    }
  }
`;

const PostListWithData = graphql(GET_POSTS_DATA, {
  props: ({ data: { loading, posts, refetch } }) => {
    return {
      loading,
      posts,
      refetch,
    };
  },
  //this can omit if prop and variable has the same name
  /*
  options: (ownProps) => (
    {variables: {term: ownProps.term}}
  ),
  */
  options: (ownProps) => {
    return {
      forceFetch: true,
    }
  }
})(PostList);

// connect mapStateToProps, mapDispatchToProps
const PostListWithDataAndState = connect(
  (state) => ({term: state.posts.term}),
  (dispatch) => ({
    search(term) {
      dispatch(searchPosts(term))
    },
    fetchAll() {
      dispatch(fetchAllPosts())
    }
  }),
)(PostListWithData)

export default PostListWithDataAndState;
