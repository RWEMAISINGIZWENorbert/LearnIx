import React from 'react';
import './EmailVerification.css';
import { FaEnvelopeOpen, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import { MdMarkEmailRead } from 'react-icons/md';

export const EmailVerification = () => {
  // This would typically come from props or URL params
  const verificationCode = "847293";
  const userEmail = "user@example.com";

  return (
    <div className='email-verification-page'>
      <div className="verification-container">
        {/* Header Section */}
        <div className="header-section">
          <div className="logo-container">
            <img src={`${import.meta.env.BASE_URL}assets/LearnIx.png`} alt="LearnIX logo" />
            <h1 className="brand-name">LearnIx</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="content-section">
          <div className="icon-wrapper">
            <MdMarkEmailRead className="main-icon" />
          </div>
          
          <h2 className="title">Email Verification</h2>
          <p className="subtitle">Please verify your email address to continue</p>

          {/* Email Info */}
          <div className="email-info">
            <FaEnvelopeOpen className="icon" />
            <span>Verification email sent to: <strong>{userEmail}</strong></span>
          </div>

          {/* Verification Code */}
          <div className="code-section">
            <p className="code-label">Your verification code is:</p>
            <div className="code-display">
              {verificationCode.split('').map((digit, index) => (
                <div key={index} className="code-digit">{digit}</div>
              ))}
            </div>
            <p className="code-description">
              Enter this code on the verification page to confirm your email address
            </p>
          </div>

          {/* Security Warning */}
          <div className="security-warning">
            <div className="warning-header">
              <FaShieldAlt className="icon" />
              <h3>Security Notice</h3>
            </div>
            <ul className="warning-list">
              <li>
                <FaExclamationTriangle className="icon" />
                <span>Never share this verification code with anyone</span>
              </li>
              <li>
                <FaExclamationTriangle className="icon" />
                <span>LearnIx staff will never ask for your verification code</span>
              </li>
              <li>
                <FaExclamationTriangle className="icon" />
                <span>This code will expire in 15 minutes</span>
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <div className="additional-info">
            <p>If you didn't request this verification code, please ignore this email or contact our support team.</p>
            <p className="expiry-notice">This verification code will expire in <strong>15 minutes</strong></p>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-section">
          <p>&copy; 2025 LearnIx. All rights reserved.</p>
          <p className="support-text">Need help? Contact us at support@learnix.com</p>
        </div>
      </div>
    </div>
  );
};
