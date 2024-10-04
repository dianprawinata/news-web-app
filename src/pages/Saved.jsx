import React from 'react';
import CardComponent from '../components/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const SavedPage = () => {
  const savedArticles = useSelector((state) => state.saved.savedArticles);

  return (
    <Container>
      <h1>Saved Articles</h1>
      <Row>
        {savedArticles.length === 0 ? (
          <div>No saved articles.</div>
        ) : (
          savedArticles.map((article) => (
            <Col md={4} key={article._id}>
              <CardComponent article={article} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default SavedPage;
