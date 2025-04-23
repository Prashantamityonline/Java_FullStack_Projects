import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';  // Import jQuery
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // Import DataTables styles
import 'datatables.net';


import Sidebar from '../../Components/Sidebar'
import HeroSection from '../../Components/HeroSection'

import { deleteContactUs, getContactUs, updateContactUs } from "../../Redux/ActionCreators/ContactUsActionCreators"
import { Link } from 'react-router-dom';
export default function AdminContactUs() {
  let [data, setData] = useState([])

  let dispatch = useDispatch()
  let ContactUsStateData = useSelector((state) => state.ContactUsStateData)

  function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete that Item : ")) {
      dispatch(deleteContactUs({ id: id }))
      getAPIData()
    }
  }

  function getAPIData() {
    dispatch(getContactUs())

    if (ContactUsStateData.length)
      setData(ContactUsStateData)
    else
      setData([])

    let time = setTimeout(() => {
      $('#DataTable').DataTable()
    }, 500);
    return time
  }
  useEffect(() => {
    let time = getAPIData()
    return () => clearTimeout(time)
  }, [ContactUsStateData.length])

  return (
    <>
      <HeroSection title="Admin" />
      <div className="container-fluid">
        <div className='row'>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>ContactUs</h5>
            <div className="table-responsive">
              <table className='table table-bordered table-hover table-striped' id='DataTable'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Active</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item, index) => {
                      return <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.subject}</td>
                        <td>{new Date(item.date).toLocaleString()}</td>
                        <td>{item.active ? "Yes" : "No"}</td>
                        <td><Link to={`/admin/contactus/show/${item.id}`} className='btn btn-primary'><i className='fa fa-eye'></i></Link></td>
                        <td>{item.active ? null : <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button>}</td>
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




// import React, { useEffect, useState } from 'react'

// import $ from 'jquery';  // Import jQuery
// import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // Import DataTables styles
// import 'datatables.net';


// import Sidebar from '../../Components/Sidebar'
// import HeroSection from '../../Components/HeroSection'
// import { Link } from 'react-router-dom'

// export default function AdminContactUs() {
//   let [data, setData] = useState([])

//   async function deleteRecord(id) {
//     if (window.confirm("Are You Sure to Delete that Item : ")) {
//       let response = await fetch(`${process.env.REACT_APP_SERVER}/contactus/${id}`, {
//         method: "DELETE",
//         headers: {
//           "content-type": "application/json"
//         }
//       })
//       response = await response.json()
//       getAPIData()
//     }
//   }

//   async function getAPIData() {
//     let response = await fetch(`${process.env.REACT_APP_SERVER}/contactus`, {
//       method: "GET",
//       headers: {
//         "content-type": "application/json"
//       }
//     })
//     response = await response.json()
//     if (response)
//       setData(response)
//     else
//       alert("Something Went Wrong")

//     let time = setTimeout(() => {
//       $('#DataTable').DataTable()
//     }, 500);
//     return time
//   }
//   useEffect(() => {
//     let time = getAPIData()
//     return () => clearTimeout(time)
//   }, [])

//   return (
//     <>
//       <HeroSection title="Admin" />
//       <div className="container-fluid">
//         <div className='row'>
//           <div className="col-md-3">
//             <Sidebar />
//           </div>
//           <div className="col-md-9">
//             <h5 className='bg-primary text-center text-light p-2'>ContactUs <Link to="/admin/contactus/create"> <i className='fa fa-plus text-light float-end'></i></Link></h5>
//             <div className="table-responsive">
//               <table className='table table-bordered table-hover table-striped' id='DataTable'>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Subject</th>
//                     <th>Date</th>
//                     <th>Active</th>
//                     <th></th>
//                     <th></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     data.map((item, index) => {
//                       return <tr key={index}>
//                         <td>{item.id}</td>
//                         <td>{item.name}</td>
//                         <td>{item.email}</td>
//                         <td>{item.phone}</td>
//                         <td>{item.subject}</td>
//                         <td>{new Date(item.date).toLocaleString()}</td>
//                         <td>{item.active ? "Yes" : "No"}</td>
//                         <td><Link to={`/admin/contactus/show/${item.id}`} className='btn btn-primary'><i className='fa fa-eye'></i></Link></td>
//                         <td>{item.active ? null : <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button>}</td>
//                       </tr>
//                     })
//                   }
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
