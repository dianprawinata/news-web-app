import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsByQuery } from '../redux/newsSlice';
import { addToSaved, removeFromSaved } from '../redux/savedSlice';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.news.articles);
  const newsStatus = useSelector((state) => state.news.status);
  const savedArticles = useSelector((state) => state.saved.articles) || [];

  const handleSearch = () => {
    if (query) {
      dispatch(fetchNewsByQuery(query));
    }
  };

  const isSaved = (article) => savedArticles.some(saved => saved.url === article.url);

  return (
    <div>
      <h1 className="mb-4">Search Global News</h1>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search news..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
      {newsStatus === 'loading' && <p>Loading...</p>}
      {newsStatus === 'succeeded' && (
        <div className="row">
          {searchResults.map((article) => (
            <div className="col-md-4 mb-4" key={article.url}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{article.source}</h6>
                  <p className="card-text">{article.abstract}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2">News Page</a>
                  <button 
                    onClick={() => {
                      if (isSaved(article)) {
                        dispatch(removeFromSaved(article));
                      } else {
                        dispatch(addToSaved(article));
                      }
                    }} 
                    className={`btn ${isSaved(article) ? 'btn-warning' : 'btn-secondary'}`}
                  >
                    {isSaved(article) ? 'Un-Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {newsStatus === 'failed' && <p>Failed to load news.</p>}
    </div>
  );
};

export default Search;
