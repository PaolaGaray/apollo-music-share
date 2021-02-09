import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://music-share-react.hasura.app/v1/graphql',
  cache: new InMemoryCache()
});

export default client;
