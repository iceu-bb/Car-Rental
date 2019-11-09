import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import { MainPage } from '../pages/MainPage';
import { LoginForm } from '../pages/LoginForm';
import { RegisterForm } from '../pages/RegisterForm';
import { UserPanel } from '../pages/UserPanel';
import { Header } from '../components/Header/index';
import { Cars } from '../components/Cars';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/fleet' component={Cars} />
          <ProtectedRoute path='/my-account' component={UserPanel} />
        </Switch>
      </Header>
    </BrowserRouter>
  );
};
