import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import savedReducer from './savedSlice';
import searchReducer from './searchSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    saved: savedReducer,
    search: searchReducer,
  },
});

export default store;
