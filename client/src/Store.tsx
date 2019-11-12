import React, { createContext, useReducer } from 'react';

import { User } from './graphql/types';

type IState = typeof initialState;

type IAction =
  | { type: 'LOGIN_USER'; payload: User }
  | { type: 'IS_AUTH'; payload: boolean };

const initialState = {
  currentUser: {
    _id: '',
    name: '',
    email: '',
    role: '',
    createdAt: ''
  } as User,
  isAuth: false
};

const defaultDispatch: React.Dispatch<IAction> = () => initialState;

export const Store = createContext({
  state: initialState,
  dispatch: defaultDispatch
});

export default function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    case 'IS_AUTH':
      return {
        ...state,
        isAuth: action.payload
      };
    default:
      return state;
  }
}

export const StoreProvider = ({
  children
}: JSX.ElementChildrenAttribute): JSX.Element => {
  const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
    reducer,
    initialState
  );

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
