import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

import Production from './containers/Production/Production';
import Login from './containers/Authentification/Login/Login';
import Registration from './containers/Authentification/Registration/Registration';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/signin" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/logout" component={Production} />
          <Route path="/account" component={Production} />
          <Route path="/" component={Production} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
