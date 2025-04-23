import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'


import Sidebar from '../../Components/Sidebar'
import HeroSection from '../../Components/HeroSection'

import formValidators from '../../Components/Validators/formValidators'
import imageValidators from '../../Components/Validators/imageValidators'

import { updateProduct, getProduct } from "../../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../Redux/ActionCreators/BrandActionCreators"

var rte
export default function AdminupdateProduct() {
  let { id } = useParams()
  let refdiv = useRef(null)
  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    size: "",
    basePrice: "",
    discount: "",
    finalPrice: "",
    stock: true,
    stockQuantity: "",
    active: true,
    pic: []
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
  let [flag,setFlag] = useState(false)
  let navigate = useNavigate()

  let dispatch = useDispatch()

  let ProductStateData = useSelector((state) => state.ProductStateData)
  let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
  let BrandStateData = useSelector((state) => state.BrandStateData)

  function getInputData(e) {
    let name = e.target.name
    let value = e.target.files ? data.pic?.concat(Array.from(e.target.files).map((x) => "/product/" + x.name)) : e.target.value
    // let value = e.target.files ? e.target.files : e.target.value
    if (name !== "active") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: e.target.files ? imageValidators(e) : formValidators(e)
        }
      })
    }
    setData((old) => {
      return {
        ...old,
        [name]: name === "active" || name === "stock" ? (value === "1" ? true : false) : value
      }
    })
  }
  function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find((x) => x !== "")
    if (error)
      setShow(true)
    else {
      //this line is used in both dumy server and real server if form has no file field
      let stockQuantity = parseInt(data.stockQuantity)
      let bp = parseInt(data.basePrice)
      let discount = parseInt(data.discount)
      let fp = parseInt(bp - bp * discount / 100)
      dispatch(updateProduct({
        ...data,
        maincategory: data.maincategory !== "" ? data.maincategory : MaincategoryStateData[0].name,
        subcategory: data.subcategory !== "" ? data.subcategory : SubcategoryStateData[0].name,
        brand: data.brand !== "" ? data.brand : BrandStateData[0].name,
        basePrice: bp,
        discount: discount,
        finalPrice: fp,
        stockQuantity: stockQuantity,
        description: rte.getHTMLCode()
      }))

      //but in case of real server and if form has file field
      // var formData = new FormData()
      // formData.append("name",data.name)
      // formData.append("maincategory",data.maincategory !== "" ? data.maincategory : MaincategoryStateData[0].name)
      // formData.append("subcategory", data.subcategory !== "" ? data.subcategory : SubcategoryStateData[0].name)
      // formData.append("brand",data.brand !== "" ? data.brand : BrandStateData[0].name)
      // formData.append("color",data.name)
      // formData.append("size",data.name)
      // formData.append("basePrice",bp)
      // formData.append("discount",discount)
      // formData.append("finalPrice",fp)
      // formData.append("stock",data.stock)
      // formData.append("stockQuantity",stockQuantity)
      // formData.append("description",rte.getHTMLCode())
      // formData.append("pic",data.pic)
      // formData.append("active",data.active)
      // dispatch(updateProduct(formData))

      navigate("/admin/product")
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getMaincategory())
    })()
  }, [MaincategoryStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getSubcategory())
    })()
  }, [SubcategoryStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getBrand())
    })()
  }, [BrandStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getProduct())
      rte = new window.RichTextEditor(refdiv.current);
      if (ProductStateData.length) {
        let item = ProductStateData.find((x) => x.id === id)
        rte.setHTMLCode(item.description);
        setData(item)
      }
    })()
  }, [ProductStateData.length])
  return (
    <>
      <HeroSection title="Admin" />
      <div className="container-fluid">
        <div className='row'>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>Update Product <Link to="/admin/product"> <i className='fa fa-backward text-light float-end'></i></Link></h5>
            <form onSubmit={postData}>

              <div className="mb-3">
                <label>Name*</label>
                <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} placeholder='Product Name' />
                {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
              </div>

              <div className="row">
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Maincategory*</label>
                  <select name="maincategory" value={data.maincategory} onChange={getInputData} className='form-select border-3 border-primary'>
                    {
                      MaincategoryStateData && MaincategoryStateData.filter((x) => x.active).map((item) => {
                        return <option key={item.id}>{item.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Subcategory*</label>
                  <select name="subcategory" value={data.subcategory} onChange={getInputData} className='form-select border-3 border-primary'>
                    {
                      SubcategoryStateData && SubcategoryStateData.filter((x) => x.active).map((item) => {
                        return <option key={item.id}>{item.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Brand*</label>
                  <select name="brand" value={data.brand} onChange={getInputData} className='form-select border-3 border-primary'>
                    {
                      BrandStateData && BrandStateData.filter((x) => x.active).map((item) => {
                        return <option key={item.id}>{item.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Stock*</label>
                  <select name="stock" value={data.stock ? "1" : "0"} onChange={getInputData} className='form-select border-3 border-primary'>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Color*</label>
                  <input type="text" name="color" value={data.color} onChange={getInputData} className={`form-control border-3 ${show && errorMessage.color ? 'border-danger' : 'border-primary'}`} placeholder='Product Color' />
                  {show && errorMessage.color ? <p className='text-danger text-capitalize'>{errorMessage.color}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Size*</label>
                  <input type="text" name="size" value={data.size} onChange={getInputData} className={`form-control border-3 ${show && errorMessage.size ? 'border-danger' : 'border-primary'}`} placeholder='Product Size' />
                  {show && errorMessage.size ? <p className='text-danger text-capitalize'>{errorMessage.size}</p> : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Base Price*</label>
                  <input type="number" name="basePrice" value={data.basePrice} onChange={getInputData} className={`form-control border-3 ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`} placeholder='Product Base Price' />
                  {show && errorMessage.basePrice ? <p className='text-danger text-capitalize'>{errorMessage.basePrice}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Discount*</label>
                  <input type="number" name="discount" value={data.discount} onChange={getInputData} className={`form-control border-3 ${show && errorMessage.discount ? 'border-danger' : 'border-primary'}`} placeholder='Product Discount' />
                  {show && errorMessage.discount ? <p className='text-danger text-capitalize'>{errorMessage.discount}</p> : null}
                </div>
              </div>

              <div className="mb-3">
                <label>Description</label>
                <div ref={refdiv}></div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Stock Quantity*</label>
                  <input type="number" name="stockQuantity" value={data.stockQuantity} onChange={getInputData} className={`form-control border-3 ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`} placeholder='Product Stock Quantity' />
                  {show && errorMessage.stockQuantity ? <p className='text-danger text-capitalize'>{errorMessage.stockQuantity}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Pic*</label>
                  <input type="file" name="pic" multiple onChange={getInputData} className={`form-control border-3 ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} placeholder='Product Name' />
                  {show && errorMessage.pic ? typeof errorMessage.pic === 'string' ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : errorMessage.pic.map((item, index) => <p className='text-danger text-capitalize' key={index}>{item}</p>) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select name="active" value={data.active ? "1" : "0"} onChange={getInputData} className='form-select border-3 border-primary'>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Click on Image to Remove</label><br />
                  {
                    data.pic?.map((item, index) => {
                      return <img key={index} onClick={() => {
                        data.pic.splice(index, 1)
                        setFlag(!flag)
                      }} src={`${process.env.REACT_APP_SERVER}${item}`} height={50} width={50} className='mx-1'></img>
                    })
                  }
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
