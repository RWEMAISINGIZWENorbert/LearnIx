import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GradientText from '../animations/GradientText';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { LuLetterText } from "react-icons/lu";
import { MdEmail, MdPhone, MdOutlineLock } from "react-icons/md";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { HiOutlineUserAdd } from "react-icons/hi";
import './login.css'

export const Login = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [logo, setLogo] = useState("src/assets/profile_pic_blank.png");
  const [slide, setSlide] = useState(false);
  const navigate = useNavigate();

  const steps = [
    "School Name",
    "Contact Details",
    "Verification Code",
    "Create Password",
    "Upload Logo",
  ];

  const isStepCompleted = (stepIndex) => completedSteps.includes(stepIndex);

  const handleCompleteStep = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const handleNext = () => {
    if (!isStepCompleted(currentStep)) return;

    // Redirect when last step is done
    if (currentStep === steps.length - 1) {
      navigate( '/admin/dashboard');
      return;
    }

    setSlide(true);
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
      setSlide(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setSlide(true);
    setTimeout(() => {
      setCurrentStep(currentStep - 1);
      setSlide(false);
    }, 300);
  };

  const handleAddPicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogo(ev.target.result);
      reader.readAsDataURL(file);
      handleCompleteStep(4);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isStepCompleted(currentStep)) {
      handleNext();
    }
  };

  // OTP input behavior
  useEffect(() => {
    const handleOTPInputs = (className) => {
      const inputs = Array.from(document.querySelectorAll(`.${className}`));
      if (!inputs.length) return;

      const onInput = (e) => {
        const i = inputs.indexOf(e.target);
        if (e.target.value && i < inputs.length - 1) inputs[i + 1].focus();
        checkStepCompletion();
      };

      const onKeyDown = (e) => {
        const i = inputs.indexOf(e.target);
        if (e.key === 'Backspace' && !e.target.value && i > 0) inputs[i - 1].focus();
        if (e.key === 'ArrowLeft' && i > 0) inputs[i - 1].focus();
        if (e.key === 'ArrowRight' && i < inputs.length - 1) inputs[i + 1].focus();
      };

      inputs.forEach(input => {
        input.addEventListener('input', onInput);
        input.addEventListener('keydown', onKeyDown);
      });

      return () => {
        inputs.forEach(input => {
          input.removeEventListener('input', onInput);
          input.removeEventListener('keydown', onKeyDown);
        });
      };
    };

    const checkStepCompletion = () => {
      const emailFilled = Array.from(document.querySelectorAll('.verification-input-for-email')).every(input => input.value);
      const phoneFilled = Array.from(document.querySelectorAll('.verification-input-for-phone-number')).every(input => input.value);
      if (emailFilled && phoneFilled) handleCompleteStep(2);
    };

    const cleanupEmail = handleOTPInputs('verification-input-for-email');
    const cleanupPhone = handleOTPInputs('verification-input-for-phone-number');

    return () => {
      cleanupEmail?.();
      cleanupPhone?.();
    };
  }, []);

  return (
    <div className='login'>
      <div className="gradient"></div>
      <div className="box">
        {/* Leftside */}
        <div className="leftside">
          <div className="upperside">
            <div className="img">
              <Link className='all-links' to='/'>
                <img src={`${import.meta.env.BASE_URL}assets/LearnIx.png`} alt="LearnIx logo" />
              </Link>
            </div>
          </div>
          <div className="middleside">
            <div className="data">
              <div className="upper_one">
                <div className="sign_up_p">
                  <p className='sign_up'>Sign up to</p>
                </div>
                <div className="sign_up_logo">
                  <p><span className="learn">Learn</span>Ix</p>
                </div>
              </div>
              <br />
              <div className="last_p">
                <div className="last_p_p">
                  <p>
                    Create your school account and unlock a powerful dashboard designed to help you manage student enrollment, monitor academic performance, and coordinate teaching resources. Whether you're overseeing admissions or tracking progress across classes, your school's success starts here.<br /><br />
                    <span className="why">Why register your school?</span>
                    <br /><br />
                    <ul className="list">
                      <li><span className="bold">📋 Streamline student registration.</span> <br /><span className="rest">Easily enroll new students and manage their academic profiles in one place.</span></li>
                      <li><span className="bold">🧑‍🏫 Add and manage teachers.</span> <br /><span className="rest">Assign subjects, track teaching schedules, and maintain up-to-date staff records.</span></li>
                      <li><span className="bold">📊 Monitor student performance. </span><br /><span className="rest">View real-time marks, progress reports, and class rankings to support academic growth.</span></li>
                      <li><span className="bold">🗂️ Organize classes and subjects.</span> <br /><span className="rest">Create class groups, assign subjects, and manage timetables with ease.</span></li>
                      <li><span className="bold">📣 Send announcements and updates. </span><br /><span className="rest">Keep your school community informed about events, exams, and deadlines.</span></li>
                    </ul>
                    <br />
                    Let's build your institution's future—one teacher, one subject at a time.
                  </p>
                </div>
              </div>
              <div className="buttons">
                <div className="student_login">
                  <button className="student">Student login</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rightside */}
        <div className="rightside">
          <div className="login_form">
            <div className="img">
              <img src={`${import.meta.env.BASE_URL}assets/LearnIx.png`} alt="LearnIx logo" />
            </div>
            <div className="form">
              <div className="form1">
                <div className="whole_box">
                  <div className="upper">
                    <GradientText
                      colors={['#A05AC8','#A05AC8','#000','#A05AC8','#A05AC8','#000']}
                      animationSpeed={3}
                      showBorder={false}
                      className="custom-class"
                    >
                      <span>School registration</span>
                    </GradientText>
                  </div>

                  <div className="action_center" onKeyDown={handleKeyDown}>
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className={`first_part ${index === currentStep && !slide ? 'active' : ''}`}
                        style={{ display: index === currentStep || slide ? "block" : "none" }}
                      >
                        {/* Step content */}
                        {index === 0 && (
                          <>
                            <div className="action"><h3>🏫 Enter Your School Name</h3></div>
                            <div className="des">
                              <p className="description">
                                Let's get started by identifying your institution. This name will appear on your dashboard, reports, and official communications.
                              </p>
                            </div>
                            <div className="inputs">
                              <div className="text_area">
                                <LuLetterText className='icon'/>
                                <input required type="text" placeholder='Please write your school name...' onChange={() => handleCompleteStep(index)} />
                              </div>
                            </div>
                          </>
                        )}

                        {index === 1 && (
                          <>
                            <div className="action"><h3>📱 Contact Details for Verification</h3></div>
                            <div className="des">
                              <p className="description">
                                Please provide a valid phone number and email address. These will be used to verify your registration and send important updates about your school account.
                              </p>
                            </div>
                            <div className="inputs">
                              <div className="text_area">
                                <MdEmail className='icon'/>
                                <input required type="email" placeholder='Please write school email...' onChange={() => handleCompleteStep(index)} />
                              </div>
                              <div className="text_area">
                                <MdPhone className='icon'/>
                                <input required type="tel" placeholder='Please provide phone number...' onChange={() => handleCompleteStep(index)} />
                              </div>
                            </div>
                          </>
                        )}

                        {index === 2 && (
                          <>
                            <div className="action"><h3>🔐 Enter Verification Code</h3></div>
                            <div className="des">
                              <p className="description">
                                We've sent a confirmation code to your email and phone number. Please enter it below to verify your account and continue with registration.
                              </p>
                            </div>
                            <div className="inputs">
                              <div className="text_area_for_code">
                                <p>Enter code sent on <br/> <span className="email">f***************nda@gmail.com</span></p>
                                <div className="code-input">
                                  {Array(6).fill("").map((_, i) => (
                                    <input required key={i} type="text" maxLength="1" className="verification-input-for-email" />
                                  ))}
                                </div>
                                <p>Enter code sent on <br/> <span className="phone-number">+250 79* *** **6</span></p>
                                <div className="code-input">
                                  {Array(6).fill("").map((_, i) => (
                                    <input required key={i} type="text" maxLength="1" className="verification-input-for-phone-number" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="resend">
                              <div className="button">
                                <button><PiPaperPlaneTiltFill className='icon'/><span>Resend codes</span></button>
                              </div>
                            </div>
                          </>
                        )}

                        {index === 3 && (
                          <>
                            <div className="action"><h3>🔒 Create a Secure Password</h3></div>
                            <div className="des">
                              <p className="description">
                                Choose a strong password to protect your account. It should include at least 8 characters, with a mix of letters, numbers, and symbols for added security.
                              </p>
                            </div>
                            <div className="inputs">
                              <div className="text_area">
                                <MdOutlineLock className='icon'/>
                                <input required type="password" placeholder='Please create strong password...' onChange={() => handleCompleteStep(index)} />
                              </div>
                              <div className="text_area">
                                <MdOutlineLock className='icon'/>
                                <input required type="password" placeholder='Confirm your password...' onChange={() => handleCompleteStep(index)} />
                              </div>
                            </div>
                          </>
                        )}

                        {index === 4 && (
                          <>
                            <div className="action"><h3>🎓 Upload Your School Logo</h3></div>
                            <div className="des">
                              <p className="description">
                                Add your official school logo to personalize your dashboard, reports, and communications. A clear PNG or JPEG file works best.
                              </p>
                            </div>
                            <div className="inputs">
                              <div className="pic">
                                <img src={`${import.meta.env.BASE_URL}assets/profile_pic_blank.png`} className='demo_pic' alt="School Logo" />
                              </div>
                              <div className="add_or_skip">
                                <input required
                                  type="file"
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  id="logoUpload"
                                  onChange={handleAddPicture}
                                />
                                <button onClick={() => document.getElementById('logoUpload').click()}>
                                  <HiOutlineUserAdd className='icon'/>
                                  <span>Add picture</span>
                                </button>
                                <button onClick={() => handleCompleteStep(index)}>
                                  <span>Skip for now</span>
                                  <FaArrowRightLong className='icon'/>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="lower_part">
                    <div className="buttons">
                      {currentStep > 0 && (
                        <div className="previous">
                          <button onClick={handleBack}>
                            <FaArrowLeftLong className='icon'/>
                            <span>Back</span>
                          </button>
                        </div>
                      )}
                      <div className="next">
                        <button onClick={handleNext} disabled={!isStepCompleted(currentStep)}>
                          <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
                          <FaArrowRightLong className='icon'/>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
