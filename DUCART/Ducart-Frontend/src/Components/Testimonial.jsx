import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators"
import { useDispatch, useSelector } from 'react-redux';
export default function Testimonial() {
    let [data, setData] = useState([])

    let dispatch = useDispatch()
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)
    let options = {
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        nav: true,
        navText: ["<button class='btn btn-primary slider-btn' id='slider-btn1'><i class='fa fa-arrow-left'></button>", "<button class='slider-btn btn btn-primary' id='slider-btn2'><i class='fa fa-arrow-right'></button>"],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            1200: {
                items: 4
            },
            4000: {
                items: 5
            },
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length)
                setData(TestimonialStateData.filter((x) => x.active))
        })()
    }, [TestimonialStateData.length])
    return (
        <>
            <div className="container-xxl py-2">
                <div className="container">
                    <h1 className="display-5 text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Our Clients Say!</h1>
                    <div className=" wow fadeInUp" data-wow-delay="0.1s">
                        <OwlCarousel {...options}>
                            {
                                data?.map((item) => {
                                    return <div key={item.id} className="testimonial-item text-center">
                                        <img className="img-fluid rounded-circle border border-2 p-2 mx-auto mb-4" src={`${process.env.REACT_APP_SERVER}${item.pic}`} style={{ width: "100px", height: "100px" }} />
                                        <div className="testimonial-text rounded text-center p-4">
                                            <p className='testimonial-message'>{item.message}</p>
                                            <h5 className="mb-1">{item.name}</h5>
                                        </div>
                                    </div>
                                })
                            }

                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </>
    )
}
