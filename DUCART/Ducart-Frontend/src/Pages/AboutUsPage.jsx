import React from 'react'

import HeroSection from "../Components/HeroSection"
import About from "../Components/About"
import Testimonial from "../Components/Testimonial"
export default function AboutUsPage() {
    return (
        <>
            <HeroSection title="About Us"/>
            <About />
            <Testimonial />
        </>
    )
}
