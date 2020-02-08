/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

function List(props) {
  const { items } = props;
  return (
    <div>
      <ul className="list-group list-group-flush">
        {items.map((item, i) => (
          <li className="list-group-item list-group-item-action" key={i}>
            {typeof item === 'object' ? item.name : item}
            {' '}
          </li>
        ))}
      </ul>
    </div>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
};

List.defaultProps = {
  items: [],
};

export default List;
