import React from 'react';

function Table(props) {
  const { items, clickCallback } = props;
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
                    Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                {item.name}
              </td>
              <td>
                {item.category}
              </td>
              <td>
                <button type="button" className="btn btn-default" onClick={() => clickCallback(item)}>Add to compare list</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
