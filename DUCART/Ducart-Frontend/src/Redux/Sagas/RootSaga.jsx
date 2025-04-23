import { all } from "redux-saga/effects";

import maincategorySaga from "./MaincategorySagas";
import subcategorySaga from "./SubcategorySagas";
import brandSaga from "./BrandSagas";
import productSaga from "./ProductSagas";
import testimonialSaga from "./TestimonialSagas";
import cartSaga from "./CartSagas";
import wishlistSaga from "./WishlistSagas";
import checkoutSaga from "./CheckoutSagas";
import newsletterSaga from "./NewsletterSagas";
import contactUsSaga from "./ContactUsSagas";
export default function* RootSaga() {
    yield all([
        maincategorySaga(),
        subcategorySaga(),
        brandSaga(),
        productSaga(),
        testimonialSaga(),
        cartSaga(),
        wishlistSaga(),
        checkoutSaga(),
        newsletterSaga(),
        contactUsSaga()
    ])
}