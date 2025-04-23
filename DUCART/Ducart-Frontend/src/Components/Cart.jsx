import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { getCart, updateCart, deleteCart } from "../Redux/ActionCreators/CartActionCreators"
import { createCheckout } from "../Redux/ActionCreators/CheckoutActionCreators"
import { getProduct, updateProduct } from "../Redux/ActionCreators/ProductActionCreators"
export default function Cart(props) {
    let [cart, setCart] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)
    let [mode, setMode] = useState("COD")


    let CartStateData = useSelector((state) => state.CartStateData)
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function placeOrder() {
        let item = {
            user: localStorage.getItem("userid"),
            orderStatus: "Order is Placed",
            paymentMode: mode,
            paymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: [...cart]
        }
        dispatch(createCheckout(item))
        cart.forEach((c) => {
            let p = ProductStateData.find((x) => x.id === c.product)
            p.stockQuantity = p.stockQuantity - c.qty
            p.stock = p.stockQuantity === 0 ? false : true
            dispatch(updateProduct(p))
            dispatch(deleteCart({ id: c.id }))
        })

        navigate("/confirmation")
    }

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteCart({ id: id }))
            getAPIData()
        }
    }

    function updateRecord(id, option) {
        let item = cart.find((x) => x.id === id)
        let index = cart.findIndex((x) => x.id === id)
        if ((option === "DEC" && item.qty === 1) || (option === "INC" && item.qty === item.stockQuantity))
            return
        else if (option === "DEC") {
            item['qty'] = item['qty'] - 1
            item['total'] = item['total'] - item['price']
        }
        else {
            item['qty'] = item['qty'] + 1
            item['total'] = item['total'] + item['price']
        }
        dispatch(updateCart(item))
        cart[index].qty = item.qty
        cart[index].total = item.total
        calculation(cart)
    }
    function calculation(cart) {
        let subtotal = 0
        cart.forEach((x) => subtotal = subtotal + x.total)
        if (subtotal > 0 && subtotal < 1000) {
            setShipping(150)
            setTotal(subtotal + 150)
        }
        else {
            setShipping(0)
            setTotal(subtotal)
        }
        setSubtotal(subtotal)
    }
    function getAPIData() {
        dispatch(getCart())
        if (CartStateData.length) {
            let data = CartStateData.filter((x) => x.user === localStorage.getItem("userid"))
            setCart(data)
            calculation(data)
        }
        else
            setCart([])
    }

    useEffect(() => {
        getAPIData()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])
    return (
        <>
            <h5 className='bg-primary p-2 text-center text-light'>Cart Section</h5>
            {
                cart.length ?
                    <>
                        <div className="table-responsive">
                            <table className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        {props.title === "Checkout" ? null : <th>Stock Quantity</th>}
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        {props.title === "Checkout" ? null : <th></th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart?.map((item) => {
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
                                                {props.title === "Checkout" ? null : <td>{item.stockQuantity} Left in Stock</td>}
                                                <td>&#8377;{item.price}</td>
                                                <td>
                                                    <div className="btn-group w-100">
                                                        <button className={`btn btn-primary ${props.title === "Checkout" ? 'd-none' : ''}`} onClick={() => updateRecord(item.id, "DEC")}><i className='fa fa-minus'></i></button>
                                                        <h5 className='w-50 text-center mt-1'>{item.qty}</h5>
                                                        <button className={`btn btn-primary ${props.title === "Checkout" ? 'd-none' : ''}`} onClick={() => updateRecord(item.id, "INC")}><i className='fa fa-plus'></i></button>
                                                    </div>
                                                </td>

                                                <td>&#8377;{item.total}</td>
                                                {
                                                    props.title === "Checkout" ? null : <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>
                                                }
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-md-6"></div>
                            <div className={`${props.title === "Checkout" ? 'col-12' : 'col-md-6'}`}>
                                <table className='table table-striped table-hover table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Subtotal</th>
                                            <td>&#8377;{subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>&#8377;{shipping}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>&#8377;{total}</td>
                                        </tr>
                                        <tr>
                                            <th>Payment Mode</th>
                                            <td>
                                                <select name="mode" onChange={(e) => setMode(e.target.value)} className='form-control border-3 border-primary'>
                                                    <option value="COD">COD</option>
                                                    <option value="Net Banking" disabled>Net Banking/Card/UPI</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            {
                                                props.title === "Checkout" ?
                                                    <td colSpan={2} ><button onClick={placeOrder} className='btn btn-primary w-100'>Place Order</button></td> :
                                                    <td colSpan={2}><Link to="/checkout" className='btn btn-primary w-100'>Checkout</Link></td>
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </> :
                    <div className="text-center card p-5">
                        <h3>No Items in Cart</h3>
                        <Link to="/shop" className='btn btn-primary w-25 m-auto'>Shop Now</Link>
                    </div>
            }
        </>
    )
}
