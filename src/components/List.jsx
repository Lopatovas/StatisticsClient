import React from 'react';

function List(props) {
  const { items } = props;
  return (
    <div>
      <ul className="list-group list-group-flush">
        {items.map((item) => (
          <li className="list-group-item list-group-item-action" key={items.id}>{item.name} </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
