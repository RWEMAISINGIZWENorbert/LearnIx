import React, { useState } from 'react';
import './StudentApplication.css';
import { Navbar } from '../../../components/public_components/navbar/navbar';
import { FaFileUpload, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { submitApplication } from '../../../features/applications/applicationsSlice';
import { useNavigate } from 'react-router-dom';

export const StudentApplication = () => {
  const location = useLocation();
  const selectedSchool = location.state?.school || null;
  const applicationSuccess = useSelector((state) => state.applications.success);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { loading, error, success } = useSelector((state) => state.applications);

  const [formData, setFormData] = useState({
    schoolId: selectedSchool?._id || selectedSchool?.id || '',
    // firstName: '',
    // lastName: '',
    // email: '',
    // phone: '',
    // dateOfBirth: '',
    // nationality: '',
    // city: '',
    // country: '',
    // previousSchool: '',
    // grade: '',
    // guardianName: '',
    // guardianPhone: '',
    // guardianEmail: '',
    // schoolChoice: selectedSchool?.name || '',
    // additionalInfo: ''
    firstName: '',
    lastName: '',
    studentEmail: '',
    studentTel: '',
    dateOfBirth: '',
    currentSchool: '',
    reasonForTransfer: '',
    applyingClass: '',
    guardianName: '',
    guardianTel: '',
    guardianEmail: '',
    schoolChoice: selectedSchool?.name || '',
    progressReport: null,
    resultSlip: null
  });


  const handleSubmit = async (e) => {
  e.preventDefault();  
  
  const formDataToSend = new FormData();

   // First, add all non-file form data
  const { progressReport, resultSlip, ...formFields } = formData;
  Object.entries(formFields).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formDataToSend.append(key, value);
    }
  });
  // // Append all form data
  // Object.keys(formData).forEach(key => {
  //   if (formData[key] !== null && formData[key] !== undefined) {
  //     formDataToSend.append(key, formData[key]);
  //   }
  // });

  // Append non-file fields
  // Object.entries(otherData).forEach(([key, value]) => {
  //   if (value !== null && value !== undefined) {
  //     formDataToSend.append(key, value);
  //   }
  // });

  // Add files from uploadedFiles state if they exist
  if (uploadedFiles.progressReport) {
    formDataToSend.append('progressReport', uploadedFiles.progressReport);
  }
  if (uploadedFiles.resultSlip) {
    formDataToSend.append('resultSlip', uploadedFiles.resultSlip);
  }

  try {
    const result = dispatch(submitApplication(formDataToSend));
     console.log(`The result ${result}`);
    if (applicationSuccess) {
      alert('Application submitted successfully!');
      
      // Reset form
      setFormData({
        schoolId: selectedSchool?._id || selectedSchool?.id || '',
        firstName: '',
        lastName: '',
        studentEmail: '',
        studentTel: '',
        dateOfBirth: '',
        currentSchool: '',
        reasonForTransfer: '',
        applyingClass: '',
        guardianName: '',
        guardianTel: '',
        guardianEmail: '',
        schoolChoice: selectedSchool?.name || '',
        progressReport: null,
        resultSlip: null
      });
      
      // Reset file inputs
      document.querySelectorAll('input[type="file"]').forEach(input => {
        input.value = '';
      });
      
      // Navigate back to schools page
      navigate('/schools');
    }
  } catch (error) {
    console.error('Error submitting application:', error);
  }
};

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: files[0]
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const result = await dispatch(submitApplication(formData));
  //   if (result.meta.requestStatus === 'fulfilled') {
  //     alert('The Application sent successfully');
  //     // Optionally redirect or show success message
  //     navigate('/schools');
  //   }
  // };

  
//   const handleFileChange = (e) => {
//   const { name, files } = e.target;
//   if (files && files[0]) {
//     setFormData(prev => ({
//       ...prev,
//       [name]: files[0]
//     }));
//   }
// };

