import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <div className="navbar navbar-expand-lg bg-primary">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className='nav-item'><NavLink className='nav-link text-light' to="">Home</NavLink></li>
          <li className='nav-item'><NavLink className='nav-link text-light' to="/about">About</NavLink></li>
          <li className='nav-item'><NavLink className='nav-link text-light' to="/profile/Nitin Chauhan/156700/Trainer">Profile</NavLink></li>
          <li className='nav-item'><NavLink className='nav-link text-light' to="/contact?name=Nitin Chauhan&salary=156700&dsg=Trainer">Contact</NavLink></li>
        </ul>
      </div>
    </>
  )
}


// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function Navbar() {
//   return (
//     <>
//       <div className="navbar navbar-expand-lg bg-primary">
//         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//           <li className='nav-item active'><Link className='nav-link text-light' to="">Home</Link></li>
//           <li className='nav-item'><Link className='nav-link text-light' to="/about">About</Link></li>
//           <li className='nav-item'><Link className='nav-link text-light' to="/profile">Profile</Link></li>
//           <li className='nav-item'><Link className='nav-link text-light' to="/contact">Contact</Link></li>
//         </ul>
//       </div>
//     </>
//   )
// }
