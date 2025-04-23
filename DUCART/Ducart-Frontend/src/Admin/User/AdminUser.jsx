import React, { useEffect, useState } from 'react'

import $ from 'jquery';  // Import jQuery
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // Import DataTables styles
import 'datatables.net';


import Sidebar from '../../Components/Sidebar'
import HeroSection from '../../Components/HeroSection'

export default function AdminUser() {
  let [data, setData] = useState([])

  async function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete that Item : ")) {
      let response = await fetch(`${process.env.REACT_APP_SERVER}/user/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      getAPIData()
    }
  }

  async function getAPIData() {
    let response = await fetch(`${process.env.REACT_APP_SERVER}/user`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    response = await response.json()
    if (response)
      setData(response)
    else
      alert("Something Went Wrong")

    let time = setTimeout(() => {
      $('#DataTable').DataTable()
    }, 500);
    return time
  }
  useEffect(() => {
    let time = getAPIData()
    return () => clearTimeout(time)
  }, [])


  return (
    <>
      <HeroSection title="Admin" />
      <div className="container-fluid">
        <div className='row'>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>User</h5>
            <div className="table-responsive">
              <table className='table table-bordered table-hover table-striped' id='DataTable'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item, index) => {
                      return <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.role}</td>
                        <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
