import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/home/Home'
import Shop from '../pages/shop/Shop'
import MyAccount from '../pages/myAccount/MyAccount'
import ProductDetails from '../pages/shop/productDetails/ProductDetails'
import ProductsList from '../pages/shop/productsList/ProductsList'
import SubCategories from '../pages/shop/subCategories/SubCategories'
import About from '../pages/about/About'
import ContactUs from '../pages/contactUs/ContactUs'
import InquiryForm from '../pages/shop/productDetails/inquiryForm/InquiryForm'
import Compare from '../pages/shop/productDetails/compare/Compare'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Shop Pages and Sections */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/category/:categoryId" element={<SubCategories />} />
      <Route path="/shop/category/:categoryId/subcategory/:subcategoryId" element={<ProductsList />} />
      <Route path="/shop/product/:productId" element={<ProductDetails />} />
      <Route path="/inquiry/:productId" element={<InquiryForm />} />
      <Route path="/compare" element={<Compare />} />
      {/* End of Shop Pages and Sections */}

      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  )
}