import React from 'react'
import { Link } from 'react-router-dom'

export default function About({ title }) {
    return (
        <section id="about" className="about section">

            <div className="container" data-aos="fade-up">
                <div className="row gx-0">

                    <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                        <div className="content">
                            <h3>Who We Are</h3>
                            <h2>Apna Bazar – Shop Top Brand Clothing for Men, Women & Kids at Great Prices, Delivered to Your Doorstep with Trust and Style</h2>
                            <p className='text-justify'>At Apna Bazar, we bring you the latest fashion from the world’s top brands like Adidas, Nike, Puma, Mufti, and more — all in one convenient place. Whether you're shopping for men, women, or kids, we’ve got premium clothing that suits every style and budget. Our goal is to make branded fashion accessible with the ease of online shopping and the comfort of home delivery. With trusted quality, secure payments, and fast delivery, Apna Bazar is your go-to destination for stylish, affordable, and authentic apparel. Dress smart, shop smart — only at Apna Bazar.</p>
                            <div className="text-center text-lg-start">
                                {title === "Home" ?
                                    <Link to="/about" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                                        <span>Read More</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </Link> : null}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                        <img src="/assets/img/banner/banner6.jpg" className="img-fluid" alt="" />
                    </div>

                </div>
            </div>

        </section>
    )
}
