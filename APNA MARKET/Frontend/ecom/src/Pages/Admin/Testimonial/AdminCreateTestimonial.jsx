import React, { useEffect, useState } from 'react'
import Breadcrum from '../../../Components/Breadcrum'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { getTestimonial, createTestimonial } from "../../../Redux/ActionCreators/TestimonialActionCreators"
export default function AdminCreateTestimonial() {
    let [data, setData] = useState({
        name: "",
        pic: "",
        message: "",
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field Is Mendatory",
        message: "Message Field Is Mendatory",
        pic: "Pic Field Is Mendatory"
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()


    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files && e.target.files.length ? "testimonial/" + e.target.files[0].name : e.target.value
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

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = TestimonialStateData.find(x => x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': 'Testimonial With Same Name Already Exist'
                    }
                })
                return
            }
            dispatch(createTestimonial({ ...data }))
            // let formData = new FormData()
            // formData.append("name", data.name)
            // formData.append("pic", data.pic)
            // formData.append("message", data.message)
            // formData.append("active", data.active)
            // dispatch(createTestimonial(formData))
            navigate("/admin/testimonial")
        }
    }


    useEffect(() => {
        dispatch(getTestimonial())
    }, [TestimonialStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary w-100 p-2 text-light text-center'>Testimonial <Link to="/admin/testimonial"><i className='fa fa-long-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name*</label>
                                <input type="text" name="name" onChange={getInputData} placeholder='Testimonial Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                            </div>

                            <div className="mb-3">
                                <label>Message*</label>
                                <textarea name="message" onChange={getInputData} className={`form-control border-3 ${show && errorMessage.message ? 'border-danger' : 'border-primary'}`} placeholder='Message...' rows={5}></textarea>
                                {show && errorMessage.message ? <p className='text-danger'>{errorMessage.message}</p> : null}
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" onChange={getInputData} className={`form-control border-3 ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" onChange={getInputData} className='form-select border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">NO</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
