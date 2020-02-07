import React from 'react';

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

export default List;
