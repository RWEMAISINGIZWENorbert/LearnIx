import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Initial state
const initialState = {
  currentStep: 0,
  totalSteps: 5,
  schools: [],
  loading: false,
  error: null,
  success: false,
  schoolId: null,
  schoolData: {
    // Step 1
    name: '',
    type: '',
    // Step 2
    location: {
      country: '',
      province: '',
      district: '',
      sector: ''
    },
    // Step 3
    contact: {
      email: '',
      tel: ''
    },
    // Step 4 (OTP)
    otp: '',
    // Step 5
    password: '',
    confirmPassword: '',
    logo: ''
  }
};

// Async Thunks
export const fetchAllSchools = createAsyncThunk(
  'schools/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${API_BASE_URL}/schools/`);
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch schools'
      );
    }
  }
);

export const registerSchoolNameAndType = createAsyncThunk(
  'school/registerName',
  async ({ name, type }, { rejectWithValue }) => {
    try {
      // Client-side validation
      if (!name || !type) {
        return rejectWithValue({
          msg: 'Please provide both school name and type',
          field: !name ? 'name' : 'type'
        });
      }

      if (name.length < 3) {
        return rejectWithValue({
          msg: 'School name must be at least 3 characters long',
          field: 'name'
        });
      }

      const response = await axios.post(
        `${API_BASE_URL}/schools/registerName`, 
        { name, type },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000 // 10 seconds timeout
        }
      );

      if (response.status === 201 || response.status === 200) {
         console.log(`The SChool Id ${response.data.data._id  }`);
        localStorage.setItem('schoolId', response.data.data._id);
        return {
          status: response.data.status,
          msg: response.data.msg,
          data: response.data.data
        };
      }

      return rejectWithValue({
        msg: response.data?.msg || 'Failed to register school'
      });

    } catch (error) {
      console.error('School Registration Error:', error);
      
      if (error.response) {
        return rejectWithValue({
          msg: error.response.data?.msg || 'Registration failed',
          status: error.response.status,
          field: error.response.data?.field
        });
      } else if (error.request) {
        return rejectWithValue({
          msg: 'Network error. Please check your connection and try again.'
        });
      } else {
        return rejectWithValue({
          msg: error.message || 'An unexpected error occurred'
        });
      }
    }
  }
);

export const registerSchoolLocation = createAsyncThunk(
  'school/registerLocation',
  async (location , { rejectWithValue }) => {
    try {
      // Client-side validation
       var schoolId = localStorage.getItem('schoolId');
      if (!schoolId) {
        return rejectWithValue({
          msg: 'Invalid school reference. Please start the registration process again.',
          field: 'schoolId'
        });
      }

      const { country, province, district, sector } = location;
      
      if (!country || !province || !district || !sector) {
        const missingField = !country ? 'country' : 
                           !province ? 'province' :
                           !district ? 'district' : 'sector';
        
        return rejectWithValue({
          msg: 'Please fill in all location fields',
          field: missingField
        });
      }

      const response = await axios.post(
        `${API_BASE_URL}/schools/registerLocation`,
        { schoolId, ...location },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000
        }
      );

      if (response.status === 200 || response.status === 201) {
        return {
          status: response.data.status,
          msg: response.data.msg,
          data: response.data.data
        };
      }

      return rejectWithValue({
        msg: response.data?.msg || 'Failed to save location information'
      });

    } catch (error) {
      console.log('Location Registration Error:', error);
      
      if (error.response) {
        return rejectWithValue({
          msg: error.response.data?.msg || 'Failed to save location',
          status: error.response.status,
          field: error.response.data?.field
        });
      } else if (error.request) {
        return rejectWithValue({
          msg: 'Network error. Please check your connection.'
        });
      } else {
        return rejectWithValue({
          msg: error.message || 'Failed to process location information'
        });
      }
    }
  }
);

