import React from 'react';
import './DeleteConfirmation.css';
import { FaExclamationTriangle } from 'react-icons/fa';

export const DeleteConfirmation = ({ isOpen, onClose, onConfirm, itemName, itemType = 'item' }) => {
  if (!isOpen) return null;

  return (
    <div className="delete_confirmation_overlay" onClick={onClose}>
      <div className="delete_confirmation_dialog" onClick={(e) => e.stopPropagation()}>
        <div className="delete_confirmation_icon">
          <FaExclamationTriangle />
        </div>
        
        <div className="delete_confirmation_content">
          <h3>Delete {itemType}?</h3>
          <p>
            Are you sure you want to delete <strong>"{itemName}"</strong>?
          </p>
          <p className="delete_warning">
            This action cannot be undone.
          </p>
        </div>

        <div className="delete_confirmation_actions">
          <button className="delete_cancel_btn" onClick={onClose}>
            Cancel
          </button>
          <button className="delete_confirm_btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
