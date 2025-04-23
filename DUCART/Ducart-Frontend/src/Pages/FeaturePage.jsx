import React from 'react'

import HeroSection from "../Components/HeroSection"
import Features from "../Components/Features"
import About from "../Components/About"
import Testimonial from "../Components/Testimonial"
export default function FeaturePage() {
    return (
        <>
            <HeroSection title="Features" />
            <Features />
            <About />
            <Testimonial />
        </>
    )
}
