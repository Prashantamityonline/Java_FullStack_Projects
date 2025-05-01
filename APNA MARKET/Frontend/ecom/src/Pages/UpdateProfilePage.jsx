import React, { useEffect, useState } from 'react'
import Breadcrum from '../Components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'

import ImageValidator from '../Validators/ImageValidator'
import FormValidator from '../Validators/FormValidator'
export default function UpdateProfilePage() {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    pin: "",
    city: "",
    state: "",
    pic: ""
  })
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    pic: ""
  })
  let [show, setShow] = useState(false)
  let navigate = useNavigate()

  function getInputData(e) {
    let name = e.target.name
    let value = e.target.files && e.target.files.length ? "product/" + e.target.files[0].name : e.target.value
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: e.target.files ? ImageValidator(e) : FormValidator(e)
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
      let item = response.find(x => x.id !== localStorage.getItem("userid") && (x.username?.toLowerCase() === data.username.toLowerCase() || x.email?.toLowerCase() === data.email.toLowerCase()))
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
      response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user/${localStorage.getItem("userid")}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      response = await response.json()
      if (data.role === "Buyer")
        navigate("/profile")
      else
        navigate("/admin")
    }
  }
  useEffect(() => {
    (async () => {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user/${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      if (response)
        setData({ ...response })
    })()
  }, [])
  return (
    <>
      <Breadcrum title="Update Profile" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-9 col-md-10 col-sm-11 m-auto">
            <h5 className='bg-primary text-light text-center p-2'>Update Your Profile Details</h5>
            <form onSubmit={postData}>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                </div>
                <div className="col-md-6 mb-3">
                  <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input type="text" name="username" value={data.username} onChange={getInputData} placeholder='User Name' className={`form-control border-3 ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                </div>
                <div className="col-md-6 mb-3">
                  <input type="email" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                </div>
              </div>

              <div className="mb-3">
                <textarea name="address" value={data.address} onChange={getInputData} placeholder='Address...' className='form-control border-3 border-primary'></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input type="text" name="city" value={data.city} onChange={getInputData} placeholder='City Name' className='form-control border-3 border-primary' />
                </div>
                <div className="col-md-6 mb-3">
                  <input type="text" name="state" value={data.state} onChange={getInputData} placeholder='State Name' className='form-control border-3 border-primary' />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input type="text" name="pin" value={data.pin} onChange={getInputData} placeholder='Pin Code' className='form-control border-3 border-primary' />
                </div>
                <div className="col-md-6 mb-3">
                  <input type="file" name="pic" onChange={getInputData} className={`form-control border-3 ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
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
