import React from 'react'

export default function Facts() {
  return (
    <section id="stats" className="stats section">

    <div className="container" data-aos="fade-up" data-aos-delay="100">

      <div className="row gy-4">

        <div className="col-lg-3 col-md-6">
          <div className="stats-item d-flex align-items-center w-100 h-100">
            <i className="bi bi-emoji-smile color-blue flex-shrink-0"></i>
            <div>
              <span data-purecounter-start="0" data-purecounter-end="10000" data-purecounter-duration="1" className="purecounter">10000+</span>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="stats-item d-flex align-items-center w-100 h-100">
            <i className="bi bi-journal-richtext color-orange flex-shrink-0" style={{color: "#ee6c20"}}></i>
            <div>
              <span data-purecounter-start="0" data-purecounter-end="100" data-purecounter-duration="1" className="purecounter">100+</span>
              <p>Products</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="stats-item d-flex align-items-center w-100 h-100">
            <i className="bi bi-headset color-green flex-shrink-0" style={{color: "#15be56"}}></i>
            <div>
              <span data-purecounter-start="0" data-purecounter-end="24/7" data-purecounter-duration="1" className="purecounter">24/7</span>
              <p>Customer Support</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="stats-item d-flex align-items-center w-100 h-100">
            <i className="bi bi-people color-pink flex-shrink-0" style={{color: "#bb0852"}}></i>
            <div>
              <span data-purecounter-start="0" data-purecounter-end="50" data-purecounter-duration="1" className="purecounter">50+</span>
              <p>TOP Brands</p>
            </div>
          </div>
        </div>

      </div>

    </div>

  </section>
  )
}
