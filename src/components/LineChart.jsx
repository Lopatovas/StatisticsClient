import React from 'react';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryLine } from 'victory';

function LineChart(props) {
  const { data, animation, style } = props;
  return (
    <VictoryChart>
      <VictoryLine
        style={style}
        animate={animation}
        data={data}
      />
    </VictoryChart>
  );
}

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  animation: PropTypes.objectOf(PropTypes.oneOfType(PropTypes.number, PropTypes.object)),
  style: PropTypes.objectOf(PropTypes.object),
};

LineChart.defaultProps = {
  data: [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 },
  ],
  animation: {
    duration: 2000,
    onLoad: { duration: 1000 },
  },
  style: {
    data: { stroke: '#c43a31' },
    parent: { border: '1px solid #ccc' },
  },
};

export default LineChart;
