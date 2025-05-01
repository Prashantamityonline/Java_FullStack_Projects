import React from 'react'

export default function Values() {
    return (
        <section id="values" className="values section">

            <div className="container section-title" data-aos="fade-up">
                <h2>Our Values</h2>
                <p>What we value most<br /></p>
            </div>

            <div className="container">

                <div className="row gy-4">

                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                        <div className="card">
                            <img src="assets/img/values-3.png" className="img-fluid" alt="" />
                            <h3>Authenticity First</h3>
                            <p>We promise 100% original products from trusted brands like Nike, Adidas, Puma, and more. No fakes, no compromises — just genuine fashion delivered directly to your doorstep with confidence.</p>
                        </div>
                    </div>

                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                        <div className="card">
                            <img src="assets/img/values-2.png" className="img-fluid" alt="" />
                            <h3>Customer-Centric Approach</h3>
                            <p>Our customers are at the heart of everything we do. From easy browsing to secure checkout and fast delivery, we focus on providing a smooth and satisfying shopping experience every time.</p>
                        </div>
                    </div>

                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
                        <div className="card">
                            <img src="assets/img/values-1.png" className="img-fluid" alt="" />
                            <h3>Style for Everyone</h3>
                            <p>Whether it’s men, women, or kids — we believe fashion is for all. We offer diverse styles, sizes, and trends to make sure everyone finds something they love at Apna Bazar.</p>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}
