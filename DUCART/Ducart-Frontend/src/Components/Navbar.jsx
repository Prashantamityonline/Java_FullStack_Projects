import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("login");
    localStorage.removeItem("name");
    localStorage.removeItem("userid");
    localStorage.removeItem("role");
    navigate("/login");
  }
  return (
    <>
      {/* <!-- Topbar Start --> */}
      <div
        className="container-fluid bg-light p-0 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-envelope text-primary me-2"></small>
              <Link
                to="mailto:vishankchauhan@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                ps2702204@gmail.com
              </Link>
            </div>
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-phone text-primary me-2"></small>
              <Link to="tel:+919873848046" target="_blank" rel="noreferrer">
                +91-7505948562
              </Link>
            </div>
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-whatsapp text-primary me-2"></small>
              <Link
                to="https://wa.me/+917505948562"
                target="_blank"
                rel="noreferrer"
              >
                +91-7505948562
              </Link>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="h-100 d-inline-flex align-items-center">
              <a
                className="btn btn-sm-square bg-white text-primary me-1"
                href="#"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="btn btn-sm-square bg-white text-primary me-1"
                href="#"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="btn btn-sm-square bg-white text-primary me-1"
                href="#"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                className="btn btn-sm-square bg-white text-primary me-0"
                href=""
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Topbar End --> */}

      {/* <!-- Navbar Start --> */}
      <nav
        className="navbar navbar-expand-lg bg-white navbar-light sticky-top py-lg-0 px-4 px-lg-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <Link to="/" className="navbar-brand p-0">
          <i className="fa fa-shopping-bag text-primary fs-1 me-2"></i>
          <h1 className="m-0 text-primary">Ducart</h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse py-4 py-lg-0"
          id="navbarCollapse"
        >
          <div className="navbar-nav ms-auto">
            <NavLink to="/" className="nav-item nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-item nav-link">
              About
            </NavLink>
            <NavLink to="/shop" className="nav-item nav-link">
              Shop
            </NavLink>
            {/* <NavLink to="/features" className="nav-item nav-link">Features</NavLink> */}
            <NavLink to="/testimonials" className="nav-item nav-link">
              Testimonials
            </NavLink>
            <NavLink to="/contactus" className="nav-item nav-link">
              Contact Us
            </NavLink>
            <NavLink to="/admin" className="nav-item nav-link">
              Admin
            </NavLink>
            {localStorage.getItem("login") ? (
              <div className="nav-item dropdown">
                <p
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {localStorage.getItem("name")}
                </p>
                <div className="dropdown-menu rounded-0 rounded-bottom m-0">
                  {localStorage.getItem("role") === "Buyer" ? (
                    <>
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      <Link to="/cart" className="dropdown-item">
                        Cart
                      </Link>
                      <Link to="/checkout" className="dropdown-item">
                        Checkout
                      </Link>
                    </>
                  ) : (
                    <Link to="/admin" className="dropdown-item">
                      Profile
                    </Link>
                  )}
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          {!localStorage.getItem("login") ? (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          ) : null}
        </div>
      </nav>
      {/* <!-- Navbar End --> */}
    </>
  );
}
