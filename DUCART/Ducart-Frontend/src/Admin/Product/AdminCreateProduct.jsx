import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Sidebar";
import HeroSection from "../../Components/HeroSection";

import formValidators from "../../Components/Validators/formValidators";
import imageValidators from "../../Components/Validators/imageValidators";

import { createMultipartRecord } from "../../Redux/ActionCreators/ProductActionCreators";
import { getMaincategory } from "../../Redux/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../../Redux/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../../Redux/ActionCreators/BrandActionCreators";

let rte;

export default function AdminCreateProduct() {
  const refdiv = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );
  const SubcategoryStateData = useSelector(
    (state) => state.SubcategoryStateData
  );
  const BrandStateData = useSelector((state) => state.BrandStateData);

  const [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    size: "",
    basePrice: 0,
    discount: 0,
    finalPrice: 0,
    stock: true,
    description: "",
    stockQuantity: 0,
    active: true,
    pic: [],
  });

  const [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mandatory",
    color: "Color Field is Mandatory",
    size: "Size Field is Mandatory",
    basePrice: "Base Price Field is Mandatory",
    discount: "Discount Field is Mandatory",
    stockQuantity: "Stock Quantity Field is Mandatory",
    pic: "Pic Field is Mandatory",
  });

  const [show, setShow] = useState(false);

  const getInputData = (e) => {
    const name = e.target.name;
    const value = e.target.files ? e.target.files : e.target.value;

    if (name !== "active") {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: e.target.files ? imageValidators(e) : formValidators(e),
      }));
    }

    setData((prev) => ({
      ...prev,
      [name]:
        name === "active" || name === "stock"
          ? value === "true" || value === true
          : value,
    }));
  };

  const postData = (e) => {
    e.preventDefault();

    const hasError = Object.values(errorMessage).some((msg) => msg);
    if (hasError) return setShow(true);

    const formData = new FormData();

    const maincategory =
      data.maincategory || MaincategoryStateData?.[0]?.name || "";
    const subcategory =
      data.subcategory || SubcategoryStateData?.[0]?.name || "";
    const brand = data.brand || BrandStateData?.[0]?.name || "";

    const bp = parseFloat(data.basePrice) || 0;
    const discount = parseFloat(data.discount) || 0;
    const fp = parseFloat(data.finalPrice) || bp - (bp * discount) / 100;
    const stockQuantity = parseInt(data.stockQuantity) || 0;

    formData.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            name: data.name,
            maincategory,
            subcategory,
            brand,
            color: data.color,
            size: data.size,
            basePrice: bp,
            discount,
            finalPrice: fp,
            stock: data.stock,
            stockQuantity,
            description: rte?.getHTMLCode() || "",
            active: data.active,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (Array.isArray(data.pic)) {
      data.pic.forEach((file) => {
        if (file instanceof File) {
          formData.append("pic", file, file.name);
        }
      });
    }

    dispatch(createMultipartRecord(formData));
    navigate("/admin/product");
  };

  // const [data, setData] = useState({
  //   name: "",
  //   maincategory: "",
  //   subcategory: "",
  //   brand: "",
  //   color: "",
  //   size: "",
  //   basePrice: "",
  //   discount: "",
  //   finalPrice: "",
  //   stock: true,
  //   description: "",
  //   stockQuantity: "",
  //   active: true,
  //   pic: [],
  // });

  // const [errorMessage, setErrorMessage] = useState({
  //   name: "Name Field is Mandatory",
  //   color: "Color Field is Mandatory",
  //   size: "Size Field is Mandatory",
  //   basePrice: "Base Price Field is Mandatory",
  //   discount: "Discount Field is Mandatory",
  //   stockQuantity: "Stock Quantity Field is Mandatory",
  //   pic: "Pic Field is Mandatory",
  // });

  // const [show, setShow] = useState(false);

  // const getInputData = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.files ? e.target.files : e.target.value;
  //   if (name !== "active") {
  //     setErrorMessage((prev) => ({
  //       ...prev,
  //       [name]: e.target.files ? imageValidators(e) : formValidators(e),
  //     }));
  //   }

  //   setData((prev) => ({
  //     ...prev,
  //     [name]:
  //       name === "active" || name === "stock"
  //         ? value === "1"
  //           ? true
  //           : false
  //         : value,
  //   }));
  // };

  // const postData = (e) => {
  //   e.preventDefault();

  //   const hasError = Object.values(errorMessage).find((x) => x !== "");
  //   if (hasError) return setShow(true);

  //   var formData = new FormData();
  //   // Ensure data is available before accessing index 0
  //   const maincategory =
  //     data.maincategory !== ""
  //       ? data.maincategory
  //       : MaincategoryStateData?.[0]?.name || "";

  //   const subcategory =
  //     data.subcategory !== ""
  //       ? data.subcategory
  //       : SubcategoryStateData?.[0]?.name || "";

  //   const brand =
  //     data.brand !== "" ? data.brand : BrandStateData?.[0]?.name || "";

  //   const bp = data.basePrice || 0;
  //   const discount = data.discount || 0;
  //   const fp = data.finalPrice || bp - (bp * discount) / 100;
  //   const stockQuantity = data.stockQuantity || 0;

  //   formData.append(
  //     "data",
  //     new Blob(
  //       [
  //         JSON.stringify({
  //           name: data.name,
  //           maincategory: maincategory,
  //           subcategory: subcategory,
  //           brand: brand,
  //           color: data.color,
  //           size: data.size,
  //           basePrice: bp,
  //           discount: discount,
  //           finalPrice: fp,
  //           stock: data.stock,
  //           stockQuantity: stockQuantity,
  //           description: rte.getHTMLCode(),
  //           active: data.active,
  //         }),
  //       ],
  //       { type: "application/json" }
  //     )
  //   );

  //   // Handle images
  //   if (Array.isArray(data.pic)) {
  //     data.pic.forEach((file, index) => {
  //       if (file instanceof File) {
  //         formData.append("pic", file, file.name);
  //       }
  //     });
  //   }
  //   dispatch(createMultipartRecord(formData));
  //   navigate("/admin/product");
  // };

  useEffect(() => {
    rte = new window.RichTextEditor(refdiv.current);
    rte.setHTMLCode("");
  }, []);

  useEffect(() => {
    dispatch(getMaincategory());
  }, [MaincategoryStateData, dispatch]);

  useEffect(() => {
    dispatch(getSubcategory());
  }, [SubcategoryStateData, dispatch]);

  useEffect(() => {
    dispatch(getBrand());
  }, [BrandStateData, dispatch]);
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
              Create Product{" "}
              <Link to="/admin/product">
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
                  placeholder="Product Name"
                />
                {show && errorMessage.name ? (
                  <p className="text-danger text-capitalize">
                    {errorMessage.name}
                  </p>
                ) : null}
              </div>

              <div className="row">
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Maincategory*</label>
                  <select
                    name="maincategory"
                    onChange={getInputData}
                    className="form-select border-3 border-primary"
                  >
                    {MaincategoryStateData &&
                      MaincategoryStateData.filter((x) => x.active).map(
                        (item) => {
                          return <option key={item.id}>{item.name}</option>;
                        }
                      )}
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Subcategory*</label>
                  <select
                    name="subcategory"
                    onChange={getInputData}
                    className="form-select border-3 border-primary"
                  >
                    {SubcategoryStateData &&
                      SubcategoryStateData.filter((x) => x.active).map(
                        (item) => {
                          return <option key={item.id}>{item.name}</option>;
                        }
                      )}
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Brand*</label>
                  <select
                    name="brand"
                    onChange={getInputData}
                    className="form-select border-3 border-primary"
                  >
                    {BrandStateData &&
                      BrandStateData.filter((x) => x.active).map((item) => {
                        return <option key={item.id}>{item.name}</option>;
                      })}
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Stock*</label>
                  <select
                    name="stock"
                    onChange={getInputData}
                    className="form-select border-3 border-primary"
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Color*</label>
                  <input
                    type="text"
                    name="color"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.color
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Product Color"
                  />
                  {show && errorMessage.color ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.color}
                    </p>
                  ) : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Size*</label>
                  <input
                    type="text"
                    name="size"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.size
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Product Size"
                  />
                  {show && errorMessage.size ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.size}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Base Price*</label>
                  <input
                    type="number"
                    name="basePrice"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.basePrice
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Product Base Price"
                  />
                  {show && errorMessage.basePrice ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.basePrice}
                    </p>
                  ) : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Discount*</label>
                  <input
                    type="number"
                    name="discount"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.discount
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Product Discount"
                  />
                  {show && errorMessage.discount ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.discount}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mb-3">
                <label>Description</label>
                <div ref={refdiv}></div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Stock Quantity*</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.stockQuantity
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Product Stock Quantity"
                  />
                  {show && errorMessage.stockQuantity ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.stockQuantity}
                    </p>
                  ) : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Pic*</label>
                  <input
                    type="file"
                    name="pic"
                    multiple
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.pic
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Product Name"
                  />
                  {show && errorMessage.pic ? (
                    typeof errorMessage.pic === "string" ? (
                      <p className="text-danger text-capitalize">
                        {errorMessage.pic}
                      </p>
                    ) : (
                      errorMessage.pic.map((item, index) => (
                        <p className="text-danger text-capitalize" key={index}>
                          {item}
                        </p>
                      ))
                    )
                  ) : null}
                  {Array.isArray(data.pic) &&
                    data.pic.map(
                      (file, index) =>
                        file instanceof File && (
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            className="img-thumbnail me-2"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        )
                    )}
                </div>
              </div>

              <div className="row">
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
