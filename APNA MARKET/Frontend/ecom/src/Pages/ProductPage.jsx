import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Breadcrum from '../Components/Breadcrum'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getCart, createCart } from "../Redux/ActionCreators/CartActionCreators"
import { getWishlist, createWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
import ProductsSlider from '../Components/ProductsSlider'
export default function ProductPage() {
    let { id } = useParams()
    let [qty, setQty] = useState(1)
    let [product, setProduct] = useState({ pic: [] })
    let [relatedProducts, setRelatedProducts] = useState([])

    let ProductStateData = useSelector(state => state.ProductStateData)
    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)

    let navigate = useNavigate()
    let dispatch = useDispatch()

    function addToCart() {
        let item = CartStateData.find((x) => x.product === id && x.user === localStorage.getItem("userid"))
        if (!item) {
            let item = {
                product: id,
                user: localStorage.getItem("userid"),
                qty: qty,
                total: qty * product.finalPrice,
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                price: product.finalPrice,
                stockQuantity: product.stockQuantity,
                pic: product.pic[0],
            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }

    function addToWishlist() {
        let item = WishlistStateData.find((x) => x.product === id && x.user === localStorage.getItem("userid"))
        if (!item) {
            let item = {
                product: id,
                user: localStorage.getItem("userid"),
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                price: product.finalPrice,
                stockQuantity: product.stockQuantity,
                pic: product.pic[0],
            }
            dispatch(createWishlist(item))
        }
        navigate("/profile")
    }

    useEffect(() => {
        dispatch(getProduct())
        if (ProductStateData.length) {
            let item = ProductStateData.find(x => x.id === id)
            if (item)
                setProduct(item)
            setRelatedProducts(ProductStateData.filter(x => x.maincategory === item.maincategory))
        }
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
            <Breadcrum title={product.name ? product.name : ""} />

            <div className="container-fluid my-3">

                <div className="row">
                    <div className="col-md-6">
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <div className="carousel-indicators">
                                {
                                    product.pic?.map((item, index) => {
                                        return <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? 'active' : ""} aria-current="true" aria-label={`Slide ${index + 1}`}></button>
                                    })
                                }
                            </div>
                            <div className="carousel-inner">
                                {
                                    product.pic?.map((item, index) => {
                                        return <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item}`} height={400} className="d-block w-100" alt="..." />
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
                        <div className="table-responsive">
                            <div className='my-2 d-flex justify-content-between'>
                                {
                                    product.pic.map((item, index) => {
                                        return <img key={index} src={`${process.env.REACT_APP_BACKEND_SERVER}${item}`} data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} height={100} className='w-100 me-1' />
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <h5 className='bg-primary p-2 text-light text-center'>{product.name}</h5>
                        <table className='table table-bordered table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Category</th>
                                    <td>{product.maincategory}/{product.subcategory}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{product.brand}</td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{product.stock ? `${product.stockQuantity} Left in Stock` : "Out of Stock"}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td><del className='text-danger'>&#8377;{product.basePrice}</del> &#8377;{product.finalPrice} <sup>{product.discount}% Off</sup></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {
                                            product.stock ?
                                                <div className="row">
                                                    <div className="col-5 col-sm-4 col-md-3">
                                                        <div className="btn-group w-100">
                                                            <button className='btn btn-primary' onClick={() => qty > 1 ? setQty(qty - 1) : null}><i className='fa fa-minus'></i></button>
                                                            <h3 className='w-50 text-center'>{qty}</h3>
                                                            <button className='btn btn-primary' onClick={() => qty < product.stockQuantity ? setQty(qty + 1) : null}><i className='fa fa-plus'></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="col-7 col-sm-8 col-md-9">
                                                        <div className="btn-group w-100">
                                                            <button className='btn btn-primary' onClick={addToCart}><i className='fa fa-shopping-cart'></i> Add to Cart</button>
                                                            <button className='btn btn-secondary' onClick={addToWishlist}><i className='fa fa-heart'></i> Add to Wishlist</button>
                                                        </div>
                                                    </div>
                                                </div> :
                                                <button className='btn btn-secondary w-100' onClick={addToWishlist}><i className='fa fa-heart'></i> Add to Wishlist</button>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td><div dangerouslySetInnerHTML={{ __html: product.description }} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <ProductsSlider title="Related" data={relatedProducts} />
            </div>
        </>
    )
}
