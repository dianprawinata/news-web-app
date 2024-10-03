import { combineReducers } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import savedReducer from './savedSlice';

const rootReducer = combineReducers({
  news: newsReducer,
  saved: savedReducer,
});

export default rootReducer;
