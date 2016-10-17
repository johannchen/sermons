import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// how to config client?
const client = new ApolloClient(meteorClientConfig());

import injectTapEventPlugin from 'react-tap-event-plugin';

import Routes from './routes';

import {postReducer} from './reducers';

const store = createStore(
  combineReducers({
    posts: postReducer,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);

const AppRoot = () => (
  <ApolloProvider store={store} client={client}>
    <Routes />
  </ApolloProvider>,
);


Meteor.startup(() => {
  injectTapEventPlugin();
  render(
    <AppRoot />,
    document.getElementById('app')
  );
});
