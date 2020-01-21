import React from 'react';

function SearchBar(props) {
  const { changeHandler } = props;
  return (
    <div>
      <div className="form-group">
        <div className="input-group input-group-alternative mb-4">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="ni ni-zoom-split-in" /></span>
          </div>
          <input className="form-control form-control-alternative" placeholder="Search" type="text" onChange={(e) => { changeHandler(e); }} />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
