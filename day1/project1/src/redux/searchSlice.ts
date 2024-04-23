import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchType: 'characters',
  searchQuery: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchType, setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
