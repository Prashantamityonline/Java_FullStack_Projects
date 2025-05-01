import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Breadcrum from '../../../Components/Breadcrum'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'

import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactusActionCreators"
export default function AdminContactUsShow() {
    let { id } = useParams()
    let [data, setData] = useState({})

    let dispatch = useDispatch()
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)

    let navigate = useNavigate()

    function deleteRecord() {
        if (window.confirm("Are You Sure to Delete That Item : ")) {
            dispatch(deleteContactUs({ id: id }))
            navigate("/admin/contactus")
        }
    }

    function updateRecord() {
        if (window.confirm("Are You Sure to Update Status : ")) {
            dispatch(updateContactUs({ ...data, active: !data.active }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length) {
            let item = ContactUsStateData.find(x => x.id === id)
            if (item)
                setData(item)
            else
                navigate("/admin/contactus")
        }
    }
    useEffect(() => {
        getAPIData()
    }, [ContactUsStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary w-100 p-2 text-light text-center'>ContactUs</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered table-hover table-striped'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{data.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Subject</th>
                                        <td>{data.subject}</td>
                                    </tr>
                                    <tr>
                                        <th>Message</th>
                                        <td>{data.message}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Active</th>
                                        <td>{data.active ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.active ?
                                                    <button className='w-100 btn btn-primary' onClick={updateRecord}>Update Status</button> :
                                                    <button className='w-100 btn btn-danger' onClick={deleteRecord}>Delete</button>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
