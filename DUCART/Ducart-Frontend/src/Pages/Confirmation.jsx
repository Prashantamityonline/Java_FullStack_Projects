import React from 'react'

import HeroSection from "../Components/HeroSection"
import { Link } from 'react-router-dom'
export default function Confirmation() {
  return (
    <>
        <HeroSection title="Order Confirmation"/>

        <div className="container-fluid my-3 text-center">
            <h2>Thank You</h2>
            <h3>Your Order has Been Placed</h3>
            <h4>Now You Can Track You  Order in Profile Page</h4>
            <Link to="/shop" className='btn btn-primary'>Shop More</Link>
        </div>
    </>
  )
}
