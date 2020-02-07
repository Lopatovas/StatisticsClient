import React, { Component } from 'react';
import LineChart from '../../components/LineChart';

import Utils from '../../Database/requestUtils';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { product: {}, weekStats: { days: [], sales: [] } };
  }

  componentDidMount() {
    this.getLastWeekStats();
  }

  getProduct() {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'GET',
    };
    Utils.apiCall(Utils.CONFIG.PRODUCTS, params)
      .then((resp) => { this.setState({ products: resp.products, querried: resp.products }); });
  }

  getLastWeekStats() {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'GET',
    };
    Utils.apiCall(`${Utils.CONFIG.LAST_WEEK_STAT}/2`, params)
      .then((resp) => { this.setState({ weekStats: resp }); });
  }

  render() {
    const { product, weekStats } = this.state;
    console.log(this.state);
    return (
      <div className="container pt-5">
        <div className="card shadow rounded p-4">
          <h1 style={{ borderBottom: '2px solid #E7E7F5' }}>{product.name}</h1>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, borderRight: '2px solid #E7E7F5', borderBottom: '2px solid #E7E7F5' }}>
              <h5 style={{ paddingLeft: 20 }}>Statistics for last year</h5>
              <LineChart data={weekStats} />
            </div>
            <div style={{ flex: 1, borderBottom: '2px solid #E7E7F5' }}>
              <h5 style={{ paddingLeft: 20 }}>Statistics for last week</h5>
              <LineChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
};

export default Product;