const handleFileChange = (e, fieldName) => {
  const file = e.target.files[0];
  if (file) {
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  }
};


  const [uploadedFiles, setUploadedFiles] = useState({
    resultSlip: null,
    progressReport: null
  });

  const [submitted, setSubmitted] = useState(false);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  const handleFileUpload = (e, fileType) => {
     console.log(`Call The Handle File Upload ${fileType}`);
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF, JPG, and PNG files are allowed');
        return;
      }
      setUploadedFiles({
        ...uploadedFiles,
        [fileType]: file
      });
    //   setUploadedFiles(prev => ({
    //   ...prev,
    //   [fileType]: file
    // }));
    }
  };

  const removeFile = (fileType) => {
    setUploadedFiles({
      ...uploadedFiles,
      [fileType]: null
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here you would typically send the data to your backend
  //   console.log('Application submitted:', formData);
  //   console.log('Uploaded files:', uploadedFiles);
  //   setSubmitted(true);
    
  //   // Reset form after 3 seconds
  //   setTimeout(() => {
  //     setSubmitted(false);
  //     setFormData({
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       phone: '',
  //       dateOfBirth: '',
  //       nationality: '',
  //       city: '',
  //       country: '',
  //       previousSchool: '',
  //       grade: '',
  //       guardianName: '',
  //       guardianPhone: '',
  //       guardianEmail: '',
  //       schoolChoice: selectedSchool?.name || '',
  //       additionalInfo: ''
  //     });
  //     setUploadedFiles({
  //       resultSlip: null,
  //       progressReport: null
  //     });
  //   }, 3000);
  // };

  return (
    <div>
      <Navbar />
      <div className='application-page'>
        <div className="gradient"></div>
        <div className="container">
          <div className="header">
            <h1>Student Application Form</h1>
            <p>Fill in your details to apply to {selectedSchool ? selectedSchool.name : 'our partner schools'}</p>
          </div>

          {submitted ? (
            <div className="success-message">
              <FaCheckCircle className="success-icon" />
              <h2>Application Submitted Successfully!</h2>
              <p>We'll review your application and get back to you soon.</p>
            </div>
          ) : (
            <form className="application-form" onSubmit={handleSubmit}>
              {/* Student Information */}
              <div className="form-section">
                <h3>Student Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="studentEmail"
                      value={formData.studentEmail}
                      onChange={handleChange}
                      required
                      placeholder="student@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="studentTel"
                      value={formData.studentTel}
                      onChange={handleChange}
                      required
                      placeholder="+250 788 123 456"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Grade Applying For *</label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select class</option>
                        <option>S1</option>
                        <option>S2</option>
                        <option>S3</option>
                        <option>S4 MCB</option>
                        <option>S4 PCB</option>
                        <option>S4 MCE</option>
                        <option>S4 MEG</option>
                        <option>S4 PCM</option>
                        <option>S5 MCB</option>
                        <option>S5 PCB</option>
                        <option>S5 MCE</option>
                        <option>S5 MEG</option>
                        <option>S5 PCM</option>
                        <option>S6 MCB</option>
                        <option>S6 PCB</option>
                        <option>S6 MCE</option>
                        <option>S6 MEG</option>
                        <option>S6 PCM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="form-section">
                <h3>Address Information</h3>
                <div className="form-group">
                  <label>Nationality *</label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    placeholder="Rwandan, Japanese, Korean"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="Kigali"
                    />
                  </div>
                  <div className="form-group">
                    <label>Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      placeholder="Rwanda"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="form-section">
                <h3>Academic Information</h3>
                <div className="form-group">
                  <label>Previous School</label>
                  <input
                    type="text"
                    name="currentSchool"
                    value={formData.currentSchool}
                    onChange={handleChange}
                    placeholder="Name of previous school"
                  />
                </div>
                <div className="form-group">
                  <label>School Choice *</label>
                  <input
                    type="text"
                    name="schoolChoice"
                    value={formData.schoolChoice}
                    onChange={handleChange}
                    required
                    placeholder="Select your preferred school"
                    readOnly={selectedSchool !== null}
                  />
                </div>
              </div>

              {/* Guardian Information */}
              <div className="form-section">
                <h3>Guardian/Parent Information</h3>
                <div className="form-group">
                  <label>Guardian Name *</label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    required
                    placeholder="Full name of parent/guardian"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Guardian Phone *</label>
                    <input
                      type="tel"
                      name="guardianTel"
                      value={formData.guardianTel}
                      onChange={handleChange}
                      required
                      placeholder="+250 788 123 456"
                    />
                  </div>
                  <div className="form-group">
                    <label>Guardian Email *</label>
                    <input
                      type="email"
                      name="guardianEmail"
                      value={formData.guardianEmail}
                      onChange={handleChange}
                      required
                      placeholder="guardian@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div className="form-section">
                <h3>Document Upload</h3>
                <p className="section-description">Upload your previous academic documents (PDF, JPG, or PNG - Max 5MB each)</p>

                <p className='caution'>
                    <FiAlertTriangle className='icon'/>
                    <p>
                        <span>Note :</span> For a student from O-level to A-level you must upload Result slip. But for a student who want to change school upload your Progress report.
                    </p>
                </p>
                
                <div className="form-row" >
                  <div className="form-group">
                    <label>Result Slip (Optional)</label>
                    <div className="file-upload-wrapper">
                      {!uploadedFiles.resultSlip ? (
                        <label className="file-upload-label">
                          <FaFileUpload className="upload-icon" />
                          <span>Click to upload result slip</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(e, 'resultSlip')}
                            style={{ display: 'none' }}
                            
                          />
                        </label>
                      ) : (
                        <div className="uploaded-file">
                          <span className="file-name">{uploadedFiles.resultSlip.name}</span>
                          <button
                            type="button"
                            className="remove-file-btn"
                            onClick={() => removeFile('resultSlip')}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Progress Report (Optional)</label>
                    <div className="file-upload-wrapper">
                      {!uploadedFiles.progressReport ? (
                        <label className="file-upload-label">
                          <FaFileUpload className="upload-icon" />
                          <span>Click to upload progress report</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(e, 'progressReport')}
                            style={{ display: 'none' }}
                          />
                        </label>
                      ) : (
                        <div className="uploaded-file">
                          <span className="file-name">{uploadedFiles.progressReport.name}</span>
                          <button
                            type="button"
                            className="remove-file-btn"
                            onClick={() => removeFile('progressReport')}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="form-section">
                <h3>Additional Information</h3>
                <div className="form-group">
                  <label>Tell us more about yourself (Optional)</label>
                  <textarea
                    // name="additionalInfo"
                    name="reasonForTransfer"
                    value={formData.reasonForTransfer}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Academic achievements, extracurricular activities, interests, etc."
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
              {error && (
                <div className="error-message">
                  <FiAlertTriangle className="error-icon" />
                  {error}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
