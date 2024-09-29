import React from 'react'
import "./Nevbar.css"
import navlogo from '../../assets//nav-logo.svg'
import nav_profile from '../../assets/nav-profile.svg'

const Nevbar = () => {
  return (
    <div className='nevbar'>
        <img src={navlogo} alt="" className="nav-logo" />
        <img src={nav_profile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Nevbar