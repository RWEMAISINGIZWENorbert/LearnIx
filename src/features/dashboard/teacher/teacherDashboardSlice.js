import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTeacherDashboardSummary = createAsyncThunk(
     'teacher/dashbord/fetchSummary',
     async (_, {getState, rejectWithValue }) => {
         try {
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
          const { auth } = getState();  
          const config = {
            headers: {
             'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
           },
          }

          const response = await axios.get(
            `${API_BASE_URL}/dashboard/teacher`,
             config
          );
           
          return response.data.data
         } catch (error) {
            return rejectWithValue(
                error.response?.data?.msg || 'Failed to fetch dashboard data'
            )
         }
     }
);

const initialState = {
  summary: {
    students: 0,
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

const teacherDashboardSlice = createSlice({
    name: 'teacherDashboard',
    initialState,
    reducers : {
     clearTeacherDashboardError: (state) => {
      state.error = null;
      },
    },
    extraReducers: (builder) => {
         builder
          .addCase(fetchTeacherDashboardSummary.pending, (state) => {
             state.loading = true;
             state.error = null;
          })
          .addCase(fetchTeacherDashboardSummary.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload.msg || 'Failed to load dashboard data';
          })
          .addCase(fetchTeacherDashboardSummary.fulfilled, (state, action) => {
             state.loading = false;
             state.summary = {
                 students: action.payload.students,
                 assignments: action.payload.assignments,
                 resources: action.payload.resources,
                 announcements: action.payload.announcements,
                 recentAssignments: action.payload.recentAssignments,
                 recentResources: action.payload.recentResources,
                 recentAnnouncements: action.payload.recentAnnouncements
             }
          })
    }
});

export const { clearTeacherDashboardError } = teacherDashboardSlice.actions;

export const selectTeacherDashboardSummary = (state) => state.teacherDashboard.summary;
export const selectTeacherDashboardLoading = (state) => state.teacherDashboard.loading;
export const selectTeacherDashboardError = (state) => state.teacherDashboard.error;

export default teacherDashboardSlice.reducer;