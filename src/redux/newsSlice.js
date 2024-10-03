import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=yhE6zS2yeWHtvbLdmYsqePg9tHhI62Tn`);
  return response.data.results;
});

export const fetchNewsByQuery = createAsyncThunk('news/fetchNewsByQuery', async (query) => {
  const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=yhE6zS2yeWHtvbLdmYsqePg9tHhI62Tn`);
  return response.data.response.docs;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchNewsByQuery.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewsByQuery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchNewsByQuery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
