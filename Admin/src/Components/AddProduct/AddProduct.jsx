import React, { useState } from 'react';
import "./AddProduct.css";
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [images, setImages] = useState(["", "", "", ""]); // Initialize with four empty strings
    const [productDetails, setProductDetails] = useState({
        name: "",
        images: [],
        category: "women",
        new_price: "",
        old_price: "",
        short_description: "", // Add short description field
        description: "" // Add description field
    });

    const imageHandler = (index) => (e) => {
        const newImages = [...images];
        newImages[index] = e.target.value;
        setImages(newImages);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const addProduct = async () => {
        console.log(productDetails);
        let responseData;
        let product = { ...productDetails, images };

        await fetch('https://backend-main-yi7u.onrender.com/addproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product),
        }).then((resp) => resp.json()).then((data) => {
            data.success ? alert("Product is added") : alert("Failed");
        });
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type Here' />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="number" name="old_price" placeholder='Type Here' />
                </div>

                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="number" name="new_price" placeholder='Type Here' />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">women</option>
                    <option value="men">men</option>
                    <option value="kid">kid</option>
                </select>
            </div>

            <div className="addproduct-itemfield">
                <p>Short Description</p>
                <textarea value={productDetails.short_description} onChange={changeHandler} name="short_description" placeholder='Type Here' />
            </div>

            <div className="addproduct-itemfield">
                <p>Description</p>
                <textarea value={productDetails.description} onChange={changeHandler} name="description" placeholder='Type Here' />
            </div>

            <div className="addproduct-itemfield">
                {[0, 1, 2, 3].map((index) => (
                    <div key={index}>
                        <p>Image URL {index + 1}</p>
                        <input
                            value={images[index]}
                            onChange={imageHandler(index)}
                            type="text"
                            name={`image-${index}`}
                            placeholder='Paste Image URL Here'
                        />
                        {images[index] && (
                            <img src={images[index]} className='addproduct-thumbnail-img' alt={`Preview ${index + 1}`} />
                        )}
                    </div>
                ))}
            </div>

            <button onClick={addProduct} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProduct;
