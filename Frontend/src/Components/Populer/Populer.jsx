import React, { useState, useEffect } from 'react'
import "./Populer.css"
import Item from '../Item/Item'

const Populer = () => {

  const [popular, setPopular] = useState([])  

  useEffect(() => {
    fetch('https://backend-main-yi7u.onrender.com/popular')
      .then((response) => response.json())
      .then((data) => setPopular(data))

  }, [])
  return (
    <div className='popular'>
        <h1>POPULER</h1>
        <hr />
        <div className="popular-item">
          {popular.map((item,i) => {
            return <Item key = {i} id={item.id} name={item.name} image={item.images[0]} new_price = {item.new_price} old_price = {item.old_price}/>
          } )}
        </div>
    </div>
  )
}

export default Populer