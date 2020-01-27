import React, { Component } from 'react';
import LineChart from '../../components/LineChart';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { product: { id: 14, name: 'Ginger - Crystalized', category: 'E-Class' } };
  }

  render() {
    const { product } = this.state;
    return (
      <div className="container pt-5">
        <div className="card shadow rounded p-4">
          <h1 style={{ borderBottom: '2px solid #E7E7F5' }}>{product.name}</h1>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, borderRight: '2px solid #E7E7F5', borderBottom: '2px solid #E7E7F5' }}>
              <h5 style={{ paddingLeft: 20 }}>Statistics for last year</h5>
              <LineChart />
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
