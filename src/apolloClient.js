import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL,
});

// Middleware untuk menyertakan token JWT jika ada (berguna jika GraphQL butuh auth)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('adminToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // Kebutuhan #5: Apollo Client memiliki caching bawaan
});

export default client;