import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import negotiationService from './negotiationService';

const initialState = {
  negotiations: [],
  currentNegotiation: null,
  messages: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const startNegotiation = createAsyncThunk(
  'negotiation/start',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await negotiationService.startNegotiation(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getMyNegotiations = createAsyncThunk(
  'negotiation/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await negotiationService.getMyNegotiations(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getNegotiationMessages = createAsyncThunk(
  'negotiation/getMessages',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await negotiationService.getNegotiationMessages(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const negotiationSlice = createSlice({
  name: 'negotiation',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateNegotiation: (state, action) => {
      state.currentNegotiation = action.payload;
    },
    setTyping: (state, action) => {
      // Logic for typing indicators if needed in state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(startNegotiation.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(startNegotiation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentNegotiation = action.payload;
      })
      .addCase(startNegotiation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyNegotiations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyNegotiations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.negotiations = action.payload;
      })
      .addCase(getMyNegotiations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getNegotiationMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNegotiationMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(getNegotiationMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset, addMessage, updateNegotiation } = negotiationSlice.actions;
export default negotiationSlice.reducer;
