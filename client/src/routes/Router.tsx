import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import { MainPage } from '../pages/MainPage';
import { LoginForm } from '../pages/LoginForm';
import { RegisterForm } from '../pages/RegisterForm';
import { UserPanel } from '../pages/UserPanel';
import { OurFleetPage } from '../pages/OurFleetPage';
import { Header } from '../components/Header/index';
import { CarDetail } from '../components/Cars/CarDetail';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/register' component={RegisterForm} />
          <Route exact path='/vehicles' component={OurFleetPage} />
          <Route exact path='/vehicles/:slug' component={CarDetail} />
          <ProtectedRoute exact path='/my-account' component={UserPanel} />
        </Switch>
      </Header>
    </BrowserRouter>
  );
};
