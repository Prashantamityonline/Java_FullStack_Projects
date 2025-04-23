import React, { useEffect, useState } from 'react'
import HeroSection from "../Components/HeroSection"
import Products from "../Components/Products"

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { createCart, getCart } from "../Redux/ActionCreators/CartActionCreators"
import { createWishlist, getWishlist } from "../Redux/ActionCreators/WishlistActionCreators"

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
export default function SingleProductPage() {
    let [qty, setQty] = useState(1)
    let [data, setData] = useState({ pic: [] })
    let [relatedProducts, setRelatedProducts] = useState([])

    let { id } = useParams()

    let navigate = useNavigate()

    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let CartStateData = useSelector((state) => state.CartStateData)
    let WishlistStateData = useSelector((state) => state.WishlistStateData)

    function addToCart() {
        let item = CartStateData.find((x) => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,
                name: data.name,//Not Used in Case of Real Backend
                brand: data.brand,//Not Used in Case of Real Backend
                color: data.color,//Not Used in Case of Real Backend
                size: data.size,//Not Used in Case of Real Backend
                price: data.finalPrice,//Not Used in Case of Real Backend
                stockQuantity: data.stockQuantity,//Not Used in Case of Real Backend,
                pic: data.pic[0],//Not Used in Case of Real Backend,
                qty: qty,
                total: qty * data.finalPrice
            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }

    function addToWishlist() {
        let item = WishlistStateData.find((x) => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,
                name: data.name,//Not Used in Case of Real Backend
                brand: data.brand,//Not Used in Case of Real Backend
                color: data.color,//Not Used in Case of Real Backend
                size: data.size,//Not Used in Case of Real Backend
                price: data.finalPrice,//Not Used in Case of Real Backend
                stockQuantity: data.stockQuantity,//Not Used in Case of Real Backend,
                pic: data.pic[0],//Not Used in Case of Real Backend,
            }
            dispatch(createWishlist(item))
        }
        navigate("/profile")
    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find((x) => x.id === id)
                setData(item)
                setRelatedProducts(ProductStateData.filter((x) => x.active && x.maincategory === item.maincategory).slice(0, 12))
            }
        })()
    }, [ProductStateData.length, id])

    useEffect(() => {
        (() => {
            dispatch(getCart())
        })()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
        })()
    }, [WishlistStateData.length])
    return (
        <>
            <HeroSection title="Product" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6">
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                {
                                    data.pic?.slice(1).map((item, index) => {
                                        return <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index + 1} aria-label={`Slide ${index + 2}`}></button>
                                    })
                                }
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={`${process.env.REACT_APP_SERVER}${data.pic[0]}`} height={450} className="d-block w-100" alt="..." />
                                </div>
                                {
                                    data.pic?.slice(1).map((item, index) => {
                                        return <div className="carousel-item" key={index}>
                                            <img src={`${process.env.REACT_APP_SERVER}${item}`} height={450} className="d-block w-100" alt="..." />
                                        </div>
                                    })
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className={`d-flex my-3 ${data.pic.length < 4 ? '' : 'justify-content-between'}`}>
                            {
                                data.pic?.map((item, index) => {
                                    return <img key={index} src={`${process.env.REACT_APP_SERVER}${item}`} height={100} width={100} className='me-1' data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} aria-label={`Slide ${index + 1}`} />
                                })
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5 className='bg-primary text-center p-2 text-light'>{data.name}</h5>
                        <table className='table table-bordered table-hover table-striped'>
                            <tbody>
                                <tr>
                                    <th>Maincategory/Subcategory/Brand</th>
                                    <td>{data.maincategory}/{data.subcategory}/{data.brand}</td>
                                </tr>
                                <tr>
                                    <th>Color/Size</th>
                                    <td>{data.color}/{data.size}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td><del className='text-danger'>&#8377;{data.basePrice}</del> &#8377;{data.finalPrice} <sup>{data.discount}% Off</sup></td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{data.stock ? `Yes(${data.stockQuantity} Left In Stock) ` : "No"}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <div className="row">
                                            <div className="col-md-4 col-4 m-auto mb-3">
                                                <div className="btn-group w-100">
                                                    <button className='btn btn-primary' onClick={() => qty > 1 ? setQty(qty - 1) : null}><i className='fa fa-minus'></i></button>
                                                    <h4 className='w-75 text-center'>{qty}</h4>
                                                    <button className='btn btn-primary' onClick={() => qty < data.stockQuantity ? setQty(qty + 1) : null}><i className='fa fa-plus'></i></button>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="btn-group w-100">
                                                    <button className='btn btn-primary w-100' onClick={addToCart}><i className='fa fa-shopping-cart'></i> Add to Cart</button>
                                                    <button className='btn btn-secondary w-100' onClick={addToWishlist}><i className='fa fa-heart'></i> Add to Wishlist</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>
                                        <div className='description' dangerouslySetInnerHTML={{ __html: data.description }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <Products title={`Other ${data.maincategory}`} data={relatedProducts} />
            </div>
        </>
    )
}
