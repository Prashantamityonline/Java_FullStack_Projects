import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../Components/Sidebar";
import HeroSection from "../../Components/HeroSection";

import formValidators from "../../Components/Validators/formValidators";
import imageValidators from "../../Components/Validators/imageValidators";

import {
  updateMultipartRecord,
  getMaincategory,
} from "../../Redux/ActionCreators/MaincategoryActionCreators";
export default function AdminUpdateMaincategory() {
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

    if (!id) {
      console.error("Error: Maincategory ID is undefined!");
      return;
    }

    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) {
      setShow(true);
    } else {
      let item = MaincategoryStateData.find(
        (x) => x.name.toLowerCase() === data.name.toLowerCase() && x.id !== id
      );
      if (item) {
        setShow(true);
        setErrorMessage((old) => ({
          ...old,
          name: "Maincategory Name already exists",
        }));
      } else {
        const formData = new FormData();

        // Add form fields
        formData.append("id", id);
        formData.append(
          "data",
          JSON.stringify({ name: data.name, active: data.active })
        );

        if (data.pic instanceof File) {
          formData.append("pic", data.pic);
        }

        // Dispatch redux action with **pure formData**
        dispatch(updateMultipartRecord(formData));
        navigate("/admin/maincategory");
      }
    }
  }
  useEffect(() => {
    dispatch(getMaincategory());
  }, []);
  useEffect(() => {
    console.log("Redux Data:", MaincategoryStateData);
    let category = MaincategoryStateData.find((x) => x.id === Number(id));

    if (category) {
      setData({
        name: category.name,
        pic: category.pic,
        active: category.active,
      });
    }
  }, [id, MaincategoryStateData]);

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
              Update Maincategory{" "}
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
                  value={data.name}
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
                        src={
                          data.pic instanceof File
                            ? URL.createObjectURL(data.pic)
                            : `http://http://localhost:8080/${data.pic}`
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
