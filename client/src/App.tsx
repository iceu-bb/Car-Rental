import React, { useContext, useReducer } from 'react';
import { Cars } from './components/Cars';

import Context from './context';
import reducer from './reducer';

import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';

export const App: React.FC = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <ApolloProvider client={client}>
      // @ts-ignore
      <Context.Provider value={{ state, dispatch }}>
        <div>
          Hello
          <Cars />
        </div>
      </Context.Provider>
    </ApolloProvider>
  );
};
