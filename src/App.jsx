import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Landing from './containers/Landing';
import Product from './containers/Product';

import './assets/css/argon-dashboard.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/Product" component={Product} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
