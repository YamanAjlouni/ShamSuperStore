import './Footer.scss';
import logo from '../../assets/images/shamSuperStoreLogo.jpg';
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiShoppingBag } from 'react-icons/hi2';

const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section logo-section">
                    <div className="logo">
                        <img src={logo} alt="ShamSuperStore Logo" />
                    </div>

                    <div className="contact-info">
                        <p className="email">support@shamsuperstore.com</p>
                        <p className="phone">Phone: (000) 000-0000</p>
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

                    <div className="shopping-bag">
                        <HiShoppingBag size={40} />
                    </div>
                </div>

                <div className="footer-section links-section">
                    <ul>
                        <li><a href="#">Account details</a></li>
                        <li><a href="#">Shopping Cart</a></li>
                        <li><a href="#">Checkout</a></li>
                        <li><a href="#">Orders</a></li>
                        <li><a href="#">Order tracking</a></li>
                        <li><a href="#">Save for later</a></li>
                        <li><a href="#">Wishlist</a></li>
                        <li><a href="#">Downloads</a></li>
                        <li><a href="#">Addresses</a></li>
                        <li><a href="#">Lost password</a></li>
                    </ul>
                </div>

                <div className="footer-section links-section">
                    <ul>
                        <li><a href="#">Store Manager</a></li>
                        <li><a href="#">Stores List</a></li>
                        <li><a href="#">Vendor Membership</a></li>
                        <li><a href="#">Inquiries</a></li>
                        <li><a href="#">Vendor Registration</a></li>
                    </ul>
                    <div className="quick-links">
                        <ul>
                            <li><a href="#" className="highlighted">Home</a></li>
                            <li><a href="#">Shop</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Inquiries</a></li>
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
                    <p>© 2025 Shamsuperstore. All Rights Reserved</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms & conditions</a>
                        <a href="#">Return & Refunds</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;