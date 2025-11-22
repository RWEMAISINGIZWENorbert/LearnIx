import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudentDashboardSummary = createAsyncThunk(
  'student/dashboard/fetchSummary',
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
        `${API_BASE_URL}/dashboard/student`,
        config
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch student dashboard data'
      );
    }
  }
);

const initialState = {
  summary: {
    assignments: 0,
    resources: 0,
    announcements: 0,
    recentAssignments: [],
    recentResources: [],
    recentAnnouncements: [],
  },
  loading: false,
  error: null,
};

const studentDashboardSlice = createSlice({
  name: 'studentDashboard',
  initialState,
  reducers: {
    clearStudentDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load student dashboard data';
      })
      .addCase(fetchStudentDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = {
          assignments: action.payload.assignments || 0,
          resources: action.payload.resources || 0,
          announcements: action.payload.announcements || 0,
          recentAssignments: action.payload.recentAssignments || [],
          recentResources: action.payload.recentResources || [],
          recentAnnouncements: action.payload.recentAnnouncements || [],
        };
      });
  },
});

export const { clearStudentDashboardError } = studentDashboardSlice.actions;

export const selectStudentDashboardSummary = (state) => state.studentDashboard.summary;
export const selectStudentDashboardLoading = (state) => state.studentDashboard.loading;
export const selectStudentDashboardError = (state) => state.studentDashboard.error;

export default studentDashboardSlice.reducer;