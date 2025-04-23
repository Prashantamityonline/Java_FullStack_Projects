import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <p><span className="text-primary me-2">#</span>Welcome To Ducart</p>
                            <h1 className="display-5 mb-4">
                                Why You Should Checkout
                                <span className="text-primary"> Ducart</span>
                            </h1>
                            <p className="mb-4">
                                Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No
                                stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo
                                nonumy clita sit at, sed sit sanctus dolor eos.
                            </p>
                            <h5 className="mb-3">
                                <i className="far fa-check-circle text-primary me-3"></i>Free Shipping
                            </h5>
                            <h5 className="mb-3">
                                <i className="far fa-check-circle text-primary me-3"></i>14 Days Refund Policy
                            </h5>
                            <h5 className="mb-3">
                                <i className="far fa-check-circle text-primary me-3"></i>Fast Delivery
                            </h5>
                            <h5 className="mb-3">
                                <i className="far fa-check-circle text-primary me-3"></i>100% Genuine Products
                            </h5>
                            <Link className="btn btn-primary py-3 px-5 mt-3" to="/shop">Shop Now</Link>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="img-border">
                                <img className="img-fluid" src="img/banner4.jpg" alt="Banner Image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
