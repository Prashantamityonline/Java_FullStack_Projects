import { combineReducers } from "@reduxjs/toolkit"
import MaincategoryReducer from "./MaincategoryReducer"
import SubcategoryReducer from "./SubcategoryReducer"
import BrandReducer from "./BrandReducer"
import TestimonialReducer from "./TestimonialReducer"
import ProductReducer from "./ProductReducer"
import CartReducer from "./CartReducer"
import WishlistReducer from "./WishlistReducer"
import CheckoutReducer from "./CheckoutReducer"
import NewsletterReducer from "./NewsletterReducer"
import ContactUsReducer from "./ContactUsReducer"
import UserReducer from "./UserReducer"

export default combineReducers({
    MaincategoryStateData: MaincategoryReducer,
    SubcategoryStateData: SubcategoryReducer,
    BrandStateData: BrandReducer,
    TestimonialStateData: TestimonialReducer,
    ProductStateData: ProductReducer,
    CartStateData: CartReducer,
    WishlistStateData: WishlistReducer,
    CheckoutStateData: CheckoutReducer,
    NewsletterStateData: NewsletterReducer,
    ContactUsStateData: ContactUsReducer,
    UserStateData: UserReducer,
})