import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(` API_BASE_URL: ${API_BASE_URL}`);

export const registerPersonalInfo = createAsyncThunk(
  'auth/registerPersonalInfo',
  async (userData, { rejectWithValue }) => {
    try {
      const { code, name, email, tel } = userData;

      // Client-side validation
      if (!code) {
        return rejectWithValue({
          msg: 'Please provide the school code',
          field: 'code'
        });
      }

      if (!name || !email) {
        return rejectWithValue({
          msg: 'Please fill all the required credentials',
          field: !name ? 'name' : 'email'
        });
      }

      if (!tel) {
        return rejectWithValue({
          msg: 'Phone number is required',
          field: 'tel'
        });
      }

      // Make API request
      const response = await axios.post(
        `${API_BASE_URL}/auth/registerPersonalInfo`,
        { code, name, email, tel }
      );

      // Check if request was successful
      if (response.status === 201 || response.status === 200) {
        const { data } = response.data;

        // Store data in localStorage (except OTP)
        if (data) {
          localStorage.setItem('schoolId', data.schoolId || '');
          localStorage.setItem('email', data.email || '');
          localStorage.setItem('name', data.name || '');
          localStorage.setItem('tel', data.tel || '');
          localStorage.setItem('role', data.role || '');
        }

        return {
          status: response.data.status,
          msg: response.data.msg,
          data: {
            schoolId: data.schoolId,
            email: data.email,
            name: data.name,
            tel: data.tel,
            role: data.role
          }
        };
      }

      return rejectWithValue({
        msg: 'Registration failed. Please try again.'
      });

    } catch (error) {
      console.error('Registration Error:', error);

      // Handle different error types
      if (error.response) {
        // Server responded with error status
        return rejectWithValue({
          msg: error.response.data?.msg || 'Registration failed',
          status: error.response.status,
          field: error.response.data?.field
        });
      } else if (error.request) {
        // Request made but no response
        return rejectWithValue({
          msg: 'Network error. Please check your connection and try again.'
        });
      } else {
        // Something else happened
        return rejectWithValue({
          msg: error.message || 'An unexpected error occurred'
        });
      }
    }
  }
);


export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (otpData, { rejectWithValue }) => {
    try {
      const { otp } = otpData;

      // Get stored data from localStorage
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      const schoolId = localStorage.getItem('schoolId');
      const role = localStorage.getItem('role');
      const tel = localStorage.getItem('tel');

      // Validate OTP
      if (!otp) {
        return rejectWithValue({
          msg: 'Please enter the verification code',
          field: 'otp'
        });
      }

      // Validate stored data
      if (!email || !schoolId) {
        return rejectWithValue({
          msg: 'Session expired. Please start registration again.'
        });
      }

      // Prepare payload
      const payload = {
        otp,
        name,
        email,
        schoolId,
        tel,
        role
      };

      // Make API request
      const response = await axios.post(
        `${API_BASE_URL}/auth/verifyEmail`,
        payload
      );

      if (response.status === 201 || response.status === 200) {
        const { data } = response.data;

        // Store authentication token if provided
        if (data?.token) {
          localStorage.setItem('token', data.token);
        }

        return {
          status: response.data.status,
          msg: response.data.msg,
          data: data
        };
      }

      return rejectWithValue({
        msg: 'Verification failed. Please try again.'
      });

    } catch (error) {
      console.error('OTP Verification Error:', error);

      if (error.response) {
        return rejectWithValue({
          msg: error.response.data?.msg || 'Invalid verification code',
          status: error.response.status,
          field: error.response.data?.field
        });
      } else if (error.request) {
        return rejectWithValue({
          msg: 'Network error. Please check your connection.'
        });
      } else {
        return rejectWithValue({
          msg: error.message || 'Verification failed'
        });
      }
    }
  }
);


