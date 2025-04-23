import React from 'react'

import HeroSection from "../Components/HeroSection"
import Testimonial from "../Components/Testimonial"
import About from "../Components/About"
import Features from '../Components/Features'
export default function TestimonialPage() {
    return (
        <>
            <HeroSection title="Testimonials" />
            <Testimonial />
            <About />
            <Features />
        </>
    )
}
