import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SwamiJi, Teaching, Quote, Event } from '@/domain/entities/SwamiJi';

interface SwamiJiState {
  info: SwamiJi | null;
  teachings: Teaching[];
  quotes: Quote[];
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: SwamiJiState = {
  info: null,
  teachings: [],
  quotes: [],
  events: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchSwamiJiInfo = createAsyncThunk(
  'swamiJi/fetchInfo',
  async () => {
    // This will be connected to your use case
    const response = await fetch('/api/swamiji/info');
    return response.json();
  }
);

export const fetchTeachings = createAsyncThunk(
  'swamiJi/fetchTeachings',
  async () => {
    const response = await fetch('/api/swamiji/teachings');
    return response.json();
  }
);

export const fetchQuotes = createAsyncThunk(
  'swamiJi/fetchQuotes',
  async () => {
    const response = await fetch('/api/swamiji/quotes');
    return response.json();
  }
);

export const fetchEvents = createAsyncThunk(
  'swamiJi/fetchEvents',
  async () => {
    const response = await fetch('/api/swamiji/events');
    return response.json();
  }
);

const swamiJiSlice = createSlice({
  name: 'swamiJi',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Info
      .addCase(fetchSwamiJiInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSwamiJiInfo.fulfilled, (state, action: PayloadAction<SwamiJi>) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchSwamiJiInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch info';
      })
      // Fetch Teachings
      .addCase(fetchTeachings.fulfilled, (state, action: PayloadAction<Teaching[]>) => {
        state.teachings = action.payload;
      })
      // Fetch Quotes
      .addCase(fetchQuotes.fulfilled, (state, action: PayloadAction<Quote[]>) => {
        state.quotes = action.payload;
      })
      // Fetch Events
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.events = action.payload;
      });
  },
});

export const { clearError } = swamiJiSlice.actions;
export default swamiJiSlice.reducer;
