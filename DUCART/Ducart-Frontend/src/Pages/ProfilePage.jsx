import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import HeroSection from '../Components/HeroSection'
import Profile from '../Components/Profile'

import { deleteWishlist, getWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
import { getCheckout } from "../Redux/ActionCreators/CheckoutActionCreators"
import OrderProducts from '../Components/OrderProducts'
export default function ProfilePage() {
    let [wishlist, setWishlist] = useState([])
    let [orders, setOrders] = useState([])

    let dispatch = useDispatch()
    let WishlistStateData = useSelector((state) => state.WishlistStateData)
    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteWishlist({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getWishlist())
        if (WishlistStateData.length)
            setWishlist(WishlistStateData.filter((x) => x.user === localStorage.getItem("userid")))
        else
            setWishlist([])
    }
    useEffect(() => {
        getAPIData()
    }, [WishlistStateData.length])


    useEffect(() => {
        (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                setOrders(CheckoutStateData.filter((x) => x.user === localStorage.getItem("userid")))
            }
        })()
    }, [CheckoutStateData.length])
    return (
        <>
            <HeroSection title="Buyer Profile Section" />

            <div className="container-fluid my-3">
                <Profile title="Buyer Profile" />

                <h5 className='bg-primary p-2 text-center text-light'>Wishlist Section</h5>
                {
                    wishlist.length ?
                        <div className="table-responsive">
                            <table className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Stock Quantity</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        wishlist?.map((item) => {
                                            return <tr key={item.id}>
                                                <td>
                                                    <Link to={`${process.env.REACT_APP_SERVER}${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${process.env.REACT_APP_SERVER}${item.pic}`} height={50} width={50} className='rounded' alt="Product Image" />
                                                    </Link>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>&#8377;{item.price}</td>
                                                <td>{item.stockQuantity}</td>
                                                <td><Link to={`/product/${item.product}`} className='btn btn-primary'><i className='fa fa-shopping-cart'></i></Link></td>
                                                <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> :
                        <div className="text-center card p-5">
                            <h3>No Items in Wishlist</h3>
                            <Link to="/shop" className='btn btn-primary w-25 m-auto'>Shop Now</Link>
                        </div>
                }

                <h5 className='bg-primary p-2 text-center text-light'>Orders History Section</h5>
                {
                    orders.length ?
                        orders.map((item) => {
                            return <div className="row border-bottom border-5 border-primary" key={item.id}>
                                <div className="col-md-4">
                                    <div className="table-responsive">
                                        <table className='table table-bordered table-striped table-hover'>
                                            <tbody>
                                                <tr>
                                                    <th>Order Id</th>
                                                    <td>{item.id}</td>
                                                </tr>
                                                <tr>
                                                    <th>Order Status</th>
                                                    <td>{item.orderStatus}</td>
                                                </tr>
                                                <tr>
                                                    <th>Payment Mode</th>
                                                    <td>{item.paymentMode}</td>
                                                </tr>
                                                <tr>
                                                    <th>Payment Status</th>
                                                    <td>{item.paymentStatus}</td>
                                                </tr>
                                                <tr>
                                                    <th>Subtotal</th>
                                                    <td>&#8377;{item.subtotal}</td>
                                                </tr>
                                                <tr>
                                                    <th>Shipping</th>
                                                    <td>&#8377;{item.shipping}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total</th>
                                                    <td>&#8377;{item.total}</td>
                                                </tr>
                                                <tr>
                                                    <th>Date</th>
                                                    <td>{new Date(item.date).toLocaleString()}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <OrderProducts data={item.products}/>
                                </div>
                            </div>
                        }) :
                        <div className="text-center card p-5">
                            <h3>No Order History Found</h3>
                            <Link to="/shop" className='btn btn-primary w-25 m-auto'>Shop Now</Link>
                        </div>
                }
            </div>
        </>
    )
}
