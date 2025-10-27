import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaIdCard, FaSchool, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    phone: '',
    school: '',
    guardianName: '',
    guardianPhone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Detect user type based on ID prefix
  useEffect(() => {
    if (formData.userId.startsWith('STU')) {
      setUserType('student');
    } else if (formData.userId.startsWith('TR')) {
      setUserType('teacher');
    } else if (formData.userId.startsWith('AD')) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic
      if (formData.userId.startsWith('STU')) {
        navigate('/student');
      } else if (formData.userId.startsWith('TR')) {
        navigate('/teacher');
      } else if (formData.userId.startsWith('AD')) {
        navigate('/admin');
      }
    } else {
      // Registration logic
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      // Process registration
      alert('Registration successful!');
      setIsLogin(true);
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

  return (
    <div className='auth-page'>
      <div className="gradient-bg"></div>
      <div className="auth-container">
        {/* Left side - Branding */}
        <div className="auth-left">
          <Link to="/" className="logo">
            <img src={`${import.meta.env.BASE_URL}assets/LearnIx.png`} alt="LearnIx" />
          </Link>
          <div className="branding-content">
            <h1><span className="learn">Learn</span>Ix</h1>
            <p className="tagline">Empowering Education Through Technology</p>
            <div className="features">
              <div className="feature">
                <div className="icon">📚</div>
                <h3>Smart Learning</h3>
                <p>Access courses, assignments, and resources anytime</p>
              </div>
              <div className="feature">
                <div className="icon">📊</div>
                <h3>Track Progress</h3>
                <p>Monitor academic performance in real-time</p>
              </div>
              <div className="feature">
                <div className="icon">🤝</div>
                <h3>Collaborate</h3>
                <p>Connect with teachers and students seamlessly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="auth-right">
          <div className={`auth-card ${isLogin ? 'login-mode' : 'register-mode'}`}>
            <div className="form-header">
              <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p>{isLogin ? 'Sign in to continue your learning journey' : 'Join our educational platform today'}</p>
            </div>

            {/* Mode Toggle */}
            <div className="mode-toggle">
              <button
                className={isLogin ? 'active' : ''}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={!isLogin ? 'active' : ''}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            {/* Role Badge */}
            {userType && (
              <div className="role-badge">
                <span className={`badge ${userType}`}>{getRoleLabel()}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              {/* User ID - Always visible */}
              <div className="form-group">
                <label>User ID</label>
                <div className="input-wrapper">
                  <FaIdCard className="input-icon" />
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    placeholder={isLogin ? "Enter your ID" : "STU000, TR000, or AD000"}
                    required
                  />
                </div>
                {!isLogin && !userType && formData.userId && (
                  <span className="hint">ID must start with STU, TR, or AD</span>
                )}
              </div>

              {/* Registration Fields */}
              {!isLogin && userType && (
                <>
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
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <div className="input-wrapper">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
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
                        required
                      />
                    </div>
                  </div>

                  {/* School name for students and teachers */}
                  {(userType === 'student' || userType === 'teacher') && (
                    <div className="form-group">
                      <label>School Name</label>
                      <div className="input-wrapper">
                        <FaSchool className="input-icon" />
                        <input
                          type="text"
                          name="school"
                          value={formData.school}
                          onChange={handleInputChange}
                          placeholder="Enter your school name"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Guardian info for students */}
                  {userType === 'student' && (
                    <>
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
                            required
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
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Password */}
              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Confirm Password for Registration */}
              {!isLogin && (
                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password */}
              {isLogin && (
                <div className="form-options">
                  <label className="remember">
                    <input type="checkbox" /> Remember me
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot Password?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <FaArrowRight className="arrow-icon" />
              </button>
            </form>

            {/* Footer */}
            <div className="form-footer">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button onClick={() => setIsLogin(!isLogin)} className="toggle-link">
                  {isLogin ? 'Register now' : 'Login here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
