import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Cars } from '../components/Cars';
import { Protected } from '../components/Protected';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Cars} />
        <ProtectedRoute path='/protected' component={Protected} />
      </Switch>
    </BrowserRouter>
  );
};
