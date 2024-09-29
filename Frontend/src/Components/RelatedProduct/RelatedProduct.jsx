import React, { useState, useEffect } from 'react';
import "./RelatedProduct.css";
import Item from '../Item/Item';

const RelatedProduct = ({ category }) => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch('https://backend-main-yi7u.onrender.com/allproduct')
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data;
        // Slice the array to get only the first 4 items
        setPopular(filteredProducts.slice(0, 4));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [category]);

  return (
    <div className='relatedproducts'>
      <h1>Related Product</h1>
      <hr />
      <div className="relatedproducts-item">
        {popular.map((item, i) => (
          <Item 
            key={i} 
            id={item.id} 
            name={item.name} 
            image={item.images[0]}
            new_price={item.new_price} 
            old_price={item.old_price} 
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
