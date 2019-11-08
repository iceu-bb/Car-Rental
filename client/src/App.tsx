import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { StoreProvider } from './Store';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';
import { Router } from './routes/Router';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#abcdef' },
    secondary: { main: '#123456' }
  }
});

export const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <StoreProvider>
          <Router />
        </StoreProvider>
      </ApolloProvider>
    </MuiThemeProvider>
  );
};
