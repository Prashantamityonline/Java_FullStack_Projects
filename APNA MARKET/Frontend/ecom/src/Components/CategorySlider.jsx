import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function CategorySlider({ title }) {
  let [data, setData] = useState([])

  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)
  let dispatch = useDispatch()

  let [showPerPage, setShowPerPage] = useState(title === "Brand" ? 6 : 3)

  let options = {
    slidesPerView: showPerPage,
    spaceBetween: 50,
    freeMode: true,
    loop: true,
    pagination: {
      clickable: true,
    },
    modules: [FreeMode, Pagination],
    className: "mySwiper"
  }

  function handelWindoResize() {
    if (window.innerWidth < 576)
      setShowPerPage(1)
    else if (window.innerWidth < 768)
      setShowPerPage(2)
    else
      setShowPerPage("Brand" ? 6 : 3)
  }
  window.addEventListener("resize", handelWindoResize);

  useEffect(() => {
    dispatch(getMaincategory())
  }, [MaincategoryStateData.length])

  useEffect(() => {
    dispatch(getSubcategory())
  }, [SubcategoryStateData.length])

  useEffect(() => {
    dispatch(getBrand())
  }, [BrandStateData.length])

  useEffect(() => {
    if (title === "Maincategory" && MaincategoryStateData.length !== 0)
      setData(MaincategoryStateData.filter(x => x.active))


    if (title === "Subcategory" && SubcategoryStateData.length !== 0)
      setData(SubcategoryStateData.filter(x => x.active))

    if (title === "Brand" && BrandStateData.length !== 0)
      setData(BrandStateData.filter(x => x.active))

  }, [title, MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length])
  return (
    <section id="clients" className="clients section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{title}</h2>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <Swiper {...options}>
          {
            data.map((item) => {
              return <SwiperSlide key={item.id}>
                <Link to={`/shop?${title === "Maincategory" ? "mc" : (title === "Subcategory" ? "sc" : "br")}=${item.name}`}>
                  <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} style={{ height: title === "Brand" ? 100 : 300 }} className="w-100" alt="" />
                </Link>
              </SwiperSlide>
            })
          }
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>

    </section >
  )
}
