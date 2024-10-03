import { createSlice } from '@reduxjs/toolkit';

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    articles: [],
  },
  reducers: {
    addToSaved: (state, action) => {
      state.articles.push(action.payload);
    },
    removeFromSaved: (state, action) => {
      state.articles = state.articles.filter(article => article.url !== action.payload.url);
    },
  },
});

export const { addToSaved, removeFromSaved } = savedSlice.actions;
export default savedSlice.reducer;
