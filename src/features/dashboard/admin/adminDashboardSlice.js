import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch dashboard summary
export const fetchAdminDashboardSummary = createAsyncThunk(
  'dashboard/fetchSummary',
  async (_, { getState, rejectWithValue }) => {
    try {
       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const { auth } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const response = await axios.get(
        `${API_BASE_URL}/dashboard`,
        config
      );

      return response.data.data; // Return the data part of the response
    } catch (error) {
      // Return error message from API or default message
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch dashboard data'
      );
    }
  }
);

const initialState = {
  summary: {
    students: 0,
    teachers: 0,
    classes: 0,
    recentApplications: [],
    recentClasses: [],
    admissionSnapshot: {
      approved: 0,
      rejected: 0,
      pending: 0,
    },
  },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
    clearDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(fetchAdminDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle successful fetch
      .addCase(fetchAdminDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = {
          students: action.payload.students,
          teachers: action.payload.teachers,
          classes: action.payload.classes,
          recentApplications: action.payload.recentApplications,
          recentClasses: action.payload.recentClasses,
          admissionSnapshot: {
            approved: action.payload.admissionSnapshot.approved,
            rejected: action.payload.admissionSnapshot.rejected,
            pending: action.payload.admissionSnapshot.pending,
          },
        };
      })
      // Handle error
      .addCase(fetchAdminDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load dashboard data';
      });
  },
});

// Export actions
export const { clearDashboardError } = dashboardSlice.actions;

// Selectors
export const selectDashboardSummary = (state) => state.adminDashboard.summary;
export const selectDashboardLoading = (state) => state.adminDashboard.loading;
export const selectDashboardError = (state) => state.adminDashboard.error;
export const selectAdmissionStats = (state) => state.adminDashboard.summary.admissionSnapshot;

export default dashboardSlice.reducer;