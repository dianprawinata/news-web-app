import React, { useEffect, useState } from 'react';
import CardComponent from '../components/Card';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { getNewsFromAPI } from '../api';
import { useParams } from 'react-router-dom';

const SearchPage = () => {
  const { searchTerm } = useParams(); // Get the search term from the URL
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // This effect runs when the component mounts and when the search term changes
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const news = await getNewsFromAPI(searchTerm); // Fetch articles using the search term
        setArticles(news);
      } catch (error) {
        setError("Failed to fetch news. Please check your API key and network.");
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchArticles(); // Fetch articles if there is a search term
    }
  }, [searchTerm]); // Effect depends on the searchTerm

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Search Results for "{searchTerm}"</h1>
      {error && <div>{error}</div>}
      <Row>
        {articles.length > 0 ? (
          articles.map((article) => (
            <Col md={4} key={article._id}>
              <CardComponent article={article} />
            </Col>
          ))
        ) : (
          <div>No articles found for this search.</div>
        )}
      </Row>
    </Container>
  );
};

export default SearchPage;
