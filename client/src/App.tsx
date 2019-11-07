import React from 'react';
import { StoreProvider } from './Store';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';
import { Router } from './routes/Router';

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Router />
      </StoreProvider>
    </ApolloProvider>
  );
};
