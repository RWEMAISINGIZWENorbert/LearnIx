import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Async thunks
export const fetchSubmissions = createAsyncThunk(
  'submissions/fetchAll',
  async (_, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        'Authorization': `Bearer ${auth.token}`,
      },
    };
    const response = await axios.get(`${API_URL}/submissions/student`, config);
    return response.data.data;
  }
);

export const fetchSubmissionsByAssignment = createAsyncThunk(
  'submissions/fetchByAssignment',
  async (assignmentId, { getState }) => {
     console.log(`The assignment Id to fetch ${assignmentId}`);
    const { auth } = getState();
    const config = {
      headers: {
        'Authorization': `Bearer ${auth.token}`,
      },
    };
    const response = await axios.get(
      `${API_URL}/submissions/assignment/${assignmentId}`,
      config
    );
    return response.data.data;
  }
);

export const submitAssignment = createAsyncThunk(
  'submissions/create',
  async (submissionData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth.token}`,
        },
      };

      console.log('Submitting assignment with data:', {
        assignmentId: submissionData.get('assignmentId'),
        hasFile: !!submissionData.get('submission'),
        description: submissionData.get('description')
      });

      const response = await axios.post(
        `${API_URL}/submissions/new`,
        submissionData,
        config
      );
      
      console.log('Submission response:', response.data);
      
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return rejectWithValue('No data returned from server');
    } catch (error) {
      console.error('Submission error:', error.response?.data || error.message);
      if (error.response) {
        return rejectWithValue(
          error.response.data?.message || 
          error.response.data?.error || 
          'Submission failed with server error'
        );
      } else if (error.request) {
        return rejectWithValue('No response from server. Please check your connection.');
      } else {
        return rejectWithValue(error.message || 'Submission failed');
      }
    }
  }
);

export const gradeSubmission = createAsyncThunk(
  'submissions/grade',
  async ({ submissionId, grade, feedback }, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
      },
    };
    const response = await axios.patch(
      `${API_URL}/submissions/grade/${submissionId}`,
      { grade, feedBack: feedback },
      config
    );
    return response.data.data;
  }
);

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState: {
    submissions: [],
    assignmentSubmissions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAssignmentSubmissions: (state) => {
      state.assignmentSubmissions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch student submissions
      .addCase(fetchSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch submissions by assignment
      .addCase(fetchSubmissionsByAssignment.fulfilled, (state, action) => {
        
        state.assignmentSubmissions = action.payload;
      })
      // Submit assignment
      .addCase(submitAssignment.pending, (state) => {
         state.loading = true;
         state.error = null
      })
      .addCase(submitAssignment.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload
      })
      .addCase(submitAssignment.fulfilled, (state, action) => {
        state.submissions = [action.payload, ...state.submissions];
        state.assignmentSubmissions = [action.payload, ...state.assignmentSubmissions];
        state.loading = false;
      })
      // Grade submission
      .addCase(gradeSubmission.fulfilled, (state, action) => {
        const index = state.assignmentSubmissions.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.assignmentSubmissions[index] = action.payload;
        }
      });
  },
});

export const { clearAssignmentSubmissions } = submissionsSlice.actions;

// Selectors
export const selectSubmissions = (state) => state.submissions.submissions;
export const selectAssignmentSubmissions = (state) =>
  state.submissions.assignmentSubmissions;
export const selectSubmissionsLoading = (state) => state.submissions.loading;
export const selectSubmissionsError = (state) => state.submissions.error;

export default submissionsSlice.reducer;