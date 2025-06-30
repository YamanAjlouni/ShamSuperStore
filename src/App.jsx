import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import SidebarCart from './components/sidebarCart/SidebarCart'
import FloatingCart from './components/floatingCart/FloatingCart'
import { AppRoutes } from './routes/AppRoutes'
import { CartProvider } from './context/CartReducer'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="navbar-positioned">
          <Navbar />
        </div>
        <AppRoutes />
        <div className="footer-positioned">
          <Footer />
        </div>
        <SidebarCart />
        <FloatingCart />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App