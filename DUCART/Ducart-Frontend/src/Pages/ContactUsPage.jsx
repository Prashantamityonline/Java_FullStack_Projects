import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import HeroSection from "../Components/HeroSection";
import About from "../Components/About";
import Testimonial from "../Components/Testimonial";

import formValidators from "../Components/Validators/formValidators";

import { createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators";
export default function ContactUsPage() {
  let [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    email: "Email Field is Mendatory",
    phone: "Phone Field is Mendatory",
    subject: "Subject Field is Mendatory",
    message: "Message Field is Mendatory",
  });
  let [show, setShow] = useState(false);
  let [message, setMessage] = useState("");

  let dispatch = useDispatch();

  function getInputData(e) {
    let { name, value } = e.target;
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: formValidators(e),
      };
    });
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) setShow(true);
    else {
      dispatch(createContactUs({ ...data, active: true, date: new Date() }));
      setMessage(
        "Thanks to Share Your Query With Us. Our Team Will Contact You Soon!!"
      );
      setData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  }
  return (
    <>
      <HeroSection title="Contact Us" />

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 card bg-primary p-4 mb-5 border-5 border-light">
              <h3 className="text-light text-center">
                <i className="fa fa-map-marker"></i> Address
              </h3>
              <p className="text-light text-center">
                A-43, Sector 44, Noida, UP, 201301, India
              </p>
            </div>
            <div className="col-md-3 col-sm-6 card bg-primary p-4 mb-5 border-5 border-light">
              <h3 className="text-light text-center">
                <i className="fa fa-envelope"></i> Email Address
              </h3>
              <Link
                to="mailto:ps2702204@gmail.com"
                target="blank"
                rel="noreferrer"
                className="text-light text-center"
              >
                ps2702204@gmail.com
              </Link>
            </div>
            <div className="col-md-3 col-sm-6 card bg-primary p-4 mb-5 border-5 border-light">
              <h3 className="text-light text-center">
                <i className="fa fa-phone"></i> Phone
              </h3>
              <Link
                to="tel:+917505948562"
                target="blank"
                rel="noreferrer"
                className="text-light text-center"
              >
                +91-7505948562
              </Link>
            </div>
            <div className="col-md-3 col-sm-6 card bg-primary p-4 mb-5 border-5 border-light">
              <h3 className="text-light text-center">
                <i className="fa fa-whatsapp"></i> Whats App
              </h3>
              <Link
                to="https://wa.me/+917505948562"
                target="blank"
                rel="noreferrer"
                className="text-light text-center"
              >
                +91- 7505948562
              </Link>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="text-center mb-4">
                Have Any Query? Please Contact Us!
              </h1>
              {message ? (
                <p className="text-success text-center">{message}</p>
              ) : null}
              <form onSubmit={postData}>
                <div className="mb-3">
                  <label>Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.name
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Full Name"
                  />
                  {show && errorMessage.name ? (
                    <p className="text-danger">{errorMessage.name}</p>
                  ) : null}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={getInputData}
                      className={`form-control border-3 ${
                        show && errorMessage.email
                          ? "border-danger"
                          : "border-primary"
                      }`}
                      placeholder="Email Address"
                    />
                    {show && errorMessage.email ? (
                      <p className="text-danger">{errorMessage.email}</p>
                    ) : null}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Phone*</label>
                    <input
                      type="text"
                      name="phone"
                      value={data.phone}
                      onChange={getInputData}
                      className={`form-control border-3 ${
                        show && errorMessage.phone
                          ? "border-danger"
                          : "border-primary"
                      }`}
                      placeholder="Phone Number"
                    />
                    {show && errorMessage.phone ? (
                      <p className="text-danger">{errorMessage.phone}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mb-3">
                  <label>Subject*</label>
                  <input
                    type="text"
                    name="subject"
                    value={data.subject}
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.subject
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Subject"
                  />
                  {show && errorMessage.subject ? (
                    <p className="text-danger">{errorMessage.subject}</p>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label>Message*</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={data.message}
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.message
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Message..."
                  ></textarea>
                  {show && errorMessage.message ? (
                    <p className="text-danger">{errorMessage.message}</p>
                  ) : null}
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="h-100" style={{ minHeight: "400px" }}>
                <iframe
                  width="100%"
                  height="600"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=a-43%20sector%2016%20noida&t=&z=13&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Testimonial />
      <About />
    </>
  );
}
