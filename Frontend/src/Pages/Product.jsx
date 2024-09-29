import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='product'>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox productId={productId} /> {/* Pass productId to DescriptionBox */}
      <RelatedProduct category={product.category} /> {/* Pass the category prop */}
    </div>
  );
};

export default Product;
