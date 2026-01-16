import React from 'react';
import './Prompt.css';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

export const Prompt = ({ isOpen, onClose, title, message, variant = 'success' }) => {
  if (!isOpen) return null;

  const icon = variant === 'error' ? <FaExclamationTriangle /> : <FaCheckCircle />;

  return (
    <div className="prompt_overlay" onClick={onClose}>
      <div className="prompt_dialog" onClick={(e) => e.stopPropagation()}>
        <div className={`prompt_icon ${variant}`}>
          {icon}
        </div>

        <div className="prompt_content">
          {title ? <h3>{title}</h3> : null}
          {message ? <p>{message}</p> : null}
        </div>

        <div className="prompt_actions">
          <button className={`prompt_ok_btn ${variant}`} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
