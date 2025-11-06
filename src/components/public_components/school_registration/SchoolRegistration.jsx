import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SchoolRegistration.css';
import { FaSchool, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight, FaArrowLeft, FaCheckCircle, FaCamera, FaIdCard, FaGlobe, FaUsers } from 'react-icons/fa';
import { MdBusiness } from 'react-icons/md';


import { useDispatch, useSelector } from 'react-redux';
import { 
  registerSchoolNameAndType,
  nextStep,
  selectCurrentStep,
  selectIsLoading,
  selectError,
  selectIsSuccess
} from '../../../features/school/schoolSlice';

export const SchoolRegistration = () => {
  
const dispatch = useDispatch();
const currentSteprSelector = useSelector(selectCurrentStep);
const isLoading = useSelector(selectIsLoading);
const error = useSelector(selectError);
const isSuccess = useSelector(selectIsSuccess);
 

  const [currentStep, setCurrentStep] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolType: '',
    schoolEmail: '',
    schoolPhone: '',
    schoolAddress: '',
    city: '',
    country: '',
    sector: '',
    website: '',
    studentCapacity: '',
    establishedYear: '',
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    verificationCode: ['', '', '', '', '', ''],
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...formData.verificationCode];
      newCode[index] = value;
      setFormData({ ...formData, verificationCode: newCode });
      
      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const steps = [
    { title: 'School Details', icon: <FaSchool /> },
    { title: 'Location', icon: <FaMapMarkerAlt /> },
    { title: 'Contact Info', icon: <FaPhone /> },
    { title: 'Verification', icon: <FaCheckCircle /> },
    { title: 'Password', icon: <FaLock /> },
    { title: 'School Logo', icon: <FaCamera /> }
  ];

  const handleNext =  () => {
    if(currentStep == 0){ 
      try {
      const resultAction =  dispatch(
        registerSchoolNameAndType({
          name: formData.schoolName,
          type: formData.schoolType
        })
      );

      if (registerSchoolNameAndType.fulfilled.match(resultAction)) {
        alert('School registered successfully! Proceeding to the next step.');
        dispatch(nextStep()); // Move to next step
      } else if (registerSchoolNameAndType.rejected.match(resultAction)) {
        // Error is already handled by the slice, but you can show a specific message
        const errorMsg = resultAction.payload?.msg || 'Failed to register school';
        alert(`Error: ${errorMsg}`);
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
    }
    else{
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      alert('School registration successful! Your admin ID (AD001) has been sent to your email.');
      navigate('/login');
    }
  }
    
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };


  const renderStepContent = () => {
    const stepTitle = steps[currentStep]?.title;

    switch (stepTitle) {
      case 'School Details':
        return (
          <div className="step-content">
            <h3>School Information</h3>
            <p className="step-desc">Tell us about your educational institution</p>
            <div className="form-group">
              <label>School Name</label>
              <div className="input-wrapper">
                <FaSchool className="input-icon" />
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  placeholder="Enter your school name"
                  autoFocus
                />
              </div>
            </div>
            <div className="form-group">
              <label>School Type</label>
              <div className="input-wrapper">
                <MdBusiness className="input-icon" />
                <select
                  name="schoolType"
                  value={formData.schoolType}
                  onChange={handleInputChange}
                >
                  <option value="" hidden>Select school type</option>
                  <option value="primary">Primary School</option>
                  <option value="secondary">Secondary School</option>
                  <option value="high">High School</option>
                  <option value="university">University/College</option>
                  <option value="vocational">Vocational Training</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'Location':
        return (
          <div className="step-content">
            <h3>Location Information</h3>
            <p className="step-desc">How can we reach your school?</p>
            <div className="form-group">
              <label>Country</label>
              <div className="input-wrapper">
                <FaGlobe className="input-icon" />
                <input
                  type="email"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="ex : Rwanda, Japan, South Korea,..."
                />
              </div>
            </div>
            <div className="form-group">
              <label>State or Province</label>
              <div className="input-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State or Province"
                />
              </div>
            </div>
            <div className="form-group">
              <label>City</label>
              <div className="input-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Sector</label>
              <div className="input-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  placeholder="Sector"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Website (Optional)</label>
              <div className="input-wrapper">
                <FaGlobe className="input-icon" />
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.yourschool.com"
                />
              </div>
            </div>
          </div>
        );

      case 'Contact Info':
        return (
          <div className="step-content">
            <h3>Contact Information</h3>
            <p className="step-desc">How can we reach your school?</p>
            <div className="form-group">
              <label>School Email</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="schoolEmail"
                  value={formData.schoolEmail}
                  onChange={handleInputChange}
                  placeholder="school@example.com"
                />
              </div>
            </div>
            <div className="form-group">
              <label>School Phone Number</label>
              <div className="input-wrapper">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  name="schoolPhone"
                  value={formData.schoolPhone}
                  onChange={handleInputChange}
                  placeholder="+250 788 123 456"
                />
              </div>
            </div>
          </div>
        );

      case 'Verification':
        return (
          <div className="step-content">
            <h3>Verify Your Account</h3>
            <p className="step-desc">Enter the 6-digit code sent to your email</p>
            <div className="verification-section">
              <p className="verify-label">Email: {formData.adminEmail || formData.schoolEmail}</p>
              <div className="code-inputs">
                {formData.verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="code-input"
                  />
                ))}
              </div>
              <button className="resend-btn">Resend Code</button>
            </div>
          </div>
        );

      case 'Password':
        return (
          <div className="step-content">
            <h3>Create Admin Password</h3>
            <p className="step-desc">Set a strong password for the admin account</p>
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            <div className="password-requirements">
              <p className="req-title">Password must contain:</p>
              <ul>
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
            </div>
          </div>
        );

      case 'School Logo':
        return (
          <div className="step-content">
            <h3>School Logo</h3>
            <p className="step-desc">Upload your school logo (optional)</p>
            <div className="profile-upload">
              <div className="profile-preview">
                {profileImage ? (
                  <img src={profileImage} alt="School Logo" />
                ) : (
                  <div className="placeholder">
                    <FaSchool />
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="logo-upload"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => document.getElementById('logo-upload').click()}
                className="upload-btn"
              >
                <FaCamera /> Choose Logo
              </button>
              <button type="button" onClick={handleNext} className="skip-btn">
                Skip for now
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='school-registration-page'>
      <div className="gradient-bg"></div>
      <div className="school-registration-container">
        {/* Left Side - Branding */}
        <div className="registration-left">
          <Link to="/" className="logo">
            <img src={`${import.meta.env.BASE_URL}assets/LearnIx.png`} alt="LearnIx" />
          </Link>
          <div className="branding-content">
            <h1><span className="learn">Learn</span>Ix</h1>
            <p className="tagline">School Management System</p>
            
            <div className="registration-info">
              <div className="info-card">
                <FaSchool className="info-icon" />
                <h3>Register Your School</h3>
                <p>
                  Join thousands of schools using LearnIx to streamline their operations, 
                  enhance learning experiences, and build better educational environments.
                </p>
              </div>
              
              <div className="benefits-list">
                <h4>What you'll get:</h4>
                <ul>
                  <li>✓ Complete student management system</li>
                  <li>✓ Teacher and staff administration</li>
                  <li>✓ Assignment and grade tracking</li>
                  <li>✓ Communication tools</li>
                  <li>✓ Analytics and reporting</li>
                  <li>✓ Resource management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="registration-right">
          <div className="registration-card">
            {/* Header */}
            <div className="form-header">
              <h2>School Registration</h2>
              <div className="mode-switch">
                <span>Already have an account?</span>
                <Link to="/login">
                  <button>Login</button>
                </Link>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="progress-steps">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                >
                  <div className="step-icon">{step.icon}</div>
                  <span className="step-title">{step.title}</span>
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="form-content">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="form-navigation">
              {currentStep > 0 && (
                <button onClick={handleBack} className="btn-back">
                  <FaArrowLeft /> Back
                </button>
              )}
              <button onClick={handleNext} className="btn-next">
                {isLoading ? (
                  <span>Loading...</span>
                ) : (
                  <>
                  {currentStep === steps.length - 1 ? 'Complete Registration' : 'Next'}
                  <FaArrowRight />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
