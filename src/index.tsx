import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { createHttpLink, ApolloClient, from, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { render } from 'react-dom';
import * as dotenv from 'dotenv';
import { Provider } from 'react-redux';

import { App } from './App';
import { reportWebVitals } from './reportWebVitals';
import { rootSaga } from './modules';
import { sagaMiddleware, store } from './store';
import 'react-perfect-scrollbar/dist/css/styles.css';

dotenv.config();

export const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Roboto");
  @keyframes marquee-scroll {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-50%);
  }
}
.ps__rail-x{
  background: #efefef!important;
  opacity:1!important;
  height:4px!important;
  display:block!important;
  width:100%!important;

}
.ps__thumb-x{
  height:4px!important;
  background:#5D63FF!important;
  bottom:0!important;
  cursor:pointer;

}
  ${normalize}
  html, body{
    display:flex;
    flex-direction:column;
    flex:1;
    width:100%;
    height:100%;
    background: #5122c4;
  }
  #root{
    display:flex;
    flex-direction:column;
    flex:1;
    background: #5122c4;
    -webkit-box-shadow: inset 0px -20px 500px 20px rgba(0, 0, 0, 0.4);
    box-shadow: inset 0px -20px 500px 20px rgba(0, 0, 0, 0.4);
    background-position: center bottom;
    background-repeat: no-repeat;
  }
  body > * {
    all: unset;
  }
  * {
      font-family: 'Roboto';
      list-style:none;
      margin:0;
      padding:0;
      box-sizing: border-box;
  }
`;

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GQL_API,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: Boolean(token) ? `JWT ${token}` : '',
            'X-API-KEY': '11671121b01f4beb9317229a88785834',
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`)
        );
    }

    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

const httpAuthLink = authLink.concat(httpLink);

export const client = new ApolloClient({
    link: from([errorLink, httpAuthLink]),
    cache: new InMemoryCache(),
});

sagaMiddleware.run(rootSaga);

render(
    // <ApolloProvider client={client}>
    <Provider store={store}>
        <GlobalStyle />
        <App />
    </Provider>,
    // </ApolloProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
