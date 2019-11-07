import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';

const httpUri = process.env.REACT_APP_SERVER_URL + '/graphql';

const httpLink = new HttpLink({
  uri: httpUri,
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : ''
    }
  };
});

const inMemoryCache = new InMemoryCache();
export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: inMemoryCache
});
