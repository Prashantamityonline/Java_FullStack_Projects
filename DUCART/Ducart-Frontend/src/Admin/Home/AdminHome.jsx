import React from 'react'
import Sidebar from '../../Components/Sidebar'
import HeroSection from '../../Components/HeroSection'
import { Link } from 'react-router-dom'
import Profile from '../../Components/Profile'

export default function AdminHome() {
  return (
    <>
      <HeroSection title="Admin" />
      <div className="container-fluid">
        <div className='row'>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Profile title="Admin Profile" />
          </div>
        </div>
      </div>

    </>
  )
}
