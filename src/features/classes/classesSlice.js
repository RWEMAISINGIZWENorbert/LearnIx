// src/features/classes/classesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all classes
export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
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
        `${API_BASE_URL}/classes`,
        config
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch classes'
      );
    }
  }
);

// Async thunk to create a new class
export const createNewClass = createAsyncThunk(
  'classes/create',
  async (classData, { getState, rejectWithValue }) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const { auth } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      };
      console.log(`Class Data : Name ${classData.name} Teacher ID ${classData.teacherId} Status ${classData.status} Teacher Name ${classData.teacherName}`);
      const response = await axios.post(
        `${API_BASE_URL}/classes/create`,
        {
          name: classData.name,
          teacherId: classData.teacherId,
          teacherName: classData.teacherName,  // Include teacher's name
          status: classData.status
        },
        config
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to create class'
      );
    }
  }
);

const initialState = {
  classes: [],
  loading: false,
  error: null,
  currentClass: null,
  createStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  createError: null,
};

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    clearClassesError: (state) => {
      state.error = null;
      state.createError = null;
    },
    setCurrentClass: (state, action) => {
      state.currentClass = action.payload;
    },
    resetCreateStatus: (state) => {
      state.createStatus = 'idle';
      state.createError = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch classes
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create class
      .addCase(createNewClass.pending, (state) => {
        state.createStatus = 'loading';
        state.createError = null;
      })
      .addCase(createNewClass.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.classes.push(action.payload);
      })
      .addCase(createNewClass.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = action.payload;
      });
  },
});

// Export actions
export const { 
  clearClassesError, 
  setCurrentClass,
  resetCreateStatus
} = classesSlice.actions;

// Selectors
export const selectAllClasses = (state) => state.classes.classes;
export const selectClassesLoading = (state) => state.classes.loading;
export const selectClassesError = (state) => state.classes.error;
export const selectCurrentClass = (state) => state.classes.currentClass;
export const selectCreateStatus = (state) => state.classes.createStatus;
export const selectCreateError = (state) => state.classes.createError;

export default classesSlice.reducer;