export const registerEmailAndTel = createAsyncThunk(
  'school/registerEmail',
  async ({email, tel }, { rejectWithValue }) => {
    try {
      // Client-side validation
      var schoolId = localStorage.getItem('schoolId');
      if (!schoolId) {
        return rejectWithValue({
          msg: 'Invalid school reference. Please start the registration process again.',
          field: 'schoolId'
        });
      }

      if (!email || !tel) {
        return rejectWithValue({
          msg: 'Please provide both email and telephone number',
          field: !email ? 'email' : 'tel'
        });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return rejectWithValue({
          msg: 'Please enter a valid email address',
          field: 'email'
        });
      }

      // Basic phone number validation (adjust regex as needed)
      const phoneRegex = /^[0-9\-\+]{9,15}$/;
      if (!phoneRegex.test(tel)) {
        return rejectWithValue({
          msg: 'Please enter a valid phone number',
          field: 'tel'
        });
      }

      const response = await axios.post(
        `${API_BASE_URL}/schools/registerEmail`,
        { schoolId, email, tel },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000
        }
      );
      if (response.status === 200 || response.status === 201) {
        // Store email in localStorage for verification step
        localStorage.setItem('email', email);
        
        return {
          status: response.data.status,
          msg: response.data.msg,
          data: response.data.data
        };
      }

      return rejectWithValue({
        msg: response.data?.msg || 'Failed to save contact information'
      });

    } catch (error) {
      console.log('Contact Registration Error:', error);
      
      if (error.response) {
        return rejectWithValue({
          msg: error.response.data?.msg || 'Failed to save contact information',
          status: error.response.status,
          field: error.response.data?.field
        });
      } else if (error.request) {
        return rejectWithValue({
          msg: 'Network error. Please check your connection.'
        });
      } else {
        return rejectWithValue({
          msg: error.message || 'Failed to process contact information'
        });
      }
    }
  }
);

export const verifyEmailOtp = createAsyncThunk(
  'schools/VerifyOtp',
  async ({  email, otp }, { rejectWithValue }) => {
    try {
       console.log(`The OTP Code to verify ${otp}`);
       var schoolId = localStorage.getItem('schoolId');
      // Client-side validation
      if (!schoolId) {
        return rejectWithValue({
          msg: 'Invalid session. Please start the registration process again.',
          field: 'schoolId'
        });
      }
      email = localStorage.getItem('schoolEmail') ?? localStorage.getItem('email');
      console.log(`The Email Adress There ${email}`);
      if (!email) {
        return rejectWithValue({
          msg: 'Email is required for verification',
          field: 'email'
        });
      }
      console.log(`The OtP ${otp}`);
      if (!otp || otp.length < 4) {
        return rejectWithValue({
          msg: 'Please enter a valid 6-digit verification code',
          field: 'otp'
        });
      }

      const response = await axios.post(
        `${API_BASE_URL}/schools/VerifyOtp`,
        { schoolId, email, otp },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 15000 // 15 seconds for OTP verification
        }
      );

      if (response.status === 200 || response.status == 201) {
        return {
          status: response.data.status,
          msg: response.data.msg,
          data: response.data.data
        };
      }

      return rejectWithValue({
        msg: response.data?.msg || 'OTP verification failed'
      });

    } catch (error) {
      console.error('OTP Verification Error:', error);
      
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = 'Verification failed';
        
        if (status === 400) {
          errorMessage = data?.msg || 'Invalid OTP. Please try again.';
        } else if (status === 401) {
          errorMessage = 'Verification code has expired. Please request a new one.';
        } else if (status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        return rejectWithValue({
          msg: errorMessage,
          status,
          field: data?.field || 'otp'
        });
      } else if (error.request) {
        return rejectWithValue({
          msg: 'Network error. Please check your connection.'
        });
      } else {
        return rejectWithValue({
          msg: error.message || 'Failed to verify OTP'
        });
      }
    }
  }
);

