import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Post from './Post';

const PostList = ({loading, posts, refetch}) => {
  return (
    <div>
      { loading ? 'loading' :
        <div>
          {posts ? posts.map(post => <Post key={post._id} post={post} />) : "No post found."}
          <button onClick={() => refetch()}>Refetch!</button>
        </div>
      }
    </div>
  );
}

PostList.propTypes = {
  posts: React.PropTypes.array,
  refetch: React.PropTypes.func,
};

const GET_POSTS_DATA = gql`
  query {
    posts {
      _id,
      title,
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
})(PostList);

export default PostListWithData;
