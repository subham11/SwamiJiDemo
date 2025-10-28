import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'en' | 'hi';

interface LanguageState {
  current: Language;
}

const initialState: LanguageState = {
  current: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.current = action.payload;
    },
    toggleLanguage: (state) => {
      state.current = state.current === 'en' ? 'hi' : 'en';
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
