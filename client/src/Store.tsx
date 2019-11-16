import React, { createContext, useReducer } from 'react';

import { User } from './graphql/types';

type IState = typeof initialState;

interface BookingInfo {
  startDay: string;
  returnDay: string;
  startHour: string;
  returnHour: string;
  renterAge: string;
  discountCode: string;
}

type IAction =
  | { type: 'LOGIN_USER'; payload: User }
  | { type: 'IS_AUTH'; payload: boolean }
  | { type: 'BOOKING_STEP_1'; payload: BookingInfo };

const initialState = {
  currentUser: {
    _id: '',
    name: '',
    email: '',
    role: '',
    createdAt: ''
  } as User,
  isAuth: false,
  bookingInfo: {
    startDay: '17-12-2019',
    returnDay: '27-12-2019',
    startHour: '10:40',
    returnHour: '20:30',
    renterAge: '25+'
  } as BookingInfo
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
    case 'BOOKING_STEP_1':
      return {
        ...state,
        bookingInfo: action.payload
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
