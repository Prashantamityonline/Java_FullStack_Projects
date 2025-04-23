import React from 'react'
import { Link } from 'react-router-dom'

export default function HeroSection({ title }) {
    return (
        <div
            className="container-fluid header-bg py-5 mb-2 wow fadeIn"
            data-wow-delay="0.1s"
        >
            <div className="container py-5">
                <h1 className="display-4 text-white mb-3 animated slideInDown">{title}</h1>
                <nav aria-label="breadcrumb animated slideInDown">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item text-light active" aria-current="page">
                            {title}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}
