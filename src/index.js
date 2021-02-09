import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';


import App from './App';
import client from './graphql/client'
import theme from './theme';


ReactDOM.render(
  <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
          <CssBaseline>
              <App />
          </CssBaseline>
      </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

