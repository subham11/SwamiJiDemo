import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isMobileMenuOpen: boolean;
  activeSection: string;
  scrollProgress: number;
  isScrolled: boolean;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  activeSection: 'home',
  scrollProgress: 0,
  isScrolled: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setScrollProgress: (state, action: PayloadAction<number>) => {
      state.scrollProgress = action.payload;
    },
    setIsScrolled: (state, action: PayloadAction<boolean>) => {
      state.isScrolled = action.payload;
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  setActiveSection,
  setScrollProgress,
  setIsScrolled,
} = uiSlice.actions;

export default uiSlice.reducer;
