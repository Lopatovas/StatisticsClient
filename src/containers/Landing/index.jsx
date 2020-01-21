import React, { Component } from 'react';

import ProductData from '../../mockup/products.json';

import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import List from '../../components/List';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [], products: [], compareList: [], querried: [],
    };
    this.filterItems = this.filterItems.bind(this);
  }

  componentDidMount() {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.setState({ categories: [{ name: 'Prizm' }, { name: 'Eos' }, { name: 'LaCrosse' }, { name: 'Fusion' }] });
  }

  getProducts() {
    this.setState({ products: ProductData, querried: ProductData });
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

  render() {
    const { categories, querried, compareList } = this.state;
    return (
      <div className="container pt-5">
        <SearchBar changeHandler={this.filterItems} />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'space-between' }}>
          <div style={{ flex: 1, marginRight: 50 }}>
            <List items={categories} />
          </div>
          <div style={{ flex: 3 }}>
            <Table items={querried} />
          </div>
          <div style={{ flex: 1, marginLeft: 50 }}>
            <List items={compareList} />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
