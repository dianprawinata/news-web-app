import React, { useEffect, useState } from 'react';
import CardComponent from '../components/Card';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { getNewsFromAPI } from '../api';

const IndonesiaPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const news = await getNewsFromAPI('indonesia');
        setArticles(news);
      } catch (error) {
        setError("Failed to fetch news. Please check your API key and network.");
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;  // Tampilkan loading spinner
  }

  if (error) {
    return <div>{error}</div>;  // Tampilkan pesan error jika ada
  }

  return (
    <Container>
      <h1>Indonesia News</h1>
      <Row>
        {articles.map((article) => (
          <Col md={4} key={article._id}>
            <CardComponent article={article} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default IndonesiaPage;
