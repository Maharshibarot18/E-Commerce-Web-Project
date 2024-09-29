import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import remove from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('https://backend-main-yi7u.onrender.com/allproduct')
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) })
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch('https://backend-main-yi7u.onrender.com/removeproduct',{
            method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({id:id})
        })
        await fetchInfo()
        console.log("product Removed")
    }

    return (
        <div className='list-product'>
            <h1>All Product List</h1>
            <div className="listproduct-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproduct">
                <hr />
                {allproducts.map((product, index) => {
                    return <>
                        <div key={index} className="listproduct-format-main listproduct-format">
                            <img className='listproduct-product-icon' src={product.images[0]} alt="" />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={() => {remove_product(product.id)}} src={remove} className='listproduct-remove-icon' alt="" />
                        </div>
                        <hr />
                    </>
                })}
            </div>
        </div>
    )
}

export default ListProduct