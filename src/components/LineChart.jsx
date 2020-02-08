import React from 'react';
import PropTypes from 'prop-types';
import { VictoryChart } from 'victory';

function LineChart(props) {
  const {
    children,
  } = props;

  return (
    <VictoryChart
      padding={{
        top: 20, bottom: 60, left: 60, right: 20,
      }}
      domainPadding={{ x: [10, -10], y: 5 }}
    >
      {children}
    </VictoryChart>
  );
}

LineChart.propTypes = {
  children: PropTypes.node,
};

LineChart.defaultProps = {
  children: <div />,
};

export default LineChart;
