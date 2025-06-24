import './Footer.scss';
import logo from '../../assets/images/shamSuperStoreLogo.jpg';
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiShoppingBag } from 'react-icons/hi2';
import { useLocation, Link } from 'react-router-dom';

const Footer = ({ toggleCartSidebar }) => {
    const location = useLocation();

    const handleCartClick = () => {
        if (toggleCartSidebar) {
            toggleCartSidebar();
        }
    };

    const isActiveLink = (path, contains = false) => {
        if (contains) {
            return location.pathname.includes(path);
        }
        return location.pathname === path;
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section logo-section">
                    <Link to="/" className="logo">
                        <img src={logo} alt="ShamSuperStore Logo" />
                    </Link>

                    <div className="contact-info">
                        <Link to="/contact" className="email">support@shamsuperstore.com</Link>
                        <Link to="/contact" className="phone">Phone: (000) 000-0000</Link>
                    </div>

                    <div className="social-icons">
                        <a href="#" className="social-icon whatsapp">
                            <FaWhatsapp size={20} />
                        </a>
                        <a href="#" className="social-icon facebook">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="#" className="social-icon instagram">
                            <FaInstagram size={20} />
                        </a>
                        <a href="#" className="social-icon twitter">
                            <FaXTwitter size={20} />
                        </a>
                    </div>

                    <div className="shopping-bag" onClick={handleCartClick}>
                        <Link to='/cart'>
                            <HiShoppingBag size={40} />
                        </Link>
                    </div>
                </div>

                <div className="footer-section links-section">
                    <ul>
                        <li><Link to="/my-account" className={isActiveLink('/my-account') ? 'highlighted' : ''}>Account details</Link></li>
                        <li><Link to="/cart" className={isActiveLink('/cart') ? 'highlighted' : ''}>Shopping Cart</Link></li>
                        <li><Link to="/checkout">Checkout</Link></li>
                        <li><Link to="/orders">Orders</Link></li>
                        <li><Link to="/order-tracking">Order tracking</Link></li>
                        <li><Link to="/save-for-later">Save for later</Link></li>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                        <li><Link to="/downloads">Downloads</Link></li>
                        <li><Link to="/my-account">Addresses</Link></li>
                        <li><Link to="/my-account">Lost password</Link></li>
                    </ul>
                </div>

                <div className="footer-section links-section">
                    <ul>
                        <li><Link to="/store-manager" className={isActiveLink('/store-manager') ? 'highlighted' : ''}>Store Manager</Link></li>
                        <li><Link to="/stores-list" className={isActiveLink('/stores-list') ? 'highlighted' : ''}>Stores List</Link></li>
                        <li><Link to="/vendor-membership" className={isActiveLink('/vendor-membership') ? 'highlighted' : ''}>Vendor Membership</Link></li>
                        <li><Link to="/contact">Inquiries</Link></li>
                        <li><Link to="/vendor-registration" className={isActiveLink('/vendor-registration') ? 'highlighted' : ''}>Vendor Registration</Link></li>
                    </ul>
                    <div className="quick-links">
                        <ul>
                            <li><Link to="/" className={isActiveLink('/') ? 'highlighted' : ''}>Home</Link></li>
                            <li><Link to="/shop" className={isActiveLink('/shop', true) ? 'highlighted' : ''}>Shop</Link></li>
                            <li><Link to="/contact" className={isActiveLink('/contact') ? 'highlighted' : ''}>Contact Us</Link></li>
                            <li><Link to="/contact">Inquiries</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-section newsletter-section">
                    <div className="newsletter">
                        <h4>Newsletter signup</h4>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Enter your email..." />
                            <button type="submit">Sign up</button>
                        </div>
                        <p className="newsletter-text">Get promotions, special offers and discounts</p>
                    </div>

                    <div className="search-section">
                        <h4>Search</h4>
                        <div className="search-form">
                            <input type="text" placeholder="Search..." />
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>© {currentYear} Shamsuperstore. All Rights Reserved</p>
                    <div className="footer-bottom-links">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-conditions">Terms & conditions</Link>
                        <Link to="/return-refunds">Return & Refunds</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;