import React from 'react';
import PropTypes from 'prop-types';

function Progress(props) {
  const { label, value } = props;
  const maxValue = 100;
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: 20 }}>
        <h6>{label}</h6>
      </div>
      <div className="progress" style={{ height: '20px', flex: 3 }}>
        <div className="progress-bar" role="progressbar" style={{ width: `${(value * 100) / maxValue}%` }} aria-valuenow={value} aria-valuemin="0" aria-valuemax={maxValue}>{Math.round(value)}</div>
      </div>
    </div>
  );
}

Progress.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
};

Progress.defaultProps = {
  label: [],
  value: 0,
};

export default Progress;
