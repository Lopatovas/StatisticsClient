import React from 'react';

function Table(props) {
  const {
    items, clickCallback, productCallback, renderAction,
  } = props;
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">
                    Name
            </th>
            <th scope="col">
                    Category
            </th>
            <th scope="col">
                    Price
            </th>
            <th scope="col">
                    Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} onClick={() => { productCallback(item); }}>
              <td>
                {item.name}
              </td>
              <td>
                {item.type}
              </td>
              <td>
                {item.price}
              </td>
              {renderAction ? (
                <td>
                  <button type="button" className="btn btn-default btn-sm" onClick={(e) => { e.stopPropagation(); clickCallback(item); }}>Compare</button>
                </td>
              ) : <td />}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