export const confirmPassword = createAsyncThunk(
  'auth/confirmPassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const { password, cPassword } = passwordData;

      // Get all required data from localStorage
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      const schoolId = localStorage.getItem('schoolId');
      const role = localStorage.getItem('role');

      // Validate password
      if (!password || !cPassword) {
        return rejectWithValue({
          msg: 'Please enter and confirm your password',
          field: !password ? 'password' : 'cPassword'
        });
      }

      if (password !== cPassword) {
        return rejectWithValue({
          msg: 'Passwords do not match',
          field: 'cPassword'
        });
      }

      // Validate required fields
      if (!name || !email || !schoolId || !role) {
        return rejectWithValue({
          msg: 'Session expired. Please start registration again.'
        });
      }

      // Prepare payload with all required fields
      const payload = {
        name,
        email,
        password,
        cPassword,
        schoolId,
        role
      };

      // Make API request
      const response = await axios.post(
        `${API_BASE_URL}/auth/confirmPassword`,
        payload
      );

      if (response.status === 201 || response.status === 200) {
        const { data } = response.data;

        // Store user ID if provided
        if (data?._id || data?.id) {
          localStorage.setItem('userId', data._id || data.id);
        }

        // Note: No token is returned from confirmPassword endpoint
        // User needs to login after registration is complete

        return {
          msg: response.data.msg || 'Password confirmed successfully',
          data: data
        };
      }

      return rejectWithValue({
        msg: 'Verification failed. Please try again.'
      });

    } catch (error) {
      console.error('Password Confirmation Error:', error);

      if (error.response) {
        return rejectWithValue({
          msg: error.response.data?.msg || 'Invalid password',
          status: error.response.status,
          field: error.response.data?.field
        });
      } else if (error.request) {
        return rejectWithValue({
          msg: 'Network error. Please check your connection.'
        });
      } else {
        return rejectWithValue({
          msg: error.message || 'Password confirmation failed'
        });
      }
    }
  }
);


export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Basic validation
      if (!email || !password) {
        return rejectWithValue({
          msg: 'Please provide email and password',
          error: true,
          field: !email ? 'email' : 'password'
        });
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
          email,
          password
        }
        // , {
        //   withCredentials: true // Important for cookies
        // }
      );

        const { data } = response;
        
        // Handle successful login
        if (response.status === 200 && !data.error) {
          const { name, email, role, schoolId, accessToken } = data.data;
          
          // Store necessary data in localStorage
          localStorage.setItem('token', accessToken);
          localStorage.setItem('role', role);
          localStorage.setItem('email', email);
          localStorage.setItem('name', name);
          localStorage.setItem('schoolId', schoolId);

          return {
            user: { name, email, role, schoolId },
            token: accessToken,
            msg: data.msg
          };
        }

        // Handle API error responses
        return rejectWithValue({
          msg: data.msg || 'Login failed',
          error: true
        });

      } catch (error) {
        // Handle network or server errors
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const { data, status } = error.response;
          
          if (status === 404) {
            return rejectWithValue({
              msg: 'User not found',
              error: true,
              field: 'email'
            });
          }
          
          if (status === 400) {
            return rejectWithValue({
              msg: data.msg || 'Invalid credentials',
              error: true,
              field: 'password'
            });
          }
        }

        return rejectWithValue({
          msg: 'Network error. Please check your connection.',
          error: true
        });
      }
    } catch (error) {
      console.error('Login Error:', error);

      if (error.response) {
        return rejectWithValue({
          msg: error.response.data?.msg || 'Invalid email or password',
          status: error.response.status,
          field: error.response.data?.field
        });
      } else if (error.request) {
        return rejectWithValue({
          msg: 'Network error. Please check your connection.'
        });
      } else {
        return rejectWithValue({
          msg: error.message || 'Login failed'
        });
      }
    }
  }
);


// export const logout = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Optional: Call backend logout endpoint if you have one
//       // await axios.post(`${API_BASE_URL}/auth/logout`);

//       // Clear all stored data
//       localStorage.removeItem('token');
//       localStorage.removeItem('userId');
//       localStorage.removeItem('email');
//       localStorage.removeItem('name');
//       localStorage.removeItem('role');
//       localStorage.removeItem('schoolId');
//       localStorage.removeItem('tel');

