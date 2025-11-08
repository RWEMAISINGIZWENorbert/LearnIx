
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch teachers
export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
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
        `${API_BASE_URL}/teachers`,
        config
      );

      return response.data.data; // Returns the array of teachers
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch teachers'
      );
    }
  }
);

const initialState = {
  teachers: [],
  loading: false,
  error: null,
  currentTeacher: null,
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    clearTeachersError: (state) => {
      state.error = null;
    },
    setCurrentTeacher: (state, action) => {
      state.currentTeacher = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearTeachersError, setCurrentTeacher } = teachersSlice.actions;

// Selectors
export const selectAllTeachers = (state) => state.teachers.teachers;
export const selectTeachersLoading = (state) => state.teachers.loading;
export const selectTeachersError = (state) => state.teachers.error;
export const selectCurrentTeacher = (state) => state.teachers.currentTeacher;

export default teachersSlice.reducer;
