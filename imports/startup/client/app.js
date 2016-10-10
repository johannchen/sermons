import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
//import { Provider } from 'react-redux';

import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';

// how to config client?
const client = new ApolloClient(meteorClientConfig());

import injectTapEventPlugin from 'react-tap-event-plugin';

//import store from './store';
import Routes from './routes';

/* use redux with apollo?
<Provider store={store}>
</Provider>

*/
const AppRoot = () => (
  <ApolloProvider client={client}>
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
