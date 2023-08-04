import React, { useState } from 'react';

interface CheckoutModalProps {
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  return (
    <div className="checkout-modal">
      <div className="modal-content">
        <h2>Thank you for purchasing!</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CheckoutModal;
