import React, { useState, useEffect } from 'react'
import "./NewCollections.css"
// import new_collections from '../Assets/new_collections'
import Item from '../Item/Item'

const NewCollections = () => {

  const [newCollections, setNewCollections] = useState([])  

  useEffect(() => {
    fetch('https://backend-main-yi7u.onrender.com/newcollection')
      .then((response) => response.json())
      .then((data) => setNewCollections(data))

  }, [])
  return (
    <div className='newcollections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollections.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.images[0]} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewCollections