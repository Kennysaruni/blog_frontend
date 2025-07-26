import React from 'react'
// import { CiSearch } from "react-icons/ci";
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar-container'>
      <h2 className='nav-title'>Bloggr</h2>
      <input type="text" className='blog-search' placeholder='Search' />

      <div className="nav-items">
        <ul>
          <li>Blogs</li>
          <li>Create Blog</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
