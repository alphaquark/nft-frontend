import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { createHttpLink, ApolloClient, from, InMemoryCache, ApolloProvider } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { rootSaga } from './modules';
import { sagaMiddleware, store } from './store';

import 'react-perfect-scrollbar/dist/css/styles.css';

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
    background: #171734;
    display:flex;
    flex-direction:column;
    flex:1;
    width:100vw;
    height:100vh;
  }
  #root{
    display:flex;
    flex-direction:column;
    flex:1;
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
    uri: 'https://testnets-api.opensea.io/graphql/',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: Boolean(token) ? `JWT ${token}` : '',
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

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <GlobalStyle />
            <App />
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
