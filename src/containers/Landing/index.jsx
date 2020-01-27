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
    this.addToCompare = this.addToCompare.bind(this);
  }

  componentDidMount() {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.setState({ categories: [{ name: 'Prizm' }, { name: 'Eos' }, { name: 'LaCrosse' }, { name: 'Fusion' }, { name: 'Prizm' }, { name: 'Eos' }, { name: 'LaCrosse' }, { name: 'Fusion' }, { name: 'Prizm' }, { name: 'Eos' }, { name: 'LaCrosse' }, { name: 'Fusion' }, { name: 'Prizm' }, { name: 'Eos' }, { name: 'LaCrosse' }, { name: 'Fusion' }, { name: 'Prizm' }, { name: 'Eos' }, { name: 'LaCrosse' }, { name: 'Fusion' }, { name: 'Prizm' }, { name: 'Eos' }, { name: 'LaCrosse' }, { name: 'Fusion' }] });
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

  addToCompare(item){
    this.setState({ compareList: [...this.state.compareList, item], querried: this.state.querried.filter((e) => e.id !== item.id )});
  }

  render() {
    const { categories, querried, compareList, products } = this.state;
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
            }}>
              <List items={categories} />
            </div>
          </div>
          <div className="card shadow rounded" style={{ flex: 4 }}>
            <h2 className="pt-4 pl-4">Products</h2>
            <div className="pl-4 pr-4" style={{
              height: '70vh', overflow: 'overlay',
            }}>
              <Table items={querried} clickCallback={(e) => {this.addToCompare(e)}}/>
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
            }}>
              <List items={compareList} />
            </div>
            <button type="button" className="btn btn-default w-75 mr-4 ml-4 mb-2 mt-2" >Compare</button>
            <button type="button" className="btn btn-default w-75 mr-4 ml-4 mb-2" onClick={() => {this.setState({compareList: [], querried: products })}}>Clear</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
