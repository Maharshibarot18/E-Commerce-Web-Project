import React, { useContext, useState } from 'react';
import "./CSS/ShopCategory.css";
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [displayCount, setDisplayCount] = useState(12);

  if (!all_product) {
    return <div>Loading...</div>;
  }

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 12);
  };

  return (
    <div className='shop-category'>
      {/* <img className='shopcategory-banner' src={props.banner} alt="" /> */}
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{Math.min(displayCount, all_product.length)}</span> out of {all_product.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-product">
        {all_product.slice(0, displayCount).map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.images[0]} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      {displayCount < all_product.length && (
        <div className="shopcategory-loadmore" onClick={handleLoadMore}>
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
