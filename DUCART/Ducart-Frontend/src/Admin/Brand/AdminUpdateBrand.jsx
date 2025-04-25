import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../Components/Sidebar";
import HeroSection from "../../Components/HeroSection";

import formValidators from "../../Components/Validators/formValidators";
import imageValidators from "../../Components/Validators/imageValidators";

import {
  updateMultipartRecord,
  getBrand,
} from "../../Redux/ActionCreators/BrandActionCreators";
export default function AdminUpdateBrand() {
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
  let BrandStateData = useSelector((state) => state.BrandStateData);

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
      let item = BrandStateData.find(
        (x) =>
          x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase() &&
          x.id !== id
      );
      if (item) {
        setShow(true);
        setErrorMessage((old) => {
          return {
            ...old,
            name: "Brand Name is Already Exist",
          };
        });
      } else {
        //but in case of real server and if form has file field
        var formData = new FormData();
        formData.append("id", id); //use id
        var formData = new FormData();
        formData.append(
          "data",
          JSON.stringify({
            name: data.name,
            active: data.active,
          })
        );

        if (data.pic instanceof File) {
          formData.append("pic", data.pic);
        }
        dispatch(updateMultipartRecord(formData));
        navigate("/admin/brand");
      }
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getBrand());
      if (BrandStateData.length)
        setData(BrandStateData.find((x) => x.id === Number(id)));
    })();
  }, [id, BrandStateData.length]);
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
              Update Brand{" "}
              <Link to="/admin/brand">
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
                  placeholder="Brand Name"
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
                    placeholder="Brand Name"
                  />
                  {show && errorMessage.pic ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.pic}
                    </p>
                  ) : null}
                  {data.pic && (
                    <div className="mt-2">
                      <img
                        src={
                          data.pic instanceof File
                            ? URL.createObjectURL(data.pic)
                            : `http://localhost:8080/uploads/brands/${data.pic}`
                        }
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
