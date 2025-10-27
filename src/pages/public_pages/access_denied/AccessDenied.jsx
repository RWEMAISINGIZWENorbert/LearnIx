import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AccessDenied.css';
import { FaLock, FaHome, FaArrowLeft } from 'react-icons/fa';

export const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className='access-denied-page'>
      <div className="gradient-bg"></div>
      <div className="content">
        <div className="icon-container">
          <FaLock className="lock-icon" />
        </div>
        <h1>Access Denied</h1>
        <p className="message">
          You don't have permission to access this page. 
          This area requires specific credentials.
        </p>
        <div className="error-code">Error 403</div>
        <div className="actions">
          <button onClick={() => navigate(-1)} className="btn-back">
            <FaArrowLeft /> Go Back
          </button>
          <Link to="/login" className="btn-login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
