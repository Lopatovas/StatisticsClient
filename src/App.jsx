import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Landing from './containers/Landing';
import Product from './containers/Product';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/StatisticsClient/" component={Landing} />
        <Route exact path="/StatisticsClient/Product" component={Product} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
