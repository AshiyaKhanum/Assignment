import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './image.css'

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      setImages([...images, ...response.data]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const loadMoreImages = () => {
    setPage(page + 1);
    fetchImages();
  };

  return (
    <Container>
      <Row>
        {images.map(image => (
          <Col key={image.id} xs={12} sm={6} md={4} lg={3}>
            <img src={image.download_url} alt={`Image ${image.id}`} className="img-fluid mb-3" />
          </Col>
        ))}
      </Row>
      <Row className='row1'>
        <Col className="text-center">
          <Button onClick={loadMoreImages}>Load More</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ImageGallery;