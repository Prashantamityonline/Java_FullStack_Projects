import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from "./Navbar"
import Footer from "./Footer"

import Home from "./Home"
import About from "./About"
import Profile from "./Profile"
import Contact from "./Contact"
import Error from "./Error"
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile/:name?/:salary?/:dsg?" element={<Profile/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/*" element={<Error/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
