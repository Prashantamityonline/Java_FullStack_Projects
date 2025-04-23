import React, { useState } from 'react'

import HeroSection from "../Components/HeroSection"

import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
    let [data, setData] = useState({
        username: "",
        password: ""
    })
    let [show, setShow] = useState(false)

    let navigate = useNavigate()

    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function postData(e) {
        e.preventDefault()
        let response = await fetch(`${process.env.REACT_APP_SERVER}/user`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        let item = response.find((x) => (x.username === data.username || x.email === data.username) && x.password === data.password)
        if (item) {
            localStorage.setItem("login", true)
            localStorage.setItem("name", item.name)
            localStorage.setItem("userid", item.id)
            localStorage.setItem("role", item.role)
            if (item.role === "Buyer")
                navigate("/profile")
            else
                navigate("/admin")
        }
        else
            setShow(true)
    }

    function change(){
        var input = document.getElementById("password")
        var eye = document.getElementById("eye")
        if(input.type==="password"){
            input.type="text"
            eye.classList.remove("fa-eye")
            eye.classList.add("fa-eye-slash")
        }
        else{
            input.type="password"
            eye.classList.remove("fa-eye-slash")
            eye.classList.add("fa-eye")
        }
    }
    return (
        <>
            <HeroSection title="Login - Access Your Account" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6 col-sm-8 m-auto">
                        <h5 className='bg-primary text-light text-center p-2'>Login to Your Account</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>User Name*</label>
                                <input type="text" name="username" onChange={getInputData} className={`form-control border-3 ${show ? 'border-danger' : 'border-primary'}`} placeholder='User Name' />
                                {show ? <p className='text-danger'>Invalid Username or Password</p> : null}
                            </div>

                            <div className="mb-3">
                                <label>Password*</label>
                                <div className="bth-group d-flex">
                                    <input type="password" name="password" id='password' onChange={getInputData} className="form-control border-3 border-primary" placeholder='Password' />
                                    <button type='button' className='btn btn-primary' onClick={change}><i className='fa fa-eye' id='eye'></i></button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Login</button>
                            </div>
                        </form>
                        <div className='d-flex justify-content-between'>
                            <Link to="#">Forget Password</Link>
                            <Link to="/signup">Don't Heave an Account?Signup</Link>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
