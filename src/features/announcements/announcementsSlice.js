import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching all announcements
export const fetchAllAnnouncements = createAsyncThunk(
  'announcements/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const { auth } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      };

      const response = await axios.get(`${API_URL}/announcements`, config);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching announcements:', error);
      if (error.response) {
        return rejectWithValue(error.response.data?.message || 'Failed to fetch announcements');
      } else if (error.request) {
        return rejectWithValue('No response received from server');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk for creating an announcement
export const createAnnouncement = createAsyncThunk(
  'announcements/create',
  async (announcementData, { getState, rejectWithValue }) => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const { auth } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      };

      const response = await axios.post(
        `${API_URL}/announcements/new`,
        announcementData,
        config
      );
      return response.data.data;
    } catch (error) {
      console.error('Error creating announcement:', error);
      if (error.response) {
        return rejectWithValue(error.response.data?.message || 'Failed to create announcement');
      } else if (error.request) {
        return rejectWithValue('No response received from server');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk for updating an announcement
export const updateAnnouncement = createAsyncThunk(
  'announcements/update',
  async ({ id, announcementData }, { getState, rejectWithValue }) => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const { auth } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      };

      const response = await axios.put(
        `${API_URL}/announcements/update/${id}`,
        announcementData,
        config
      );
      return response.data.data;
    } catch (error) {
      console.error('Error updating announcement:', error);
      if (error.response) {
        return rejectWithValue(error.response.data?.message || 'Failed to update announcement');
      } else if (error.request) {
        return rejectWithValue('No response received from server');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk for deleting an announcement
export const deleteAnnouncement = createAsyncThunk(
  'announcements/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const { auth } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      };
      console.log(`Anouncement Id to be deleted: ${id}`);
      await axios.delete(`${API_URL}/announcements/delete/${id}`, config);
      return id; // Return the deleted announcement ID
    } catch (error) {
      console.error('Error deleting announcement:', error);
      if (error.response) {
        return rejectWithValue(error.response.data?.message || 'Failed to delete announcement');
      } else if (error.request) {
        return rejectWithValue('No response received from server');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  announcements: [],
  loading: false,
  error: null,
  success: false,
};

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    resetAnnouncementState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch all announcements
    builder.addCase(fetchAllAnnouncements.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllAnnouncements.fulfilled, (state, action) => {
      state.loading = false;
      state.announcements = action.payload;
      state.success = true;
    });
    builder.addCase(fetchAllAnnouncements.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch announcements';
    });

    // Create announcement
    builder.addCase(createAnnouncement.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
      state.announcements.push(action.payload);
      state.success = true;
    });
    builder.addCase(createAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to create announcement';
    });

    // Update announcement
    builder.addCase(updateAnnouncement.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.announcements.findIndex(a => a._id === action.payload._id);
      if (index !== -1) {
        state.announcements[index] = action.payload;
      }
      state.success = true;
    });
    builder.addCase(updateAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to update announcement';
    });

    // Delete announcement
    builder.addCase(deleteAnnouncement.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
      state.announcements = state.announcements.filter(
        (announcement) => announcement._id !== action.payload
      );
      state.success = true;
    });
    builder.addCase(deleteAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to delete announcement';
    });
  },
});

export const { resetAnnouncementState } = announcementsSlice.actions;

// Selectors
export const selectAnnouncements = (state) => state.announcements.announcements;
export const selectAnnouncementsLoading = (state) => state.announcements.loading;
export const selectAnnouncementsError = (state) => state.announcements.error;
export const selectAnnouncementsSuccess = (state) => state.announcements.success;

export default announcementsSlice.reducer;
