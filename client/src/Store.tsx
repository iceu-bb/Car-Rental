import React, { createContext, useReducer } from 'react';

import { User } from './graphql/types';

type IState = typeof initialState;

interface IBookingInfo {
  startDay: string;
  returnDay: string;
  startHour: string;
  returnHour: string;
  renterAge: string;
  days: number;
}

interface IBookingCar {
  name: string;
  transmission: string;
}

interface IExtrasItem {
  name: string;
  value: number;
}

type IAction =
  | { type: 'LOGIN_USER'; payload: User }
  | { type: 'IS_AUTH'; payload: boolean }
  | { type: 'SET_TOTAL_DAYS'; payload: number }
  | { type: 'BOOKING_STEP_1'; payload: IBookingInfo }
  | { type: 'BOOKING_STEP_2'; payload: IBookingCar }
  | { type: 'SET_EXTRAS_ITEM_PRICE'; payload: IExtrasItem }
  | { type: 'SET_FULL_COVERAGE'; payload: boolean };

const initialState = {
  currentUser: {
    _id: '',
    name: '',
    email: '',
    role: '',
    createdAt: ''
  } as User,
  isAuth: false,
  step: 3,
  totalDays: 22200,
  fullCoverage: false,
  totalExtras: {
    SCDW: 0,
    WSP: 0,
    TP: 0,
    SAAP: 0,
    GPS: 0,
    Infant: 0,
    Child: 0,
    Booster: 0
  },
  bookingInfo: {
    startDay: '17-12-2019',
    returnDay: '27-12-2019',
    startHour: '10:40',
    returnHour: '20:30',
    renterAge: '25+',
    days: 5
  } as IBookingInfo,
  bookingCar: {} as IBookingCar
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
    case 'SET_TOTAL_DAYS':
      return {
        ...state,
        totalDays: action.payload
      };
    case 'BOOKING_STEP_1':
      return {
        ...state,
        step: 1,
        bookingInfo: action.payload
      };
    case 'BOOKING_STEP_2':
      return {
        ...state,
        step: 2,
        bookingCar: action.payload
      };
    case 'SET_EXTRAS_ITEM_PRICE':
      const { name, value } = action.payload;
      return {
        ...state,
        totalExtras: {
          ...state.totalExtras,
          [name]: value
        }
      };
    case 'SET_FULL_COVERAGE':
      return {
        ...state,
        fullCoverage: action.payload
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
