import React, { useEffect, useState } from 'react'
import Breadcrum from '../../../Components/Breadcrum'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidator from '../../../Validators/FormValidator'
import { getUser, createUser } from "../../../Redux/ActionCreators/UserActionCreators"
export default function AdminCreateUser() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        role: "Admin",
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field Is Mendatory",
        username: "User Name Field Is Mendatory",
        email: "Email Address Field Is Mendatory",
        phone: "Phone Number Field Is Mendatory",
        password: "Password Field Is Mendatory",
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()


    function getInputData(e) {
        var { name, value } = e.target

        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
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
        if (data.password === data.cpassword) {
            let error = Object.values(errorMessage).find(x => x !== "")
            if (error)
                setShow(true)
            else {
                let item = UserStateData.find(x => x.username.toLowerCase() === data.username.toLowerCase() || x.email.toLowerCase() === data.email.toLowerCase())
                if (item) {
                    setShow(true)
                    setErrorMessage((old) => {
                        return {
                            ...old,
                            'username': item.username === data.username ? 'User  With Same User Name Already Exist' : '',
                            'email': item.email === data.email ? 'User  With Same Email Address Already Exist' : ''
                        }
                    })
                    return
                }
                dispatch(createUser({ ...data }))
                navigate("/admin/user")
            }
        }
        else {
            setShow(true)
            setErrorMessage((old) => {
                return {
                    ...old,
                    'password': 'Password and Confirm Password Does not Matched',
                }
            })
            return
        }
    }


    useEffect(() => {
        dispatch(getUser())
    }, [UserStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary w-100 p-2 text-light text-center'>User <Link to="/admin/user"><i className='fa fa-long-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Phone*</label>
                                    <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>User Name*</label>
                                    <input type="text" name="username" onChange={getInputData} placeholder='User Name' className={`form-control border-3 ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Email Address*</label>
                                    <input type="text" name="email" onChange={getInputData} placeholder='Email Address' className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Password*</label>
                                    <input type="password" name="password" onChange={getInputData} placeholder='Password' className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Confirma Password*</label>
                                    <input type="password" name="cpassword" onChange={getInputData} placeholder='Confirm Password' className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Role*</label>
                                    <select name="role" onChange={getInputData} className='form-select border-3 border-primary'>
                                        <option value="Admin">Admin</option>
                                        <option value="Super Admin">Super Admin</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" onChange={getInputData} className='form-select border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">NO</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
