import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import Cart from '../Components/Cart'

export default function CartPage() {
    return (
        <>
            <Breadcrum title="Cart" />

            <div className="container-fluid my-3">
                <Cart title="Cart"/>
            </div>
        </>
    )
}
