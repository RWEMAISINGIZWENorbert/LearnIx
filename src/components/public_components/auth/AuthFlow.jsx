import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AuthFlow.css';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaIdCard, FaSchool, FaArrowRight, FaArrowLeft, FaCheckCircle, FaCamera } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';
import {
  registerPersonalInfo,
  verifyOtp,
  confirmPassword,
  login,
  clearError,
  clearSuccess,
  selectLoading,
  selectError,
  selectSuccessMessage,
  selectIsAuthenticated,
  selectUser,
  selectRole,
  selectRegistrationStep,
} from '../../../features/auth/authSlice';

export const AuthFlow = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const successMessage = useSelector(selectSuccessMessage);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const role = useSelector(selectRole);
  const registrationStep = useSelector(selectRegistrationStep);

  // Local state
  const [isLogin, setIsLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    email: '',
    phone: '',
    school: '',
    department: '',
    guardianName: '',
    guardianPhone: '',
    verificationCode: ['', '', '', ''],
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  // School codes mapping
  const schoolCodes = {
    'GHA': 'Green Hills Academy',
    'RHS': 'Riviera High School',
    'KIS': 'Kigali International School'
  };

  // Department codes mapping
  const deptCodes = {
    'SOD': 'Software Development',
    'NET': 'Networking',
    'ICT': 'ICT',
    'BUS': 'Business',
    'ENG': 'Engineering'
  };

  // Detect user type, school, and department from ID
  useEffect(() => {
    const userId = formData.userId.toUpperCase();
    
    if (userId.startsWith('STU')) {
      setUserType('student');
      // Extract school code (3 letters after STU)
      const schoolCode = userId.substring(3, 6);
      const detectedSchool = schoolCodes[schoolCode];
      
      // Extract department code (3 letters after school code)
      const deptCode = userId.substring(6, 9);
      const detectedDept = deptCodes[deptCode];
      
      if (detectedSchool) {
        setFormData(prev => ({ ...prev, school: detectedSchool }));
      }
      if (detectedDept) {
        setFormData(prev => ({ ...prev, department: detectedDept }));
      }
    } else if (userId.startsWith('TR')) {
      setUserType('teacher');
      // Extract school code (3 letters after TR)
      const schoolCode = userId.substring(2, 5);
      const detectedSchool = schoolCodes[schoolCode];
      
      // Extract department code
      const deptCode = userId.substring(5, 8);
      const detectedDept = deptCodes[deptCode];
      
      if (detectedSchool) {
        setFormData(prev => ({ ...prev, school: detectedSchool }));
      }
      if (detectedDept) {
        setFormData(prev => ({ ...prev, department: detectedDept }));
      }
    } else if (userId.startsWith('AD')) {
      setUserType('admin');
    } else {
      setUserType('');
    }
  }, [formData.userId]);

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
      if (value && index < 3) {
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

  const getSteps = () => {
    if (isLogin) {
      return [
        { title: 'Email', icon: <FaEnvelope /> },
        { title: 'Password', icon: <FaLock /> }
      ];
    }
    
    const baseSteps = [
      { title: 'User ID', icon: <FaIdCard /> },
      { title: 'Personal Info', icon: <MdPerson /> }
    ];

    if (userType === 'student') {
      return [
        ...baseSteps,
        { title: 'Guardian Info', icon: <FaUser /> },
        { title: 'Verification', icon: <FaCheckCircle /> },
        { title: 'Password', icon: <FaLock /> },
        { title: 'Profile Photo', icon: <FaCamera /> }
      ];
    } else if (userType === 'teacher') {
      return [
        ...baseSteps,
        { title: 'Verification', icon: <FaCheckCircle /> },
        { title: 'Password', icon: <FaLock /> },
        { title: 'Profile Photo', icon: <FaCamera /> }
      ];
    } else if (userType === 'admin') {
      return [
        ...baseSteps,
        { title: 'Verification', icon: <FaCheckCircle /> },
        { title: 'Password', icon: <FaLock /> },
        { title: 'Profile Photo', icon: <FaCamera /> }
      ];
    }
    
    return baseSteps;
  };

  const steps = getSteps();

  // Clear errors when switching between login/register
  useEffect(() => {
    dispatch(clearError());
    dispatch(clearSuccess());
  }, [isLogin, dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
     console.log('isAuthenticated', isAuthenticated);
     console.log('user', user);
     console.log('role', role);
    if (isAuthenticated && user) {
      if (role === 'student') navigate('/student/dashboard');
      else if (role === 'teacher') navigate('/teacher/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
    }
  }, [isAuthenticated, user, role, navigate]);

  // Handle successful registration step progression
  useEffect(() => {
    if (registrationStep === 'otp_verification' && !isLogin) {
      // Move to verification step after successful personal info registration
      const verificationStepIndex = steps.findIndex(s => s.title === 'Verification');
      if (verificationStepIndex !== -1) {
        setCurrentStep(verificationStepIndex);
      }
    }
  }, [registrationStep, isLogin, steps]);

  // Show error messages as popup alerts
  useEffect(() => {
    if (error && error.msg) {
      alert(error.msg);
      // Clear error after showing
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Show success messages as popup alerts
  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      // Clear success message after showing
      dispatch(clearSuccess());
    }
  }, [successMessage, dispatch]);

  const handleNext = async () => {
    const stepTitle = steps[currentStep]?.title;

    // Clear previous errors
    dispatch(clearError());

    // LOGIN FLOW
    if (isLogin) {
      if (currentStep === 0) {
        // Email step - just move to next
        if (!formData.email) {
          alert('Please enter your email');
          return;
        }
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 1) {
        // Password step - Call login API
        if (!formData.password) {
          alert('Please enter your password');
          return;
        }

        const result = await dispatch(login({
          email: formData.email,
          password: formData.password
        }));

        if (login.fulfilled.match(result)) {
          // Login successful - redirect handled by useEffect
          console.log('Login successful');
        }
        // Error will be displayed from Redux state
      }
      return;
    }

    // REGISTRATION FLOW
    switch (stepTitle) {
      case 'User ID':
        // Step 0 - Validate User ID
        if (!formData.userId || !userType) {
          alert('Please enter a valid user ID');
          return;
        }
        setCurrentStep(currentStep + 1);
        break;

      case 'Personal Info':
        // Step 1 - Call registerPersonalInfo API
        if (!formData.fullName || !formData.email || !formData.phone) {
          alert('Please fill all required fields');
          return;
        }

        const result = dispatch(registerPersonalInfo({
          code: formData.userId,
          name: formData.fullName,
          email: formData.email,
          tel: formData.phone
        }));

        if (registerPersonalInfo.fulfilled.match(result)) {
          // Success - OTP sent, will move to verification step via useEffect
          console.log('Personal info registered, OTP sent');
        }
        // Error will be displayed from Redux state
        break;

      case 'Guardian Info':
        // Step 2 (Students only) - Just validate and move forward
        if (!formData.guardianName || !formData.guardianPhone) {
          alert('Please fill guardian information');
          return;
        }
        setCurrentStep(currentStep + 1);
        break;

      case 'Verification':
        // Step 3 - Call verifyOtp API
        const otpCode = formData.verificationCode.join('');
        if (otpCode.length !== 4) {
          alert('Please enter the complete 4-digit verification code');
          return;
        }

        const verifyResult = await dispatch(verifyOtp({ otp: otpCode }));

        if (verifyOtp.fulfilled.match(verifyResult)) {
          // OTP verified successfully
          console.log('OTP verified successfully');
          setCurrentStep(currentStep + 1);
        }
        // Error will be displayed from Redux state
        break;

      case 'Password':
        // Step 4 - Call confirmPassword API
        if (!formData.password || !formData.confirmPassword) {
          alert('Please enter and confirm your password');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        if (formData.password.length < 6) {
          alert('Password must be at least 6 characters');
          return;
        }

        const passwordResult = await dispatch(confirmPassword({
          password: formData.password,
          cPassword: formData.confirmPassword
        }));

        if (confirmPassword.fulfilled.match(passwordResult)) {
          // Password confirmed successfully - account created
          console.log('Password confirmed, account created');
          
          // Show success message and redirect to login
          setTimeout(() => {
            setIsLogin(true);
            setCurrentStep(0);
            // Reset form but keep email for login
            setFormData({
              userId: '',
              fullName: '',
              email: formData.email,
              phone: '',
              school: '',
              department: '',
              guardianName: '',
              guardianPhone: '',
              verificationCode: ['', '', '', ''],
              password: '',
              confirmPassword: ''
            });
          }, 500);
        }
        // Error will be displayed from Redux state
        break;

      case 'Profile Photo':
        // Final step - Complete registration
        alert('Registration completed successfully! Please login.');
        setIsLogin(true);
        setCurrentStep(0);
        // Reset form
        setFormData({
          userId: '',
          fullName: '',
          email: '',
          phone: '',
          school: '',
          department: '',
          guardianName: '',
          guardianPhone: '',
          verificationCode: ['', '', '', ''],
          password: '',
          confirmPassword: ''
        });
        break;

      default:
        // Default behavior - move to next step
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
        break;
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRoleLabel = () => {
    switch (userType) {
      case 'student': return '👨‍🎓 Student';
      case 'teacher': return '👨‍🏫 Teacher';
      case 'admin': return '👨‍💼 Admin';
      default: return 'User';
    }
  };

  const renderStepContent = () => {
    const stepTitle = steps[currentStep]?.title;

    if (isLogin) {
      if (currentStep === 0) {
        return (
          <div className="step-content">
            <h3>Enter Your Email</h3>
            <p className="step-desc">Use your registered email to access your account</p>
            <div className="form-group">
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  autoFocus
                />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="step-content">
            <h3>Enter Your Password</h3>
            <p className="step-desc">Welcome back! Please enter your password</p>
            <div className="form-group">
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  autoFocus
                />
              </div>
            </div>
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>
        );
      }
    }

    // Registration steps
    switch (stepTitle) {
      case 'User ID':
        return (
          <div className="step-content">
            <h3>Enter Your User ID</h3>
            <p className="step-desc">Enter the user ID provided by your institution</p>
            <div className="form-group">
              <div className="input-wrapper">
                <FaIdCard className="input-icon" />
                <input
                  type="text"
                  name="userId"
                  value={formData.userId.toUpperCase()}
                  onChange={(e) => handleInputChange({ target: { name: 'userId', value: e.target.value.toUpperCase() }})}
                  placeholder="Enter your user ID"
                  autoFocus
                />
              </div>
              {userType && (
                <div className="role-badge-inline">
                  <span className={`badge ${userType}`}>{getRoleLabel()}</span>
                  {formData.school && <span className="school-detected">🏫 {formData.school}</span>}
                  {formData.department && <span className="dept-detected">📚 {formData.department}</span>}
                </div>
              )}
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(160, 90, 200, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--main_color)' }}>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>
                  Want to register a school instead?
                </p>
                <Link to="/school-registration" style={{ fontSize: '14px', color: 'var(--main_color)', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <FaSchool /> Register School for Admin Access
                </Link>
              </div>
            </div>
          </div>
        );

      case 'Personal Info':
        return (
          <div className="step-content">
            <h3>Personal Information</h3>
            <p className="step-desc">Tell us about yourself</p>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <MdPerson className="input-icon" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+250 788 123 456"
                />
              </div>
            </div>
          </div>
        );

      case 'Guardian Info':
        return (
          <div className="step-content">
            <h3>Guardian Information</h3>
            <p className="step-desc">Parent or guardian contact details</p>
            <div className="form-group">
              <label>Guardian Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleInputChange}
                  placeholder="Guardian's full name"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Guardian Phone</label>
              <div className="input-wrapper">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleInputChange}
                  placeholder="+250 788 123 456"
                />
              </div>
            </div>
          </div>
        );

      case 'School Details':
        return (
          <div className="step-content">
            <h3>School Information</h3>
            <p className="step-desc">Which school are you affiliated with?</p>
            <div className="form-group">
              <div className="input-wrapper">
                <FaSchool className="input-icon" />
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  placeholder="Enter your school name"
                />
              </div>
            </div>
          </div>
        );

      case 'Verification':
        return (
          <div className="step-content">
            <h3>Verify Your Account</h3>
            <p className="step-desc">Enter the 4-digit code sent to your email</p>
            <div className="verification-section">
              <p className="verify-label">Email: {formData.email}</p>
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
            <h3>Create Password</h3>
            <p className="step-desc">Choose a strong password for your account</p>
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
          </div>
        );

      case 'Profile Photo':
        return (
          <div className="step-content">
            <h3>Profile Photo</h3>
            <p className="step-desc">Upload a profile picture (optional)</p>
            <div className="profile-upload">
              <div className="profile-preview">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
                ) : (
                  <div className="placeholder">
                    <FaCamera />
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="profile-upload"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => document.getElementById('profile-upload').click()}
                className="upload-btn"
              >
                <FaCamera /> Choose Photo
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
    <div className='auth-flow-page'>
      <div className="gradient-bg"></div>
      <div className="auth-flow-container">
        {/* Left Side - Branding */}
        <div className="auth-left">
          <Link to="/" className="logo">
            <img src={`${import.meta.env.BASE_URL}assets/LearnIx.png`} alt="LearnIx" />
          </Link>
          <div className="branding-content">
            <h1><span className="learn">Learn</span>Ix</h1>
            <p className="tagline">Empowering Education Through Technology</p>
            
            {userType && !isLogin && (
              <div className="role-info">
                <div className={`role-card ${userType}`}>
                  <div className="role-icon">{getRoleLabel()}</div>
                  <p>
                    {userType === 'student' && 'Access courses, assignments, grades, and more'}
                    {userType === 'teacher' && 'Manage classes, assignments, and student progress'}
                    {userType === 'admin' && 'Full platform control and user management'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Flow Form */}
        <div className="auth-right">
          <div className="auth-flow-card">
            {/* Header */}
            <div className="form-header">
              <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <div className="mode-switch">
                <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
                <button onClick={() => { setIsLogin(!isLogin); setCurrentStep(0); }}>
                  {isLogin ? 'Register' : 'Login'}
                </button>
              </div>
            </div>

            {/* Progress Steps */}
            {!isLogin && (
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
            )}

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
              <button onClick={handleNext} className="btn-next" disabled={loading}>
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <>
                    {currentStep === steps.length - 1 ? (isLogin ? 'Login' : 'Complete') : 'Next'}
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
