import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';  // Import jQuery
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // Import DataTables styles
import 'datatables.net';


import Sidebar from '../../Components/Sidebar'
import HeroSection from '../../Components/HeroSection'
import { Link } from 'react-router-dom'

import { deleteTestimonial, getTestimonial } from "../../Redux/ActionCreators/TestimonialActionCreators"
export default function AdminTestimonial() {
  let [data, setData] = useState([])

  let dispatch = useDispatch()
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData)

  function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete that Item : ")) {
      dispatch(deleteTestimonial({ id: id }))
      getAPIData()
    }
  }

  function getAPIData() {
    dispatch(getTestimonial())

    if (TestimonialStateData.length)
      setData(TestimonialStateData)
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
  }, [TestimonialStateData.length])

  return (
    <>
      <HeroSection title="Admin" />
      <div className="container-fluid">
        <div className='row'>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>Testimonial <Link to="/admin/testimonial/create"> <i className='fa fa-plus text-light float-end'></i></Link></h5>
            <table className='table table-bordered table-hover table-striped' id='DataTable'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Message</th>
                  <th>Pic</th>
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
                      <td>
                        <div className="testimonial-message">
                          {item.message}
                        </div>
                      </td>
                      <td>
                        <Link to={`${process.env.REACT_APP_SERVER}${item.pic}`} target='_blank' rel='noreferrer'>
                          <img src={`${process.env.REACT_APP_SERVER}${item.pic}`} height={50} width={80} className='rounded' alt="Testimonial Image" />
                        </Link>
                      </td>
                      <td>{item.active ? "Yes" : "No"}</td>
                      <td><Link to={`/admin/testimonial/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link></td>
                      <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>
                    </tr>
                  })
                }
              </tbody>
            </table>
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

// export default function AdminTestimonial() {
//   let [data, setData] = useState([])

//   async function deleteRecord(id) {
//     if (window.confirm("Are You Sure to Delete that Item : ")) {
//       let response = await fetch(`${process.env.REACT_APP_SERVER}/testimonial/${id}`, {
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
//     let response = await fetch(`${process.env.REACT_APP_SERVER}/testimonial`, {
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
//             <h5 className='bg-primary text-center text-light p-2'>Testimonial <Link to="/admin/testimonial/create"> <i className='fa fa-plus text-light float-end'></i></Link></h5>
//             <table className='table table-bordered table-hover table-striped' id='DataTable'>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Pic</th>
//                   <th>Active</th>
//                   <th></th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {
//                   data.map((item, index) => {
//                     return <tr key={index}>
//                       <td>{item.id}</td>
//                       <td>{item.name}</td>
//                       <td>
//                         <div className="testimonial-message">
//                           {item.message}
//                         </div>
//                       </td>
//                       <td>
//                         <Link to={`${process.env.REACT_APP_SERVER}${item.pic}`} target='_blank' rel='noreferrer'>
//                           <img src={`${process.env.REACT_APP_SERVER}${item.pic}`} height={50} width={80} className='rounded' alt="Testimonial Image" />
//                         </Link>
//                       </td>
//                       <td>{item.active ? "Yes" : "No"}</td>
//                       <td><Link to={`/admin/testimonial/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link></td>
//                       <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>
//                     </tr>
//                   })
//                 }
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
