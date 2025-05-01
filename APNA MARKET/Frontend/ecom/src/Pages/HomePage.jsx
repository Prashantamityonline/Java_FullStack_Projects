import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import About from '../Components/About'
import Values from '../Components/Values'
import Facts from '../Components/Facts'
import Features from '../Components/Features'
import ProductsSlider from '../Components/ProductsSlider'
import Products from '../Components/Products'
import Testimonial from '../Components/Testimonial'
import CategorySlider from '../Components/CategorySlider'
import { Link } from 'react-router-dom'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"

export default function HomePage() {
  let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
  let ProductStateData = useSelector((state) => state.ProductStateData)

  let dispatch = useDispatch()


  useEffect(() => {
    dispatch(getMaincategory())
  }, [MaincategoryStateData.length])

  useEffect(() => {
    dispatch(getProduct())
  }, [ProductStateData.length])
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <section id="hero" className="hero section">
              <div className="container">
                <div className="row gy-4">
                  <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                    <h1 data-aos="fade-up">We offer modern and top brands products for male</h1>
                    <p data-aos="fade-up" data-aos-delay="100">We Deals in Top 50+ brands and provide upto 90% Descount on top and latest fashion brands</p>
                    <div className="d-flex flex-column flex-md-row" data-aos="fade-up" data-aos-delay="200">
                      <Link to="/shop?mc=Male" className="btn-get-started">Shop Now<i className="bi bi-arrow-right"></i></Link>
                    </div>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-out">
                    <img src="/assets/img/banner/banner1.jpg" className="img-fluid animated" alt="" />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="carousel-item">
            <section id="hero" className="hero section">
              <div className="container">
                <div className="row gy-4">
                  <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                    <h1 data-aos="fade-up">We offer modern and top brands products for female</h1>
                    <p data-aos="fade-up" data-aos-delay="100">We Deals in Top 50+ brands and provide upto 90% Descount on top and latest fashion brands</p>
                    <div className="d-flex flex-column flex-md-row" data-aos="fade-up" data-aos-delay="200">
                      <Link to="/shop?mc=Female" className="btn-get-started">Shop Now<i className="bi bi-arrow-right"></i></Link>
                    </div>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-out">
                    <img src="/assets/img/banner/banner3.jpg" className="img-fluid animated" alt="" />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="carousel-item">
            <section id="hero" className="hero section">
              <div className="container">
                <div className="row gy-4">
                  <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                    <h1 data-aos="fade-up">We offer modern and top brands products for kids</h1>
                    <p data-aos="fade-up" data-aos-delay="100">We Deals in Top 50+ brands and provide upto 90% Descount on top and latest fashion brands</p>
                    <div className="d-flex flex-column flex-md-row" data-aos="fade-up" data-aos-delay="200">
                      <Link to="/shop?mc=Kids" className="btn-get-started">Shop Now<i className="bi bi-arrow-right"></i></Link>
                    </div>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-out">
                    <img src="/assets/img/banner/banner4.jpg" className="img-fluid animated" alt="" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <About title="Home"/>
      <CategorySlider title="Maincategory" />
      <Products />
      
      <Values />
      {
        MaincategoryStateData.filter((x) => x.active).map((item) => {
          return <ProductsSlider key={item.id} title={item.name} data={ProductStateData.filter(x => x.active && x.maincategory === item.name)} />
        })
      }
      <Facts />
      <CategorySlider title="Subcategory" />
      <Features />
      <Testimonial />
      <CategorySlider title="Brand" />
    </>
  )
}
