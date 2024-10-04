import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNews, unsaveNews } from '../store/savedSlice';

const NewsList = ({ articles }) => {
  return (
    <div className="news-list">
      {articles.map((article) => (
        <Card key={article._id ? article._id : article.web_url} article={article} />
      ))}
    </div>
  );
};

const Card = ({ article }) => {
  const dispatch = useDispatch();
  const savedArticles = useSelector((state) => state.saved.savedArticles);

  // Local state to track whether this specific article is saved
  const [isSaved, setIsSaved] = useState(false);

  // Menggunakan _id sebagai identifier
  const articleId = article._id ? article._id : article.web_url;

  useEffect(() => {
    const articleSavedStatus = savedArticles.some((a) => a._id === articleId);
    setIsSaved(articleSavedStatus);
  }, [savedArticles, articleId]);

  const handleSave = () => {
    if (isSaved) {
      dispatch(unsaveNews(article)); // Unsave the article in Redux
      console.log(`Un-saving article: ${articleId}`);
    } else {
      dispatch(saveNews(article)); // Save the article in Redux
      console.log(`Saving article: ${articleId}`);
    }
    setIsSaved(!isSaved); // Update local state
  };

  return (
    <div className="card mb-4">
      {article.multimedia && article.multimedia[0] && (
        <img
          src={`https://www.nytimes.com/${article.multimedia[0].url}`}
          alt={article.headline.main}
          className="card-img-top img-fluid"
          style={{ maxHeight: '200px', objectFit: 'none', width: '100%', objectPosition: 'center' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{article.headline.main}</h5>
        <p className="card-text">{article.snippet}</p>
        <a href={article.web_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2">
          News Page
        </a>
        <button
          onClick={handleSave}
          className={`btn ${isSaved ? 'btn-warning' : 'btn-secondary'}`}
        >
          {isSaved ? 'Un-Save' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default Card;
