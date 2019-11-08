import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import { MainPage } from '../pages/MainPage';
import { LoginForm } from '../components/Auth/LoginForm';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { UserPanel } from '../pages/UserPanel';
import { Header } from '../components/Header';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/Register' component={RegisterForm} />
        <ProtectedRoute exact path='/my-account' component={UserPanel} />
      </Switch>
    </BrowserRouter>
  );
};
