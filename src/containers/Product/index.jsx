import React, { Component } from 'react';
import { VictoryLine, VictoryLegend } from 'victory';
import LineChart from '../../components/LineChart';
import Utils from '../../Database/requestUtils';
import Progress from '../../components/Progress';

class Product extends Component {
  constructor(props) {
    super(props);
    this.productId = props.match.params.id;
    this.state = {
      product: {}, weekStats: [{ day: '', sales: 0 }], yearStats: [{ month: '', sales: 0 }], prediction: {}, regression: [],
    };
  }

  componentDidMount() {
    this.getProduct();
    this.getLastWeekStats();
    this.getLastYearStats();
    this.getPrediction();
    this.getRegression();
  }

  getProduct() {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'GET',
    };
    Utils.apiCall(`${Utils.CONFIG.PRODUCT}/${this.productId}`, params)
      .then((resp) => { this.setState({ product: resp.product }); });
  }

  getLastWeekStats() {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'GET',
    };
    Utils.apiCall(`${Utils.CONFIG.LAST_WEEK_STAT}/${this.productId}`, params)
      .then((resp) => { this.setState({ weekStats: resp.weekSales }); });
  }

  getLastYearStats() {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'GET',
    };
    Utils.apiCall(`${Utils.CONFIG.LAST_YEAR_STAT}/${this.productId}`, params)
      .then((resp) => { this.setState({ yearStats: resp.yearSales }); });
  }

  getPrediction() {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'GET',
    };
    Utils.apiCall(`${Utils.CONFIG.PREDICTIONS}/${this.productId}`, params)
      .then((resp) => { this.setState({ prediction: resp }); });
  }

  getRegression() {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'GET',
    };
    Utils.apiCall(`${Utils.CONFIG.LINEAR_REGRESION}/${this.productId}`, params)
      .then((resp) => { this.setState({ regression: resp.regression }); });
  }

  render() {
    const {
      product, weekStats, yearStats, prediction, regression,
    } = this.state;

    const animation = {
      duration: 2000,
      onLoad: { duration: 1000 },
    };

    const style = {
      data: { stroke: '#c43a31' },
      parent: { border: '1px solid #ccc' },
    };
    return (
      <div className="container pt-5">
        <div className="card shadow rounded p-4">
          <h1 style={{ borderBottom: '2px solid #E7E7F5' }}>{product.name}</h1>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, borderRight: '2px solid #E7E7F5', borderBottom: '2px solid #E7E7F5' }}>
              <h5 style={{ paddingLeft: 20 }}>Statistics for last year</h5>
              <LineChart>
                <VictoryLegend
                  x={100}
                  y={0}
                  orientation="horizontal"
                  style={{ title: { fontSize: 10 } }}
                  data={[
                    { name: 'Linear regression', symbol: { fill: '#428bca' } },
                    { name: 'Actual sales', symbol: { fill: '#c43a31' } },
                  ]}
                />
                <VictoryLine
                  style={style}
                  animate={animation}
                  data={yearStats}
                  x={(data) => data.month.substring(5, data.month.length)}
                  y="sales"
                />
                <VictoryLine
                  style={{ data: { stroke: '#428bca' } }}
                  animate={animation}
                  data={regression}
                  x={(data) => data.month.substring(5, data.month.length)}
                  y="regression"
                />
              </LineChart>
            </div>
            <div style={{ flex: 1, borderBottom: '2px solid #E7E7F5' }}>
              <h5 style={{ paddingLeft: 20 }}>Statistics for last week</h5>
              <LineChart>
                <VictoryLine
                  style={style}
                  animate={animation}
                  data={weekStats}
                  x={(data) => data.day.substring(5, data.day.length)}
                  y="sales"
                />
              </LineChart>
            </div>
          </div>
          <div>
            <div>
              <h5 style={{ paddingLeft: 20, paddingTop: 20 }}>Predicted sales</h5>
            </div>
            <div style={{ paddingLeft: 20, paddingTop: 20 }}>
              <Progress label="Sales at same time last year" value={prediction.yearBeforeSales} />
              <Progress label="Sales three months ago" value={prediction.salesThreeMonthsBefore} />
              <Progress label="Sales two months ago" value={prediction.salesTwoMonthsBefore} />
              <Progress label="Sales a month ago" value={prediction.salesMonthBefore} />
              <Progress label="Sales predicted by linear regression" value={prediction.linearRegressionPrediction} />
              <Progress label="Final prediction for next month" value={prediction.finalPrediction} />
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
