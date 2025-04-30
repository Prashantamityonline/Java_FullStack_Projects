import React from 'react'

import pic from "../assets/images/banner2.jpg"
export default function ImageExample() {
    return (
        <>
            <h1>Images Example</h1>
            {/* When images are in src folder */}
            <img src={require("../assets/images/banner1.jpg")} height={333} width={500} alt="" />
            <img src={pic} height={333} width={500} alt="" />

            {/* when images are in public folder */}
            <img src="/images/banner3.jpg" height={333} width={500} alt="" />
        </>
    )
}
