import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import dotenv from "dotenv";

// dotenv.config();
// const GRAPH_URL = process.env.REACT_APP_ENSURE_APP_BASE_URL;
const GRAPH_URL = "https://ensure-api.dc1.shopsze.com/graphql/";
const httpLink = createHttpLink({ uri: GRAPH_URL });

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default client;
