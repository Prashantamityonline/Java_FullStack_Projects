import React, { useState } from 'react'
import Breadcrum from '../Components/Breadcrum'
import FormValidator from '../Validators/FormValidator'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: ""
  })
  let [errorMessage, setErrorMessage] = useState({
    name: "Full Name Field Is Mendatory",
    username: "User Name Field Is Mendatory",
    email: "Email Address Field Is Mendatory",
    phone: "Phone Number Field Is Mendatory",
    password: "Password Field Is Mendatory",
  })
  let [show, setShow] = useState(false)
  let navigate = useNavigate()

  function getInputData(e) {
    let { name, value } = e.target
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: FormValidator(e)
      }
    })
    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }
  async function postData(e) {
    e.preventDefault()
    if (data.password === data.cpassword) {
      let error = Object.values(errorMessage).find(x => x !== "")
      if (error)
        setShow(true)
      else {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user`, {
          method: "GET",
          headers: {
            "content-type": "application/json"
          }
        })
        response = await response.json()
        let item = response.find(x => x.username?.toLowerCase() === data.username.toLowerCase() || x.email?.toLowerCase() === data.email.toLowerCase())
        if (item) {
          setShow(true)
          setErrorMessage((old) => {
            return {
              ...old,
              'username': item.username?.toLowerCase() === data.username.toLowerCase() ? "Username Already Taken" : "",
              'email': item.email?.toLowerCase() === data.email.toLowerCase() ? "Email Address Already Taken" : "",
            }
          })
          return
        }
        response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: "Buyer",
            active: true
          })
        })
        response = await response.json()
        navigate("/login")
      }
    }
    else {
      setShow(true)
      setErrorMessage((old) => {
        return {
          ...old,
          'password': "Password and Confirm Password Doesn't Matched"
        }
      })
    }
  }
  return (
    <>
      <Breadcrum title="Signup - Create Your Account" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-9 col-md-10 col-sm-11 m-auto">
            <h5 className='bg-primary text-light text-center p-2'>Create Your Account</h5>
            <form onSubmit={postData}>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                </div>
                <div className="col-md-6 mb-3">
                  <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input type="text" name="username" onChange={getInputData} placeholder='User Name' className={`form-control border-3 ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                </div>
                <div className="col-md-6 mb-3">
                  <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input type="password" name="password" onChange={getInputData} placeholder='Password' className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                </div>
                <div className="col-md-6 mb-3">
                  <input type="password" name="cpassword" onChange={getInputData} placeholder='Confirm Password' className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                </div>
              </div>

              <div className="mb-3">
                <button type="submit" className='btn btn-primary w-100'>Signup</button>
              </div>

            </form>
            <div>
              <Link to="/login">Already Have an Account?Please Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
