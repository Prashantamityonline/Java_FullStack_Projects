import React from 'react'

export default function BootstrapExample() {
    let data = [
        { id: 1, name: "Product1", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p1.jpg" },
        { id: 2, name: "Product2", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p2.jpg" },
        { id: 3, name: "Product3", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p3.jpg" },
        { id: 4, name: "Product4", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p4.jpg" },
        { id: 5, name: "Product5", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p5.jpg" },
        { id: 6, name: "Product6", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p6.jpg" },
        { id: 7, name: "Product7", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p7.jpg" },
        { id: 8, name: "Product8", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p8.jpg" },
        { id: 9, name: "Product9", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p9.jpg" },
        { id: 10, name: "Product10", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p10.jpg" },
        { id: 11, name: "Product11", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p11.jpg" },
        { id: 12, name: "Product12", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p12.jpg" },
        { id: 13, name: "Product13", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p13.jpg" },
        { id: 14, name: "Product14", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p14.jpg" },
        { id: 15, name: "Product15", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p15.jpg" },
        { id: 16, name: "Product16", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p16.jpg" },
        { id: 17, name: "Product17", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p17.jpg" },
        { id: 18, name: "Product18", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p18.jpg" },
        { id: 19, name: "Product19", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p19.jpg" },
        { id: 20, name: "Product20", basePrice: 2400, discount: 50, finalPrice: 1200, pic: "/images/p20.jpg" }
    ]
    return (
        <>
            <nav className="navbar navbar-expand-lg background sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand text-light" href="#">Dcart</a>
                    <button className="navbar-toggler border-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="material-symbols-outlined text-light">menu</span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-light active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="#">Shop</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="#">Contact Us</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link text-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Nitin Chauhan
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li><a className="dropdown-item" href="#">Cart</a></li>
                                    <li><a className="dropdown-item" href="#">Checkout</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="nav-link text-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Login
                                </button>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6" aria-label="Slide 7"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="7" aria-label="Slide 8"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="8" aria-label="Slide 9"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="9" aria-label="Slide 10"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/images/banner1.jpg" height={550} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/banner2.jpg" height={550} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/banner3.jpg" height={550} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/banner4.jpg" height={550} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/banner5.jpg" height={550} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/banner6.jpg" height={550} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/banner7.jpg" height={550} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/banner8.jpg" height={550} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/banner9.jpg" height={550} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/banner10.jpg" height={550} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="container-fluid my-3">
                <h5 className="background text-light text-center p-2">Latest Products</h5>
                <div className="row">
                    {
                        data.map((item, index) => {
                            return <div key={index} className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                                <div className="card">
                                    <img src={item.pic} height={200} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text"><del className='text-danger'>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% Off</sup></p>
                                        <a href="#" className="btn btn-primary w-100 background">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <img src="/images/banner6.jpg" className='img-fluid' alt="" />
                    </div>
                    <div className="col-md-6">
                        <h5 className='background text-light p-2 text-center'>Do You Have Any Query?Contact Us</h5>
                        <form action="">
                            <div className="mb-3">
                                <input type="text" name="name" placeholder='Full Name' className='form-control border-3 border-secondary' />
                            </div>
                            <div className="mb-3">
                                <input type="text" name="email" placeholder='Email Address' className='form-control border-3 border-secondary' />
                            </div>
                            <div className="mb-3">
                                <input type="text" name="phone" placeholder='Phone Number' className='form-control border-3 border-secondary' />
                            </div>
                            <div className="mb-3">
                                <input type="text" name="subject" placeholder='Subject' className='form-control border-3 border-secondary' />
                            </div>
                            <div className="mb-3">
                                <textarea name="message" placeholder='Message' rows={4} className='form-control border-3 border-secondary' ></textarea>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100 background'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Login To Your Account</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action="">
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" name="username" placeholder='Username or Email Address' className='form-control border-3 border-secondary' />
                                </div>
                                <div className="mb-3">
                                    <input type="password" name="password" placeholder='Password' className='form-control border-3 border-secondary' />
                                </div>
                            </div>
                            <div className="modal-footer btn-group">
                                <button type="submit" className="btn btn-primary">Login</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

/*
CSS Property                                Bootstrap Class
text-align:left                             text-start
text-align:right                            text-end
text-align:justify                          text-justify
text-align:center                           text-center

display:block                               d-block
display:inline                              d-inline
display:none                                d-none
display:inline-block                        d-inline-block

display:flex                                d-flex
flex-direction:row                          flex-row
flex-direction:row-reverse                  flex-row-reverse
flex-direction:column                       flex-column
flex-direction:column-reverse               flex-column-reverse

justify-content:space-around                justify-content-around
justify-content:space-between               justify-content-between
justify-content:space-evenly                justify-content-evenly
justify-content:flex-start                  justify-content-start
justify-content:flex-end                    justify-content-end
justify-content:center                      justify-content-center

padding:10px                                p-1 p-2 p-3 p-4 p-5
padding-top:10px                            pt-1 pt-2 pt-3 pt-4 pt-5
padding-bottom:10px                         pb-1 pb-2 pb-3 pb-4 pb-5
padding-left:10px                           ps-1 ps-2 ps-3 ps-4 ps-5
padding-right:10px                          pe-1 pe-2 pe-3 pe-4 pe-5
padding:10px 0                              py-1 py-2 py-3 py-4 py-5
padding:0 10px                              px-1 px-2 px-3 px-4 px-5

margin:10px                                m-1 m-2 m-3 m-4 m-5
margin-top:10px                            mt-1 mt-2 mt-3 mt-4 mt-5
margin-bottom:10px                         mb-1 mb-2 mb-3 mb-4 mb-5
margin-left:10px                           ms-1 ms-2 ms-3 ms-4 ms-5
margin-right:10px                          me-1 me-2 me-3 me-4 me-5
margin:10px 0                              my-1 my-2 my-3 my-4 my-5
margin:0 10px                              mx-1 mx-2 mx-3 mx-4 mx-5
margin:auto                                m-auto

width:100%                                 w-100 w-75 w-50 w-25
font-size:10px                             fs-1 fs-2 fs-3 fs-4 fs-5

                                           btn btn-primary btn-secondary btn-info
                                           btn-success btn-danger btn-warning
                                           btn-light btn-dark btn-link

background-color:red                       bg-primary bg-secondary bg-info bg-success
                                           bg-dark bg-light bg-warning bg-danger

color:red                                  text-primary text-secondary text-info
                                           text-dark text-light text-warning 
                                           text-danger


                                           form-control  form-select

                                           border border-1 border-2 border-3 border-4
                                           border-5 border-primary border-secondary
                                           border-info border-dark border-light
                                           border-warning border-danger

border-radius:50%                          rounded rounded-top rounded-end 
                                           rounded-bottom rounded-start rounded-circle
                                           rounded-pill

float-left                                 float-start
float-right                                float-end
                                           etc


Bootstrap Grid Sytem:
  row = 12 columns

  
Breakpoint	        Class infix	Dimensions
X-Small	            None	    <576px
Small	            sm	        ≥576px
Medium    	        md	        ≥768px
Large	            lg	        ≥992px
Extra large	        xl	        ≥1200px
Extra extra large	xxl	        ≥1400px


<div className="row">
  <div className="col-xxl-1 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12"> 
    -------
    Element
    -------
  </div>
</div>

col-xxl-1 i.e 12 items in a row
col-xl-2  i.e 6 items in a row
col-lg-3  i.e 4 items in a row
col-md-4  i.e 3 items in a row
col-sm-6  i.e 2 items in a row
col-12    i.e 1 item in a row

<div className="row">
  <div className="col-lg-3 col-sm-6"> 
    -------
    Element
    -------
  </div>
</div>

col-lg-3  i.e in xxl xl and lg screen, 4 items in a row
col-sm-6  i.e in md and sm screen, 2 items in a row
          and default for X-small, 1 item in a row
*/