//       return {
//         msg: 'Logged out successfully'
//       };

//     } catch (error) {
//       console.error('Logout Error:', error);
      
//       // Even if logout fails, clear local data
//       localStorage.clear();
      
//       return rejectWithValue({
//         msg: error.message || 'Logout failed'
//       });
//     }
//   }
// );

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Call backend logout endpoint to clear cookies
      try {
        await axios.post(
          `${API_BASE_URL}/auth/logout`,
          {},
          {
            withCredentials: true, // Important for cookies
            headers: {
              'Content-Type': 'application/json',
              // Include the current token in the request
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
      } catch (error) {
        console.warn('Logout API call failed, but proceeding with client-side cleanup', error);
        // Continue with client-side cleanup even if API call fails
      }

      // Clear all stored data
      localStorage.clear();
      sessionStorage.clear(); // Clear session storage as well

      return {
        msg: 'Logged out successfully'
      };

    } catch (error) {
      console.error('Logout Error:', error);
      
      // Even if logout fails, clear local data
      localStorage.clear();
      sessionStorage.clear();
      
      return rejectWithValue({
        msg: error.message || 'Logout failed'
      });
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await axios.get(
        `${API_BASE_URL}/auth/profile`, // Adjust the endpoint if needed
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.data; // The user data from your API
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.msg || 'Failed to fetch profile');
      } else if (error.request) {
        return rejectWithValue('No response from server');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
 

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    userProfile: null,
    profileLoading: false,
    profileError: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    role: localStorage.getItem('role') || null,
    loading: false,
    error: null,
    registrationStep: null, // 'personal_info', 'otp_verification', 'completed'
    successMessage: null,
  },
  reducers: {
    // Clear error message
    clearError: (state) => {
      state.error = null;
    },
    // Clear success message
    clearSuccess: (state) => {
      state.successMessage = null;
    },
    // Reset registration state
    resetRegistration: (state) => {
      state.registrationStep = null;
      state.error = null;
      state.successMessage = null;
    },
    // Set authentication from stored data (for app initialization)
    setAuthFromStorage: (state) => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const email = localStorage.getItem('email');
      const name = localStorage.getItem('name');
      const schoolId = localStorage.getItem('schoolId');
      
      if (token && role) {
        state.isAuthenticated = true;
        state.token = token;
        state.role = role;
        state.user = {
          email,
          name,
          role,
          schoolId
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerPersonalInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.registrationStep = 'otp_verification';
        state.successMessage = action.payload.msg;
        // Store partial user data
        state.user = action.payload.data;
      })
      .addCase(registerPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.registrationStep = 'password_confirmed';
        state.successMessage = action.payload.msg;
        // User is NOT authenticated yet - needs to set password first
        state.isAuthenticated = false;
        state.user = action.payload.data;
        state.token = action.payload.data?.token || null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      })


      .addCase(confirmPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(confirmPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.registrationStep = 'completed';
        state.successMessage = action.payload.msg;
        state.user = action.payload.data;
        // User is NOT authenticated yet - needs to login
        state.isAuthenticated = false;
      })
      .addCase(confirmPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
         console.log('action.payload', action.payload);
         console.log('The State Data ', state);
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user?.role;
        state.successMessage = action.payload.msg;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.successMessage = null;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
        state.error = null;
        state.registrationStep = null;
        state.successMessage = 'Logged out successfully';
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        // Still clear auth state even if logout fails
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.userProfile = action.payload;
        state.profileError = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
        state.userProfile = null;
      });;
  },
});



// Export actions
export const { 
  clearError, 
  clearSuccess, 
  resetRegistration,
  setAuthFromStorage 
} = authSlice.actions;

// Export selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectRole = (state) => state.auth.role;
export const selectRegistrationStep = (state) => state.auth.registrationStep;
export const selectSuccessMessage = (state) => state.auth.successMessage;

// Export reducer
export default authSlice.reducer;