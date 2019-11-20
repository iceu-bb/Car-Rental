import React, { useContext, useEffect, useCallback } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Store } from '../Store';

import { MainPage } from '../pages/MainPage';
import { LoginForm } from '../pages/LoginForm';
import { RegisterForm } from '../pages/RegisterForm';
import { UserPanel } from '../pages/UserPanel';
import { OurFleetPage } from '../pages/OurFleetPage';
import { Header } from '../components/Header/index';
import { CarDetail } from '../components/Cars/CarDetail';
import { BookingPage } from '../pages/BookingPage';
import { BookingConfirmation } from '../pages/BookingConfirmation';

export const Router: React.FC = () => {
  const { state, dispatch } = useContext(Store);

  const checkLoginToken = useCallback(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch({ type: 'IS_AUTH', payload: true });
    }
  }, [dispatch]);

  useEffect(() => {
    checkLoginToken();
  }, [checkLoginToken]);

  console.log(state);

  return (
    <BrowserRouter>
      <Header isAuth={state.isAuth}>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/register' component={RegisterForm} />
          <Route exact path='/vehicles' component={OurFleetPage} />
          <Route exact path='/vehicles/:slug' component={CarDetail} />
          <ProtectedRoute exact path='/my-account' component={UserPanel} />
          <Route path='/booking/:stepName' component={BookingPage} />
          <Route
            exact
            path='/booking-confirmation/:bookingNumber'
            component={BookingConfirmation}
          />
        </Switch>
      </Header>
    </BrowserRouter>
  );
};
