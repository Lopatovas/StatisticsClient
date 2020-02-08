/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

function Modal(props) {
  const { children, onClose, show } = props;

  const onCloseModal = (e) => {
    onClose(e);
  };

  if (!show) {
    return null;
  }

  return (
    <div style={{
      position: 'absolute', zIndex: 999, width: '100%', height: '100%', backgroundColor: '#F5F5F5C0',
    }}
    >
      <div style={{
        margin: 'auto',
        width: 600,
        height: 500,
        backgroundColor: '#FFF',
        marginTop: 100,
        boxShadow: '10px 10px 10px #888888',
      }}
      >
        <div style={{ float: 'right', marginTop: 5, marginRight: 5 }}>
          <button className="btn btn-default btn-sm" onClick={(e) => { onCloseModal(e); }} type="button">
        X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  show: PropTypes.bool,
};

Modal.defaultProps = {
  children: null,
  onClose: () => {},
  show: false,
};

export default Modal;
