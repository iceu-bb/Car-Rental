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
  _id: string | null | undefined;
  name: string;
  group: string;
  transmission: string;
  upgraded: boolean;
}

interface IRenterInformation {
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber: number;
}

interface Indexed {
  [index: string]: any;
}
interface IndexedNumber {
  [index: string]: number;
}
// repeated in few components
type BookingType = 'location' | 'prepaid' | 'fullCover';

interface IExtrasItem {
  name: string;
  value: number;
}

type IAction =
  | { type: 'LOGIN_USER'; payload: User }
  | { type: 'IS_AUTH'; payload: boolean }
  | { type: 'SET_TOTAL_DAYS'; payload: number }
  | { type: 'SET_BOOKING_STEP'; payload: number }
  | { type: 'SET_BOOKING_NUMBER'; payload: number }
  | { type: 'BOOKING_STEP_2'; payload: IBookingInfo }
  | { type: 'BOOKING_STEP_3'; payload: IBookingCar }
  | { type: 'SET_EXTRAS_ITEM_PRICE'; payload: IExtrasItem }
  | { type: 'CLEAR_EXTRAS' }
  | { type: 'SET_BOOKING_TYPE'; payload: BookingType }
  | { type: 'SET_UPGRADED_CAR'; payload: IBookingCar }
  | { type: 'SET_RENTER_INFORMATION'; payload: IRenterInformation };

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
  bookingType: '',
  bookingNumber: 111,
  totalDays: 22200,
  totalExtras: {
    SCDW: 0,
    WSP: 0,
    TP: 0,
    SAAP: 0,
    GPS: 0,
    Infant: 0,
    Child: 0,
    Booster: 0
  } as IndexedNumber,
  bookingInfo: {
    startDay: '17-12-2019',
    returnDay: '27-12-2019',
    startHour: '10:40',
    returnHour: '20:30',
    renterAge: '25+',
    days: 5
  } as IBookingInfo,
  bookingCar: {
    _id: '5dc71aeb1c9d44000034669d',
    group: 'B',
    transmission: 'Automatic',
    name: 'Polo',
    upgraded: false
  } as IBookingCar,
  renterInformation: {
    firstName: 'Tadek',
    lastName: 'Norek',
    email: '',
    telephoneNumber: 11122
  },
  extrasToGroupRate: {
    A: 1,
    B: 1.1,
    C: 1.2,
    D: 1.4,
    E: 1.75,
    F: 2.1
  } as IndexedNumber
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
    case 'SET_BOOKING_STEP':
      return {
        ...state,
        step: action.payload
      };
    case 'BOOKING_STEP_2':
      return {
        ...state,
        step: 2,
        bookingInfo: action.payload
      };
    case 'BOOKING_STEP_3':
      return {
        ...state,
        step: 3,
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
    case 'CLEAR_EXTRAS':
      return {
        ...state,
        totalExtras: {
          SCDW: 0,
          WSP: 0,
          TP: 0,
          SAAP: 0,
          GPS: 0,
          Infant: 0,
          Child: 0,
          Booster: 0
        }
      };
    case 'SET_BOOKING_TYPE':
      return {
        ...state,
        bookingType: action.payload
      };
    case 'SET_BOOKING_NUMBER':
      return {
        ...state,
        bookingNumber: action.payload
      };
    case 'SET_UPGRADED_CAR':
      // multiply extras coverages prices by new rate
      // iterator because we consider only (0 -4) object properties, the rest is without change because its unit price
      let iterator = 0;
      const tempObj = {} as Indexed;
      for (let extras in state.totalExtras) {
        if (iterator < 4) {
          // we need to take correction becasue when we choose full Cover we make same packages value = 1, we need them to still be 1
          if (state.totalExtras[extras] === 1) {
            tempObj[extras] = 1;
          } else {
            tempObj[extras] = Math.round(
              (state.totalExtras[extras] *
                state.extrasToGroupRate[action.payload.group]) /
                state.extrasToGroupRate[state.bookingCar.group]
            );
          }
        } else tempObj[extras] = state.totalExtras[extras];

        iterator++;
      }

      return {
        ...state,
        totalExtras: { ...tempObj },
        bookingCar: action.payload
      };
    case 'SET_RENTER_INFORMATION':
      return {
        ...state,
        renterInformation: action.payload
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
