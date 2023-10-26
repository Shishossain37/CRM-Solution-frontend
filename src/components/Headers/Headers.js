import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../images/user.png'
import Logout from '../Logout/Logout'
const Headers = () => {

  const getName = () => {
    const userDetails = JSON.parse(localStorage.getItem("user"))
    return userDetails.name
  }

  return (
    <>
      <Navbar className='p-2' variant="dark" style={{ height: "3rem", backgroundColor: "#5861ae", color: "#FFF", width: "212vh" }}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/"><h5 >Custome</h5></Link>
        <div style={{ position: "relative", left: "84%" }}>
          <img style={{ width: "50px" }} src={profile} alt="profile" /><span className='username'>{getName()}</span>

        </div>
        <div >
          <Logout  />
        </div>
      </Navbar>
    </>
  )
}

export default Headers