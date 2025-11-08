import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_BASE_URL } from '../../config/api';

// Async thunk to fetch students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
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
        `${API_BASE_URL}/students`,
        config
      );

      return response.data.data; // Returns the array of students
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch students'
      );
    }
  }
);

const initialState = {
  students: [],
  loading: false,
  error: null,
  currentStudent: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearStudentsError: (state) => {
      state.error = null;
    },
    setCurrentStudent: (state, action) => {
      state.currentStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearStudentsError, setCurrentStudent } = studentsSlice.actions;

// Selectors
export const selectAllStudents = (state) => state.students.students;
export const selectStudentsLoading = (state) => state.students.loading;
export const selectStudentsError = (state) => state.students.error;
export const selectCurrentStudent = (state) => state.students.currentStudent;

export default studentsSlice.reducer;