import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import { ThemeProvider } from "@material-tailwind/react";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',

});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation(); // Get the current location

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Navbar />
        <Outlet />
        {location.pathname === '/' && <Footer />} {/* Conditionally render Footer on the home page */}
      </ThemeProvider>
    </ApolloProvider>
  );
}
export default App;
