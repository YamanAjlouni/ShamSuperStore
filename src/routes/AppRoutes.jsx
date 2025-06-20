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

// Sellers Section Pages
import Sellers from '../pages/sellers/Sellers'
import VendorRegistration from '../pages/sellers/vendorRegistration/VendorRegistration'
import VendorMembership from '../pages/sellers/vendorMembership/VendorMembership'
import StoreManager from '../pages/sellers/storeManager/StoreManager'
import VendorsDriversManager from '../pages/sellers/vendorsDriversManager/VendorsDriversManager'
import StoresList from '../pages/sellers/storesList/StoresList'

// Delivery Drivers Section Pages
import DeliveryDrivers from '../pages/deliveryDrivers/DeliveryDrivers'
import DeliveryDriversManager from '../pages/deliveryDrivers/deliveryDriversManager/DeliveryDriversManager'
import VendorsDriversManagers from '../pages/deliveryDrivers/vendorsDriversManagers/VendorsDriversManagers'
import DeliveryTracking from '../pages/deliveryDrivers/deliveryTracking/DeliveryTracking'
import DeliveryDriversApp from '../pages/deliveryDrivers/deliveryDriversApp/DeliveryDriversApp'

// Placeholder Cart component (will be replaced with actual design later)
const Cart = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Shopping Cart Page</h1>
      <p>Cart page content will be implemented based on your design requirements.</p>
    </div>
  );
};

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

      {/* Cart Page */}
      <Route path="/cart" element={<Cart />} />

      {/* Sellers Section Pages */}
      <Route path="/sellers" element={<Sellers />} />
      <Route path="/vendor-registration" element={<VendorRegistration />} />
      <Route path="/vendor-membership" element={<VendorMembership />} />
      <Route path="/store-manager" element={<StoreManager />} />
      <Route path="/vendors-drivers-manager" element={<VendorsDriversManager />} />
      <Route path="/stores-list" element={<StoresList />} />
      {/* End of Sellers Section Pages */}

      {/* Delivery Drivers Section Pages */}
      <Route path="/delivery-drivers" element={<DeliveryDrivers />} />
      <Route path="/delivery-drivers-manager" element={<DeliveryDriversManager />} />
      <Route path="/vendors-drivers-managers" element={<VendorsDriversManagers />} />
      <Route path="/delivery-tracking" element={<DeliveryTracking />} />
      <Route path="/delivery-drivers-app" element={<DeliveryDriversApp />} />
      {/* End of Delivery Drivers Section Pages */}

      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  )
}