// Upload school logo
export const uploadSchoolLogo = createAsyncThunk(
  'school/uploadLogo',
  async ({ schoolId, logo }, { rejectWithValue }) => {
    try {
      // Create FormData to send the image
      const formData = new FormData();
      formData.append('image', logo);
      formData.append('data', JSON.stringify({ schoolId }));

      const response = await axios.post(
        `${API_BASE_URL}/schools/uploadSchoolLogo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        return {
          logoUrl: response.data.data.schoolLogo,
          msg: response.data.msg
        };
      }

      return rejectWithValue({
        msg: response.data?.msg || 'Failed to upload logo'
      });
    } catch (error) {
      console.error('Logo upload error:', error);
      if (error.response) {
        return rejectWithValue({
          msg: error.response.data?.msg || 'Failed to upload logo',
          status: error.response.status
        });
      }
      return rejectWithValue({
        msg: error.message || 'Network error. Please check your connection.'
      });
    }
  }
);

export const confirmSchoolPassword = createAsyncThunk(
  'school/confirmPassword',
  async ({ name, email, password, cPassword }, { rejectWithValue }) => {
    try {
      // Client-side validation
      var schoolId = localStorage.getItem('schoolId');
      if (!schoolId || !email) {
        return rejectWithValue({
          msg: 'Session expired. Please start the registration process again.',
          field: 'session'
        });
      }

      if (!password || !cPassword) {
        return rejectWithValue({
          msg: 'Please enter and confirm your password',
          field: !password ? 'password' : 'cPassword'
        });
      }

      if (password.length < 8) {
        return rejectWithValue({
          msg: 'Password must be at least 8 characters long',
          field: 'password'
        });
      }

      if (password !== cPassword) {
        return rejectWithValue({
          msg: 'Passwords do not match',
          field: 'cPassword'
        });
      }

      // Password strength validation (at least one uppercase, one lowercase, one number)
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
       /////////////////////////        TEST MODE: This wiil be ntegrated later   //////////////////////
       /////////////////////////////////////////////////////////////////////////////////////////////////////////
       /////////////////////////////////////////////////////////////////////////////////////////////////////////
       ////////////////////////////////////////////////////////////////////////////////////////////////////////
      // if (!passwordRegex.test(password)) {
      //   return rejectWithValue({
      //     msg: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      //     field: 'password'
      //   });
      // }
      ///////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////

      const response = await axios.post(
        `${API_BASE_URL}/schools/confirmPassword`,
        { schoolId, name, email, password, cPassword },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000
        }
      );

      if (response.status === 200 || response.status === 201) {
        // Clear sensitive data from localStorage
        localStorage.removeItem('email');
        
        return {
          status: response.data.status,
          msg: response.data.msg || 'School registration completed successfully!',
          data: response.data.data
        };
      }

      return rejectWithValue({
        msg: response.data?.msg || 'Failed to complete registration'
      });

    } catch (error) {
      console.error('Password Confirmation Error:', error);
      
      if (error.response) {
        return rejectWithValue({
          msg: error.response.data?.msg || 'Failed to complete registration',
          status: error.response.status,
          field: error.response.data?.field
        });
      } else if (error.request) {
        return rejectWithValue({
          msg: 'Network error. Please check your connection.'
        });
      } else {
        return rejectWithValue({
          msg: error.message || 'An error occurred during registration'
        });
      }
    }
  }
);

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    // Action to update form data for each step
    updateFormData: (state, { payload }) => {
      state.schoolData = { ...state.schoolData, ...payload };
    },
    // Action to go to a specific step
    goToStep: (state, { payload }) => {
      if (payload >= 1 && payload <= state.totalSteps) {
        state.currentStep = payload;
      }
    },
    // Action to go to the next step
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    // Action to go to the previous step
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    // Reset the entire form
    resetForm: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Handle uploadSchoolLogo
      .addCase(uploadSchoolLogo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadSchoolLogo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.schoolData.logo = payload.logoUrl;
      })
      .addCase(uploadSchoolLogo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Handle registerSchoolNameAndType
      .addCase(registerSchoolNameAndType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSchoolNameAndType.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.schoolId = payload.data._id;
        state.currentStep = 1;
      })
      .addCase(registerSchoolNameAndType.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Handle registerSchoolLocation
      .addCase(registerSchoolLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSchoolLocation.fulfilled, (state) => {
        state.loading = false;
        state.currentStep = 2;
      })
      .addCase(registerSchoolLocation.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Handle registerEmailAndTel
      .addCase(registerEmailAndTel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerEmailAndTel.fulfilled, (state) => {
        state.loading = false;
        state.currentStep += 1;
      })
      .addCase(registerEmailAndTel.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Handle verifyEmailOtp
      .addCase(verifyEmailOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmailOtp.fulfilled, (state) => {
        state.loading = false;
        state.currentStep += 1;
      })
      .addCase(verifyEmailOtp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Handle confirmSchoolPassword
      .addCase(confirmSchoolPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmSchoolPassword.fulfilled, (state) => {
        state.loading = false;
        // state.success = true;
        state.currentStep += 1;
      })
      .addCase(confirmSchoolPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchAllSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSchools.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload;
      })
      .addCase(fetchAllSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const { updateFormData, goToStep, nextStep, prevStep, resetForm } = schoolSlice.actions;

// Selectors
export const selectCurrentStep = (state) => state.school.currentStep;
export const selectTotalSteps = (state) => state.school.totalSteps;
export const selectSchoolData = (state) => state.school.schoolData;
export const selectIsLoading = (state) => state.school.loading;
export const selectError = (state) => state.school.error;
export const selectIsSuccess = (state) => state.school.success;
export const selectSchoolId = (state) => state.school.schoolId;


export const selectAllSchools = (state) => state.school.schools;
export const selectSchoolsLoading = (state) => state.school.loading;
export const selectSchoolsError = (state) => state.school.error;

export default schoolSlice.reducer;