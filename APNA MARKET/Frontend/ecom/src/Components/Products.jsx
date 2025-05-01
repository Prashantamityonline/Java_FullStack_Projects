import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { Link } from 'react-router-dom'
export default function Products() {
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let [selectedCategory, setSelectedCategory] = useState("")
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct())
    }, [ProductStateData.length])

    useEffect(() => {
        dispatch(getMaincategory())
    }, [MaincategoryStateData.length])
    return (
        <>
            <section id="portfolio" className="portfolio section">

                <div className="container section-title" data-aos="fade-up">
                    <p>Check Our Latest Products</p>
                </div>

                <div className="container">

                    <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

                        <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
                            <li onClick={() => setSelectedCategory("")}>All</li>
                            {
                                MaincategoryStateData.filter(x => x.active).map(item => {
                                    return <li key={item.id} onClick={() => setSelectedCategory(item.name)}>{item.name}</li>
                                })
                            }
                        </ul>

                        <div className="row gy-4 isotope-container d-flex justify-content-center" data-aos="fade-up" data-aos-delay="200">

                            {
                                ProductStateData.filter((x) => x.active && (selectedCategory === "" || selectedCategory === x.maincategory)).slice(0,12).map((item) => {
                                    return <div key={item.id} className="col-lg-4 col-md-6 portfolio-item isotope-item">
                                        <div className="portfolio-content h-100">
                                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic[0]}`} style={{ height: 300, width: "100%" }} className="img-fluid" alt="" />
                                            <div className="portfolio-info">
                                                <h4>{item.maincategory}</h4>
                                                <h4 className='float-end'>{item.stock ? `${item.stockQuantity} Left In Stock` : "Out Of Stock"}</h4>
                                                <p style={{
                                                    position: "absolute",
                                                    bottom: 60
                                                }}><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% Off</sup></p>
                                                <p style={{
                                                    position: "absolute",
                                                    bottom: 30
                                                }}>{item.name}</p>
                                                <Link style={{
                                                    position: "absolute",
                                                    bottom: 0,
                                                    left: 0
                                                }} to={`/product/${item.id}`} className='btn btn-primary w-100'><i className="fa fa-shopping-cart"></i> Add to Cart</Link>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }


                        </div>

                    </div>

                </div>

            </section>
        </>
    )
}
