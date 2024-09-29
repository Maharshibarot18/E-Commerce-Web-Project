import React, { useState, useEffect } from 'react';
import './DescriptionBox.css';

const DescriptionBox = ({ productId }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(`https://backend-main-yi7u.onrender.com/product/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product description');
        }
        const product = await response.json();
        if (product && product.description) {
          setDescription(product.description);
        } else {
          setDescription('Description not available');
        }
      } catch (error) {
        console.error('Error fetching product description:', error);
        setDescription('Failed to fetch description');
      }
    };

    fetchDescription();
  }, [productId]);

  // Function to render description with paragraphs
  const renderDescription = () => {
    if (!description) {
      return <p>Loading description...</p>;
    }

    // Split description by new lines or use <br> tags if necessary
    return description.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nev-box">Description</div>
        {/* Add more navigation elements if needed */}
      </div>
      <div className="descriptionbox-description">
        {renderDescription()}
      </div>
    </div>
  );
}

export default DescriptionBox;
