import React, { useEffect, useState } from 'react'

import HeroSection from "../Components/HeroSection"
import Testimonial from "../Components/Testimonial"
import Products from "../Components/Products"


import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
export default function ShopPage() {

    let [products, setProducts] = useState([])
    let [maincategory, setMaincategory] = useState([])
    let [subcategory, setSubcategory] = useState([])
    let [brand, setBrand] = useState([])

    let [mc, setMc] = useState("")
    let [sc, setSc] = useState("")
    let [br, setBr] = useState("")

    let [search, setSearch] = useState("")

    let [min, setMin] = useState(0)
    let [max, setMax] = useState(1000)

    let [flag, setFlag] = useState(false)

    let dispatch = useDispatch()
    let searchQuery = useLocation().search

    let ProductStateData = useSelector((state) => state.ProductStateData)
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)


    function postPriceFilter(e) {
        e.preventDefault()
        if (search === "")
            applyFilter(mc, sc, br, min, max)
        else
            postSearchPrice(min, max)
    }
    function postSearchPrice(min, max) {
        let data = ProductStateData.filter((x) => x.name?.toLocaleLowerCase().includes(search) || x.maincategory?.toLocaleLowerCase() === search || x.subcategory?.toLocaleLowerCase() === search || x.brand?.toLocaleLowerCase() === search || x.color?.toLocaleLowerCase() === search || x.description?.toLocaleLowerCase().includes(search))
        setProducts(data.filter((x) => x.finalPrice >= min && x.finalPrice <= max))
    }
    function postSearch(e) {
        e.preventDefault()
        setProducts(ProductStateData.filter((x) => x.name?.toLocaleLowerCase().includes(search) || x.maincategory?.toLocaleLowerCase() === search || x.subcategory?.toLocaleLowerCase() === search || x.brand?.toLocaleLowerCase() === search || x.color?.toLocaleLowerCase() === search || x.description?.toLocaleLowerCase().includes(search)))
    }
    function applySortFilter(option) {
        if (option === "1")
            setProducts(products.sort((x, y) => y.id.localeCompare(x.id)))
        else if (option === "2")
            setProducts(products.sort((x, y) => y.finalPrice - x.finalPrice))
        else
            setProducts(products.sort((x, y) => x.finalPrice - y.finalPrice))

        setFlag(!flag)
    }

    function applyFilter(mc, sc, br, min = -1, max = -1) {
        let data = []
        if (mc === "All" && sc === "All" && br === "All")
            data = ProductStateData.filter((x) => x.active)
        else if (mc !== "All" && sc === "All" && br === "All")
            data = ProductStateData.filter((x) => x.active && x.maincategory === mc)
        else if (mc === "All" && sc !== "All" && br === "All")
            data = ProductStateData.filter((x) => x.active && x.subcategory === sc)
        else if (mc === "All" && sc === "All" && br !== "All")
            data = ProductStateData.filter((x) => x.active && x.brand === br)
        else if (mc !== "All" && sc !== "All" && br === "All")
            data = ProductStateData.filter((x) => x.active && x.maincategory === mc && x.subcategory === sc)
        else if (mc !== "All" && sc === "All" && br !== "All")
            data = ProductStateData.filter((x) => x.active && x.maincategory === mc && x.brand === br)
        else if (mc === "All" && sc !== "All" && br !== "All")
            data = ProductStateData.filter((x) => x.active && x.brand === br && x.subcategory === sc)
        else
            data = ProductStateData.filter((x) => x.active && x.maincategory === mc && x.brand === br && x.subcategory === sc)

        if (min === -1 && max === -1)
            setProducts(data)
        else
            setProducts(data.filter((x) => x.finalPrice >= min && x.finalPrice <= max))
    }
    function setFilter(mc, sc, br) {
        setMc(mc)
        setSc(sc)
        setBr(br)
        setSearch("")
        applyFilter(mc, sc, br)
    }

    useEffect(() => {
        (() => {
            let query = new URLSearchParams(searchQuery)
            setFilter(query.get("mc") ?? "All", query.get("sc") ?? "All", query.get("br") ?? "All")
        })()
    }, [ProductStateData.length, searchQuery])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])


    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
            if (MaincategoryStateData.length)
                setMaincategory(MaincategoryStateData.filter((x) => x.active))
        })()
    }, [MaincategoryStateData.length])


    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
            if (SubcategoryStateData.length)
                setSubcategory(SubcategoryStateData.filter((x) => x.active))
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
            if (BrandStateData.length)
                setBrand(BrandStateData.filter((x) => x.active))
        })()
    }, [BrandStateData.length])
    return (
        <>
            <HeroSection title="Shop" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-2">
                        <div className="list-group mb-3">
                            <Link to={`/shop?mc=All&sc=${sc}&br=${br}`} className="list-group-item list-group-item-action active" aria-current="true">Maincategory</Link>
                            <Link to={`/shop?mc=All&sc=${sc}&br=${br}`} className="list-group-item list-group-item-action">All</Link>
                            {
                                maincategory?.map((item) => {
                                    return <Link key={item.id} to={`/shop?mc=${item.name}&sc=${sc}&br=${br}`} className="list-group-item list-group-item-action">{item.name}</Link>
                                })
                            }
                        </div>

                        <div className="list-group mb-3">
                            <Link to={`/shop?mc=${mc}&sc=All&br=${br}`} className="list-group-item list-group-item-action active" aria-current="true">Subcategory</Link>
                            <Link to={`/shop?mc=${mc}&sc=All&br=${br}`} className="list-group-item list-group-item-action">All</Link>
                            {
                                subcategory?.map((item) => {
                                    return <Link key={item.id} to={`/shop?mc=${mc}&sc=${item.name}&br=${br}`} className="list-group-item list-group-item-action">{item.name}</Link>
                                })
                            }
                        </div>

                        <div className="list-group mb-3">
                            <Link to={`/shop?mc=${mc}&sc=${sc}&br=All`} className="list-group-item list-group-item-action active" aria-current="true">Brand</Link>
                            <Link to={`/shop?mc=${mc}&sc=${sc}&br=All`} className="list-group-item list-group-item-action">All</Link>
                            {
                                brand?.map((item) => {
                                    return <Link key={item.id} to={`/shop?mc=${mc}&sc=${sc}&br=${item.name}`} className="list-group-item list-group-item-action">{item.name}</Link>
                                })
                            }
                        </div>
                        <div className="mb-3">
                            <h5 className='bg-primary text-center p-2 text-light'>Price Range</h5>
                            <form onSubmit={postPriceFilter}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>Min Amount</label>
                                        <input type="number" name="min" onChange={(e) => setMin(e.target.value)} className='form-control border-3 border-primary' value={min} placeholder='Min Amount' />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Max Amount</label>
                                        <input type="number" name="max" onChange={(e) => setMax(e.target.value)} className='form-control border-3 border-primary' value={max} placeholder='Max Amount' />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Apply Filter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-9">
                                <form onSubmit={postSearch}>
                                    <div className="btn-group w-100">
                                        <input type="search" name="search" value={search} onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())} placeholder='Search Products by Name, Maincategory, Subcategory, Brand, Color, Description...' className='form-control border-3 border-primary' />
                                        <button type="submit" className='btn btn-primary'><i className='fa fa-search'></i></button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-3">
                                <select name="sort" onChange={(e) => applySortFilter(e.target.value)} className='form-select border-3 border-primary'>
                                    <option value="1">Latest</option>
                                    <option value="2">Price : High to Low</option>
                                    <option value="3">Price : Low to High</option>
                                </select>
                            </div>
                        </div>
                        <Products data={products} title="Shop" />
                    </div>
                </div>
            </div>
            <Testimonial />
        </>
    )
}
