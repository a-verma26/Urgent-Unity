import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/Modal.scss'; // Import your modal styles

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
