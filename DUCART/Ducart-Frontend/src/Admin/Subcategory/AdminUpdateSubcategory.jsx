import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../Components/Sidebar";
import HeroSection from "../../Components/HeroSection";

import formValidators from "../../Components/Validators/formValidators";
import imageValidators from "../../Components/Validators/imageValidators";

import {
  updateMultipartRecord,
  getSubcategory,
} from "../../Redux/ActionCreators/SubcategoryActionCreators";
export default function AdminUpdateSubcategory() {
  let { id } = useParams();
  let [data, setData] = useState({
    name: "",
    pic: "",
    active: true,
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    pic: "",
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  let dispatch = useDispatch();
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);

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
      let item = SubcategoryStateData.find(
        (x) =>
          x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase() &&
          x.id !== id
      );
      if (item) {
        setShow(true);
        setErrorMessage((old) => {
          return {
            ...old,
            name: "Subcategory Name is Already Exist",
          };
        });
      } else {
        //but in case of real server and if form has file field
        var formData = new FormData();
        formData.append("id", id); //use id or _id according to your database
        formData.append(
          "data",
          JSON.stringify({ name: data.name, active: data.active })
        );
        if (data.pic instanceof File) {
          formData.append("pic", data.pic);
        }
        dispatch(updateMultipartRecord(formData));

        navigate("/admin/subcategory");
      }
    }
  }

  // First useEffect: Redux se data fetch karne ke liye
  useEffect(() => {
    dispatch(getSubcategory());
  }, []);

  // Second useEffect: Data set karne ke liye jab redux data ya id change ho
  useEffect(() => {
    const category = SubcategoryStateData.find((x) => x.id === Number(id));
    if (category) {
      setData({
        name: category.name,
        pic: category.pic,
        active: category.active,
      });
    }
  }, [id, SubcategoryStateData]);

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
              Update Subcategory{" "}
              <Link to="/admin/subcategory">
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
                  value={data.name}
                  onChange={getInputData}
                  className={`form-control border-3 ${
                    show && errorMessage.name
                      ? "border-danger"
                      : "border-primary"
                  }`}
                  placeholder="Subcategory Name"
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
                    placeholder="Subcategory Name"
                  />
                  {show && errorMessage.pic ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.pic}
                    </p>
                  ) : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    name="active"
                    value={data.active ? "1" : "0"}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
