import { ApolloClient, InMemoryCache } from '@apollo/client';

const space_id = process.env.CONTENTFUL_SPACE_ID;
const environment_id = process.env.CONTENTFUL_ENVIRONMENT;
const access_token = process.env.CONTENTFUL_ACCESS_TOKEN;

const uri = `https://graphql.contentful.com/content/v1/spaces/${space_id}/environments/${environment_id}?access_token=${access_token}`;
const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
});

export default client;
