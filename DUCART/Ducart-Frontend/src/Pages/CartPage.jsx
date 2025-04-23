import React from 'react'

import HeroSection from "../Components/HeroSection"
import Cart from '../Components/Cart'
export default function CartPage() {
    return (
        <>
            <HeroSection title="Cart Section" />

            <div className="container-fluid my-3">
                <Cart title="Cart" />
            </div>
        </>
    )
}
