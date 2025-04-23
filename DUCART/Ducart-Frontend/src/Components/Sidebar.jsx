import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="list-group">
            <Link to="/admin" className="list-group-item list-group-item-action active" aria-current="true"><i className='fa fa-home fs-3'></i> <span className='float-end'>Home</span></Link>
            <Link to="/admin/maincategory" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-list fs-3'></i> <span className='float-end'>Maincategory</span></Link>
            <Link to="/admin/subcategory" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-list fs-3'></i> <span className='float-end'>Subcategory</span></Link>
            <Link to="/admin/brand" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-list fs-3'></i> <span className='float-end'>Brand</span></Link>
            <Link to="/admin/product" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-list fs-3'></i> <span className='float-end'>Product</span></Link>
            <Link to="/admin/testimonial" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-star fs-3'></i> <span className='float-end'>Testimonial</span></Link>
            <Link to="/admin/newsletter" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-envelope fs-3'></i> <span className='float-end'>Newsletter</span></Link>
            <Link to="/admin/user" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-users fs-3'></i> <span className='float-end'>Users</span></Link>
            <Link to="/admin/checkout" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-shopping-bag fs-3'></i> <span className='float-end'>Checkouts</span></Link>
            <Link to="/admin/contactus" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-phone fs-3'></i> <span className='float-end'>Contact Us</span></Link>
        </div>
    )
}
