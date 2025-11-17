import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Async thunks
export const fetchAssignments = createAsyncThunk(
  'assignments/fetchAll',
  async (_, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
      },
    };
    const response = await axios.get(`${API_URL}/assignments`, config);
    return response.data;
  }
);

export const fetchAssignmentById = createAsyncThunk(
  'assignments/fetchById',
  async (id, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
      },
    };
    const response = await axios.get(`${API_URL}/assignments/${id}`, config);
    return response.data.data;
  }
);

export const createAssignment = createAsyncThunk(
  'assignments/create',
  async (assignmentData, { getState }) => {
    const { auth } = getState();
    // const formData = new FormData();
    // formData.append('title', assignmentData.title);
    // formData.append('description', assignmentData.description);
    // formData.append('dueDate', assignmentData.dueDate);
    // if (assignmentData.file) {
    //   formData.append('assignment', assignmentData.file);
    // }
    console.log(`The Assignments Title ${assignmentData.get('title')}`);
    console.log(`The Assignments descr ${assignmentData.get('description')}`);
    console.log(`The Assignments Data ${assignmentData.get('dueDate')}`);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${auth.token}`,
      },
    };

    const response = await axios.post(`${API_URL}/assignments/new`, assignmentData, config);
    return response.data.data;
  }
);

export const updateAssignment = createAsyncThunk(
  'assignments/update',
  async ({ id, assignmentData }, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
      },
    };
    const response = await axios.put(
      `${API_URL}/assignments/update/${id}`,
      assignmentData,
      config
    );
    return response.data.data;
  }
);

export const deleteAssignment = createAsyncThunk(
  'assignments/delete',
  async (id, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        'Authorization': `Bearer ${auth.token}`,
      },
    };
    await axios.delete(`${API_URL}/assignments/delete/${id}`, config);
    return id;
  }
);

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState: {
    assignments: [],
    pendingAssignments: [],
    submittedAssignments: [],
    gradedAssignments: [],
    currentAssignment: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentAssignment: (state) => {
      state.currentAssignment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all assignments
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload.data || [];
        state.pendingAssignments = action.payload.pendingAssignments || [];
        state.submittedAssignments = action.payload.submittedAssignments || [];
        state.gradedAssignments = action.payload.gradedAssignments || [];

        console.log(`assignments,${state.assignments}`);
        console.log(`pendingAssignments, ${state.pendingAssignments}`);
        console.log(`submittedAssignments, ${state.submittedAssignments}`);
        console.log(`gradedAssignments, ${state.gradedAssignments}`);
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch single assignment
      .addCase(fetchAssignmentById.fulfilled, (state, action) => {
        state.loading = false
        state.currentAssignment = action.payload;
      })
      // Create assignment
      .addCase(createAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments.unshift(action.payload);
      })
      // Update assignment
      .addCase(updateAssignment.fulfilled, (state, action) => {
        const index = state.assignments.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index !== -1) {
          state.assignments[index] = action.payload;
        }
        state.currentAssignment = action.payload;
      })
      // Delete assignment
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter(
          (a) => a._id !== action.payload
        );
      });
  },
});

export const { clearCurrentAssignment } = assignmentsSlice.actions;

// Selectors
export const selectAssignments = (state) => state.assignments.assignments;
export const selectCurrentAssignment = (state) => state.assignments.currentAssignment;
export const selectAssignmentsLoading = (state) => state.assignments.loading;
export const selectAssignmentsError = (state) => state.assignments.error;

export const selectPendingAssignments = (state) => state.assignments.pendingAssignments ?? [];
export const selectSubmittedAssignments = (state) => state.assignments.submittedAssignments ?? [];
export const selectGradedAssignments = (state) => state.assignments.gradedAssignments ?? []; 

export default assignmentsSlice.reducer;