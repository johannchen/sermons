/*
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
//import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import gql from 'graphql-tag';

//import {Verses} from '/imports/api/collections';


/*
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
//<LoginButtons visible />
const App = ({verse, refetch, update }) => (
  <div>
    {verse ? (
      <div>
        {verse.title}
        <button onClick={() => refetch()}>Refetch!</button>
        <button onClick={() => update('Ephesian 2')}>Update</button>
      </div>
    ) : 'no verse loaded'}
  </div>
);

App.propTypes = {
  //verseId: React.PropTypes.string.isRequired,
  verse: React.PropTypes.object,
  refetch: React.PropTypes.func,
  update: React.PropTypes.func,
};

/*
const GET_VERSE_DATA = gql`
  query ($id: String!) {
    verse(id: $id) {
      title
    }
  }
`;
const VERSE_DATA = gql`
  query {
    verse {
      _id,
      title
    }
  }
`;

const MUTATE_TITLE = gql`
  mutation updateTitle($title: String!) {
    updateTitle(title: $title) {
      _id,
      title
    }
  }
`;

const withData = graphql(VERSE_DATA, {
  props: ({ data: { error, loading, verse, refetch } }) => {
    if (loading) return { verseLoading: true };
    if (error) return { hasErrors: true };
    return {
      verse,
      refetch,
    };
  },
  /*
  options: (ownProps) => (
    { variables: { id: ownProps.verseId} }
  ),
});

const withMutation = graphql(MUTATE_TITLE, {
  props: ({mutate}) => {
    return {
      update(title) {
        return mutate({variables: {title}});
      },
    };
  },
})

const AppWithData = withData(App);
const AppWithDataAndMutation = withMutation(AppWithData);

// This container brings in Tracker-enabled Meteor data
/*
const AppWithVerseId = createContainer(() => {
  return {
    verseId: Verses.findOne()._id || '',
  };
}, AppWithData);


export default AppWithDataAndMutation;
*/
