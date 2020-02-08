import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { VictoryLine, VictoryLegend } from 'victory';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import List from '../../components/List';
import Modal from '../../components/Modal';
import LineChart from '../../components/LineChart';
import Utils from '../../Database/requestUtils';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [], products: [], compareList: [], querried: [], showModal: false, weekStats: {},
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

  getLastWeekStats(product) {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'GET',
    };
    Utils.apiCall(`${Utils.CONFIG.LAST_WEEK_STAT}/${product.id}`, params)
      .then((resp) => {
        const { weekStats } = this.state;
        weekStats[product.name] = resp.weekSales;
        this.setState({ weekStats });
      });
  }

  filterItems(e) {
    const { value } = e.target;
    const { products } = this.state;
    const querried = products.filter((product) => {
      if (product.name.toLowerCase().includes(value.toLowerCase())) {
        return product;
      }
      return null;
    });
    this.setState({ querried });
  }

  addToCompare(item) {
    const { compareList, querried } = this.state;
    this.setState({
      compareList: [...compareList, item],
      querried: querried.filter((e) => e.id !== item.id),
    });
  }

  navigateToProduct(item) {
    const { history } = this.props;
    history.push(`/StatisticsClient/Product/${item.id}`);
  }

  render() {
    const {
      categories, querried, compareList, products, showModal, weekStats,
    } = this.state;

    const style = {
      data: { stroke: '#c43a31' },
      parent: { border: '1px solid #ccc' },
    };

    const animation = {
      duration: 2000,
      onLoad: { duration: 1000 },
    };
    return (
      <>
        <Modal show={showModal} onClose={() => { this.setState({ showModal: false }); }}>
          <div>
            <h5 style={{ paddingLeft: 20, paddingTop: 20 }}>Statistics for last week sales</h5>
            <LineChart>
              <VictoryLegend
                x={175}
                y={0}
                orientation="horizontal"
                style={{ title: { fontSize: 10 } }}
                data={[
                  { name: compareList[1]?.name, symbol: { fill: '#428bca' } },
                  { name: compareList[0]?.name, symbol: { fill: '#c43a31' } },
                ]}
              />
              <VictoryLine
                style={style}
                animate={animation}
                data={weekStats[compareList[0]?.name]}
                x={(data) => data?.day?.substring(5, data.day.length)}
                y="sales"
                domain={{ y: [0, 10000] }}
              />
              <VictoryLine
                style={{ data: { stroke: '#428bca' } }}
                animate={animation} 
                data={weekStats[compareList[1]?.name]}
                x={(data) => data?.day?.substring(5, data.day.length)}
                y="sales"
              />
            </LineChart>
          </div>
        </Modal>
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
                <Table
                  items={querried}
                  productCallback={(e) => {
                    this.navigateToProduct(e);
                  }}
                  clickCallback={(e) => { this.addToCompare(e); }}
                  renderAction={compareList.length < 2}
                />
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
              {compareList.length > 1 ? <button
                type="button"
                className="btn btn-default w-75 mr-4 ml-4 mb-2 mt-2"
                onClick={() => {
                  this.setState({ showModal: true });
                  compareList.forEach((item) => {
                    this.getLastWeekStats(item);
                  });
                }}
              >
Compare

              </button> : null}
              {compareList.length > 0 ? <button type="button" className="btn btn-default w-75 mr-4 ml-4 mb-2" onClick={() => { this.setState({ compareList: [], querried: products }); }}>Clear</button> : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}

Landing.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default Landing;
