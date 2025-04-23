import React from 'react'

import HeroSection from "../Components/HeroSection"
import Profile from "../Components/Profile"
import Cart from "../Components/Cart"
export default function CheckoutPage() {
  return (
    <>
        <HeroSection title="Place Order"/>

        <div className="container-fluid my-3">
            <div className="row">
                <div className="col-md-6">
                    <Profile title="Checkout"/>
                </div>
                <div className="col-md-6">
                    <Cart title="Checkout"/>
                </div>
            </div>
        </div>
    </>
  )
}
