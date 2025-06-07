// Updated AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/home/Home'
import Shop from '../pages/shop/Shop'
import CategoryDetail from '../pages/shop/categoryDetail/CategoryDetail'
import ProductsList from '../pages/shop/productsList/ProductsList'
import MyAccount from '../pages/myAccount/MyAccount'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/category/:categoryId" element={<CategoryDetail />} />
      <Route path="/shop/category/:categoryId/subcategory/:subcategoryId" element={<ProductsList />} />
      <Route path="/my-account" element={<MyAccount />} />
    </Routes>
  )
}