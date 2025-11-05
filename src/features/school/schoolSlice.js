import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Initial state
const initialState = {
  currentStep: 1,
  totalSteps: 5,
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
    confirmPassword: ''
  }
};

// Async Thunks
export const registerSchoolNameAndType = createAsyncThunk(
  'school/registerNameAndType',
  async ({ name, type }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/school/register/name-type`, { name, type });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to register school');
    }
  }
);

export const registerSchoolLocation = createAsyncThunk(
  'school/registerLocation',
  async ({ schoolId, location }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/school/register/location`, {
        schoolId,
        ...location
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to register location');
    }
  }
);

export const registerEmailAndTel = createAsyncThunk(
  'school/registerEmailAndTel',
  async ({ schoolId, email, tel }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/school/register/contact`, {
        schoolId,
        email,
        tel
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to register contact info');
    }
  }
);

export const verifyEmailOtp = createAsyncThunk(
  'school/verifyEmailOtp',
  async ({ schoolId, email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/school/verify-otp`, {
        schoolId,
        email,
        otp
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'OTP verification failed');
    }
  }
);

export const confirmSchoolPassword = createAsyncThunk(
  'school/confirmPassword',
  async ({ schoolId, name, email, password, cPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/school/confirm-password`, {
        schoolId,
        name,
        email,
        password,
        cPassword
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Password confirmation failed');
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
    // Handle registerSchoolNameAndType
    builder
      .addCase(registerSchoolNameAndType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSchoolNameAndType.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.schoolId = payload.data._id;
        state.currentStep = 2;
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
        state.currentStep = 3;
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
        state.currentStep = 4;
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
        state.currentStep = 5;
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
        state.success = true;
      })
      .addCase(confirmSchoolPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
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

export default schoolSlice.reducer;