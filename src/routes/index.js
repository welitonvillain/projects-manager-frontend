import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Activity from '../pages/Activity';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/activities" component={Activity} isPrivate />

      <Route path="/" component={() => <h1>404 - Not Found</h1>} />
    </Switch>
  );
}
