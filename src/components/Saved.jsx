import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromSaved } from '../redux/savedSlice';

const Saved = () => {
  const dispatch = useDispatch();
  const savedArticles = useSelector((state) => state.saved.articles);

  return (
    <div>
      <h1 className="mb-4">Saved Articles</h1>
      {savedArticles.length === 0 && <p>No saved articles.</p>}
      <div className="row">
        {savedArticles.map((article) => (
          <div className="col-md-4 mb-4" key={article.url}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{article.source}</h6>
                <p className="card-text">{article.abstract}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2">News Page</a>
                <button 
                  onClick={() => dispatch(removeFromSaved(article))} 
                  className="btn btn-warning"
                >
                  Un-Saved
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
