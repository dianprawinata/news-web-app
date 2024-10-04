import { createSlice } from '@reduxjs/toolkit';

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    savedArticles: [],
  },
  reducers: {
    saveNews: (state, action) => {
      const exists = state.savedArticles.find(article => article._id === action.payload._id);
      if (!exists) {
        state.savedArticles.push(action.payload);
      }
    },
    unsaveNews: (state, action) => {
      state.savedArticles = state.savedArticles.filter(
        (article) => article._id !== action.payload._id
      );
    },
  },
});

export const { saveNews, unsaveNews } = savedSlice.actions;
export default savedSlice.reducer;
