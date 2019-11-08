import React, { useContext } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';

import { Store } from '../Store';
import { useMeQuery } from '../graphql/types';

export const ProtectedRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}: RouteProps) => {
  const { state, dispatch } = useContext(Store);
  const { data, loading, error } = useMeQuery();
  if (!Component) return <Redirect to='/login' />;

  // If isAuth is true and we have user data, return component

  if (state.isAuth && state.currentUser.email !== '') {
    return (
      <Route
        render={(props: RouteComponentProps) => <Component {...props} />}
        {...rest}
      />
    );
  }

  console.log('p1st step');

  // If isAuth is false(page refreshed or 1st visit) ask server is token is valid

  if (loading) {
    console.log('2st loading null ');
    return null;
  }
  if (data === undefined || error || !data.me) {
    console.log('2st error ');
    return <Redirect to='/login' />;
  }

  console.log('2st step');

  dispatch({ type: 'IS_AUTH', payload: true });
  dispatch({ type: 'LOGIN_USER', payload: data.me });

  return (
    <Route
      render={(props: RouteComponentProps) => <Component {...props} />}
      {...rest}
    />
  );
};
