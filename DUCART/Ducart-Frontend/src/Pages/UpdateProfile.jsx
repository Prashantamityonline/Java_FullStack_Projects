import React, { useEffect, useState } from 'react'

import HeroSection from "../Components/HeroSection"

import formValidators from "../Components/Validators/formValidators"
import imageValidators from "../Components/Validators/imageValidators"
import { useNavigate } from 'react-router-dom'
export default function UpdateProfile() {
    let [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        pin: "",
        city: "",
        state: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        phone: "",
        pic: ""
    })
    let [show, setShow] = useState(false)

    let navigate = useNavigate()

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files ? "/product/" + e.target.files[0].name : e.target.value
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: e.target.files ? imageValidators(e) : formValidators(e)
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
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error)
            setShow(true)
        else {
            let response = await fetch(`${process.env.REACT_APP_SERVER}/user/${localStorage.getItem("userid")}`, {
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
            let response = await fetch(`${process.env.REACT_APP_SERVER}/user/${localStorage.getItem("userid")}`)
            response = await response.json()
            if (response)
                setData({ ...data, ...response })
            else
                navigate("/login")
        })()
    }, [])
    return (
        <>
            <HeroSection title="Profile Update - Update Your Profile" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-8 col-sm-10 m-auto">
                        <h5 className='bg-primary text-light text-center p-2'>Update Profile</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} placeholder='Full Name' value={data.name} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Phone Number*</label>
                                    <input type="text" name="phone" onChange={getInputData} className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} placeholder='Phone Number' value={data.phone} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Address</label>
                                <textarea name="address" onChange={getInputData} className='form-control border-3 border-primary' rows={3} placeholder='Address...' value={data.address}></textarea>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>City</label>
                                    <input type="text" name="city" onChange={getInputData} className='form-control border-3 border-primary' value={data.city} placeholder='City Name' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>State</label>
                                    <input type="text" name="state" onChange={getInputData} className='form-control border-3 border-primary' value={data.state} placeholder='State Name' />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pin</label>
                                    <input type="text" name="pin" onChange={getInputData} className='form-control border-3 border-primary' value={data.pin} placeholder='Pin Code' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name="pic" onChange={getInputData} className='form-control border-3 border-primary' />
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
