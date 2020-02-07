import React, { Component } from 'react';

import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import List from '../../components/List';

import Utils from '../../Database/requestUtils';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [], products: [], compareList: [], querried: [],
    };
    this.filterItems = this.filterItems.bind(this);
    this.addToCompare = this.addToCompare.bind(this);
    this.navigateToProduct = this.navigateToProduct.bind(this);
  }

  componentDidMount() {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'GET',
    };
    Utils.apiCall(Utils.CONFIG.CATEGORIES, params)
      .then((resp) => { this.setState({ categories: resp.categories }); });
  }

  getProducts() {
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

  filterItems(e) {
    const { value } = e.target;
    const { products } = this.state;
    const querried = products.filter((product) => {
      if (product.name.toLowerCase().includes(value.toLowerCase())) {
        return product;
      }
    });
    this.setState({ querried });
  }

  addToCompare(item) {
    this.setState({ compareList: [...this.state.compareList, item], querried: this.state.querried.filter((e) => e.id !== item.id) });
  }

  navigateToProduct(item) {
    const { history } = this.props;
    history.push(`/StatisticsClient/Product/${item.id}`);
  }

  render() {
    const {
      categories, querried, compareList, products,
    } = this.state;
    return (
      <div className="container pt-5">
        <SearchBar changeHandler={this.filterItems} />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'space-between' }}>
          <div
            className="card shadow rounded"
            style={{
              flex: 1, marginRight: 50, height: '80vh',
            }}
          >
            <h2 className="pt-4 pl-4">Categories</h2>
            <div style={{
              height: '78vh', overflow: 'overlay',
            }}
            >
              <List items={categories} />
            </div>
          </div>
          <div className="card shadow rounded" style={{ flex: 4 }}>
            <h2 className="pt-4 pl-4">Products</h2>
            <div
              className="pl-4 pr-4"
              style={{
                height: '70vh', overflow: 'overlay',
              }}
            >
              <Table items={querried} productCallback={(e) => { this.navigateToProduct(e); }} clickCallback={(e) => { this.addToCompare(e); }} renderAction={compareList.length < 2} />
            </div>
          </div>
          <div
            className="card shadow rounded"
            style={{
              flex: 1, marginLeft: 50, height: '80vh',
            }}
          >
            <h2 className="pt-4 pl-4">Comparable products</h2>
            <div style={{
              height: '70vh', overflow: 'overlay',
            }}
            >
              <List items={compareList} />
            </div>
            <button type="button" className="btn btn-default w-75 mr-4 ml-4 mb-2 mt-2">Compare</button>
            <button type="button" className="btn btn-default w-75 mr-4 ml-4 mb-2" onClick={() => { this.setState({ compareList: [], querried: products }); }}>Clear</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
