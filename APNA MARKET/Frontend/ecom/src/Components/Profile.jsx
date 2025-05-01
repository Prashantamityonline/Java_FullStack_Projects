import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Profile({ title }) {
    let [data, setData] = useState({})

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
            {title !== "Buyer" ? <h5 className='bg-primary text-center p-2  text-light'>{title}</h5> : null}
            <div className='row'>
                <div className={`col-md-6 mb-3 ${title === "Billing Address" ? 'd-none' : ''}`}>
                    <img src={data.pic ? `${process.env.REACT_APP_BACKEND_SERVER}${data.pic}` : "/assets/img/nouser.webp"} className='w-100' height={440} alt="" />
                </div>
                <div className={`col-md-6 mb-3 ${title === "Billing Address" ? 'col-md-12' : ''}`}>
                    <table className='table table-bordered table-striped table-hover'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{data.name}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{data.username}</td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td>{data.email}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{data.phone}</td>
                            </tr>
                            {
                                title === "Admin Profile" ?
                                    <tr>
                                        <th>Role</th>
                                        <td>{data.role}</td>
                                    </tr> : null
                            }
                            {
                                title !== "Admin Profile" ?
                                    <>
                                        <tr>
                                            <th>Address</th>
                                            <td>{data.address}</td>
                                        </tr>
                                        <tr>
                                            <th>Pin</th>
                                            <td>{data.pin}</td>
                                        </tr>
                                        <tr>
                                            <th>City</th>
                                            <td>{data.city}</td>
                                        </tr>
                                        <tr>
                                            <th>State</th>
                                            <td>{data.state}</td>
                                        </tr>
                                    </> : null
                            }
                            <tr>
                                <td colSpan={2}>
                                    <Link to="/update-profile" className='btn btn-primary w-100'>Update Profile</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
