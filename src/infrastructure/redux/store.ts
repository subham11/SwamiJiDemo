import { configureStore } from '@reduxjs/toolkit';
import swamiJiReducer from './slices/swamiJiSlice';
import languageReducer from './slices/languageSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    swamiJi: swamiJiReducer,
    language: languageReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
