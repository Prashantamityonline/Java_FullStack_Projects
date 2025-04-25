import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Sidebar";
import HeroSection from "../../Components/HeroSection";

import formValidators from "../../Components/Validators/formValidators";
import imageValidators from "../../Components/Validators/imageValidators";

import {
  createMultipartRecord,
  getMaincategory,
} from "../../Redux/ActionCreators/MaincategoryActionCreators";
export default function AdminCreateMaincategory() {
  let [data, setData] = useState({
    name: "",
    pic: "",
    active: true,
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    pic: "Pic Field is Mendatory",
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  let dispatch = useDispatch();
  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );

  function getInputData(e) {
    let name = e.target.name;
    let value = e.target.files ? e.target.files[0] : e.target.value;
    if (name !== "active") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: e.target.files ? imageValidators(e) : formValidators(e),
        };
      });
    }
    setData((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === "1" ? true : false) : value,
      };
    });
  }
  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) setShow(true);
    else {
      let item = MaincategoryStateData.find(
        (x) => x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
      );
      if (item) {
        setShow(true);
        setErrorMessage((old) => {
          return {
            ...old,
            name: "Maincategory Name is Already Exist",
          };
        });
      } else {
        var formData = new FormData();
        formData.append(
          "data",
          new Blob(
            [
              JSON.stringify({
                name: data.name,
                active: data.active,
              }),
            ],
            { type: "application/json" }
          )
        );

        if (data.pic instanceof File) {
          formData.append("pic", data.pic);
        }

        dispatch(createMultipartRecord(formData)); // Correct Redux action
        navigate("/admin/maincategory");
      }
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getMaincategory());
    })();
  }, [MaincategoryStateData.length]);
  return (
    <>
      <HeroSection title="Admin" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-center text-light p-2">
              Create Maincategory{" "}
              <Link to="/admin/maincategory">
                {" "}
                <i className="fa fa-backward text-light float-end"></i>
              </Link>
            </h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  onChange={getInputData}
                  className={`form-control border-3 ${
                    show && errorMessage.name
                      ? "border-danger"
                      : "border-primary"
                  }`}
                  placeholder="Maincategory Name"
                />
                {show && errorMessage.name ? (
                  <p className="text-danger text-capitalize">
                    {errorMessage.name}
                  </p>
                ) : null}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pic*</label>
                  <input
                    type="file"
                    name="pic"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.pic
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Maincategory Name"
                  />
                  {show && errorMessage.pic ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.pic}
                    </p>
                  ) : null}
                  {data.pic && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(data.pic)}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ maxWidth: "150px", maxHeight: "150px" }}
                      />
                    </div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    name="active"
                    onChange={getInputData}
                    className="form-select border-3 border-primary"
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
