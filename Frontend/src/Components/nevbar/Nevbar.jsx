import React, { useContext, useRef, useState } from 'react'
import "./Nevbar.css"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nev_dropdown from "../Assets/images/dropdown.png"

const Nevbar = () => {

  const [menu,setMenu] = useState("shop")
  const { getTotalCartItems } = useContext(ShopContext)
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visiable')
    e.target.classList.toggle('open')
  }

  return (
    <div className='nevbar'>
        <div className="nev-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <img className='nev-dropdown' onClick={dropdown_toggle} src={nev_dropdown} alt="" />
        <ul ref={menuRef} className="nev-menu">
            <li onClick={() => setMenu("shop")}><Link style={{textDecoration: 'none'}} to="/">Home</Link> {menu === "shop" ? <hr /> : <></>}</li>
            <li onClick={() => setMenu("mens")}><Link style={{textDecoration: 'none'}} to='/mens'>Shop</Link>{menu === "mens" ? <hr /> : <></>}</li>
            <li onClick={() => setMenu("kids")}><Link style={{textDecoration: 'none'}} to='/contact'>Contact</Link>{menu === "kids" ? <hr /> : <></>}</li>
        </ul>
        <div className="nev-login-cart">
            {localStorage.getItem('auth-token')
            ?<button onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link to='/login'><button>Login</button></Link>}
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nev-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Nevbar