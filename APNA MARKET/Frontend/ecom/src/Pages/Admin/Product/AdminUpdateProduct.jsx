import React, { useEffect, useRef, useState } from 'react'
import Breadcrum from '../../../Components/Breadcrum'
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { getProduct, updateProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreators"

let rte

export default function AdminUpdateProduct() {
    let { id } = useParams()
    let refdiv = useRef(null)
    let [flag, setFlag] = useState(false)

    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        basePrice: "",
        discount: 0,
        finalPrice: "",
        stock: true,
        stockQuantity: "",
        description: "",
        pic: [],
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        color: "",
        size: "",
        basePrice: "",
        discount: "",
        stockQuantity: "",
        pic: ""
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files && e.target.files.length ? data.pic.concat(Array.from(e.target.files).map(x => "product/" + x.name)) : e.target.value
        // var value = e.target.files && e.target.files.length ? e.target.files[0] : e.target.value

        setErrorMessage((old) => {
            return {
                ...old,
                [name]: e.target.files ? ImageValidator(e) : FormValidator(e)
            }
        })

        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })
    }

    async function postData(e) {
        e.preventDefault()
        let bp = parseInt(data.basePrice)
        let d = parseInt(data.discount)
        let fp = parseInt(bp - bp * d / 100)
        let stockQuantity = parseInt(data.stockQuantity)

        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(updateProduct({
                ...data,
                basePrice: bp,
                discount: d,
                finalPrice: fp,
                stockQuantity: stockQuantity,
                maincategory: data.maincategory ? data.maincategory : MaincategoryStateData[0].name,
                subcategory: data.subcategory ? data.subcategory : SubcategoryStateData[0].name,
                brand: data.brand ? data.brand : BrandStateData[0].name,
                description: rte.getHTMLCode()

                // maincategory:data.maincategory?data.maincategory:MaincategoryStateData[0]._id,
                // subcategory:data.subcategory?data.subcategory:SubcategoryStateData[0]._id,
                // brand:data.brand?data.brand:BrandStateData[0]._id,
            }))

            // let formData = new FormData()
            // let formData = new FormData()
            // formData.append("name", data.name)
            // formData.append("maincategory", data.maincategory ? data.maincategory : MaincategoryStateData[0].name)
            // formData.append("subcaregory", data.subcaregory ? data.subcaregory : SubcategoryStateData[0].name)
            // formData.append("brand", data.brand ? data.brand : BrandStateData[0].name)
            // formData.append("color", data.color)
            // formData.append("size", data.size)
            // formData.append("basePrice", bp)
            // formData.append("discount", d)
            // formData.append("finalPrice", fp)
            // formData.append("stock", data.stock)
            // formData.append("stock", stockQuantity)
            // formData.append("description", rte.getHTMLCode())
            // formData.append("pic", data.pic)
            // formData.append("active", data.active)
            // dispatch(updateProduct(formData))
            navigate("/admin/product")
        }
    }

    useEffect(() => {
        dispatch(getMaincategory())
    }, [MaincategoryStateData.length])

    useEffect(() => {
        dispatch(getSubcategory())
    }, [SubcategoryStateData.length])

    useEffect(() => {
        dispatch(getBrand())
    }, [BrandStateData.length])

    useEffect(() => {
        dispatch(getProduct())
        if (ProductStateData.length) {
            let item = ProductStateData.find(x => x.id === id)
            setData({ ...item })
            rte = new window.RichTextEditor(refdiv.current);
            rte.setHTMLCode(item.description);
        }
    }, [ProductStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary w-100 p-2 text-light text-center'>Product <Link to="/admin/product"><i className='fa fa-long-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name*</label>
                                <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Product Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                            </div>

                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label>Maincategory*</label>
                                    <select name="maincategory" value={data.maincategory} onChange={getInputData} className='form-select border-3 border-primary'>
                                        {
                                            MaincategoryStateData && MaincategoryStateData.filter(x => x.active).map((item) => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label>Subcategory*</label>
                                    <select name="subcategory" value={data.subcategory} onChange={getInputData} className='form-select border-3 border-primary'>
                                        {
                                            SubcategoryStateData && SubcategoryStateData.filter(x => x.active).map((item) => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label>Brand*</label>
                                    <select name="brand" value={data.brand} onChange={getInputData} className='form-select border-3 border-primary'>
                                        {
                                            BrandStateData && BrandStateData.filter(x => x.active).map((item) => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label>Stock*</label>
                                    <select name="stock" value={data.stock} onChange={getInputData} className='form-select border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Base Price*</label>
                                    <input type="number" value={data.basePrice} name="basePrice" onChange={getInputData} placeholder='Product Base Price' className={`form-control border-3 ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Discount*</label>
                                    <input type="number" value={data.discount} name="discount" onChange={getInputData} placeholder='Discount on Product' className={`form-control border-3 ${show && errorMessage.discount ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Color*</label>
                                    <input type="text" value={data.color} name="color" onChange={getInputData} placeholder='Product Color' className={`form-control border-3 ${show && errorMessage.color ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.color ? <p className='text-danger'>{errorMessage.color}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Size*</label>
                                    <input type="text" value={data.size} name="size" onChange={getInputData} placeholder='Product Size' className={`form-control border-3 ${show && errorMessage.size ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.size ? <p className='text-danger'>{errorMessage.size}</p> : null}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Description</label>
                                <div className='form-control border-3 border-primary'>
                                    <textarea ref={refdiv} name="description" onChange={getInputData} placeholder='Product Description' rows={5}></textarea>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Stock Quantity*</label>
                                    <input type="number" value={data.stockQuantity} name="stockQuantity" onChange={getInputData} placeholder='Product stockQuantity' className={`form-control border-3 ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" value={data.active ? "1" : "0"} onChange={getInputData} className='form-select border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">NO</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name="pic" multiple onChange={getInputData} className={`form-control border-3 ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic(Click on Pic to Delete)</label>
                                    <div>
                                        {
                                            data.pic?.map((item, index) => {
                                                return <img onClick={() => {
                                                    data.pic.splice(index, 1)
                                                    setFlag(!flag)
                                                }} src={`${process.env.REACT_APP_BACKEND_SERVER}${item}`} height={80} width={80} className='me-1 mb-1' alt='Product Image' />
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
