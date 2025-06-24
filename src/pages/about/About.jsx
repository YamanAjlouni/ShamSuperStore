import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Store, Users, Truck } from 'lucide-react';
import './About.scss';
import logo from '../../assets/images/shamSuperStoreLogo.jpg'
import woman from '../../assets/images/about/woman.png'
import payment from '../../assets/images/about/payment.png'

const About = () => {
    const navigate = useNavigate();

    const handleShopClick = () => {
        navigate('/shop');
    };

    const handleBecomeSellerClick = () => {
        navigate('/sellers');
    };

    const handleContactClick = () => {
        navigate('/contact');
    };

    const handleJoinDeliveryClick = () => {
        navigate('/delivery-drivers');
    };

    return (
        <div className="about-page">
            <div className="about-container">
                {/* Four Cards Section */}
                <div className="about-section">
                    <div className="about-cards-grid">
                        {/* For Shoppers Card */}
                        <div className="card-wrapper">
                            <h2 className="external-card-title">For Shoppers</h2>
                            <div className="about-card">
                                <div className="card-icon">
                                    <ShoppingCart size={48} />
                                </div>
                                <h3 className="card-subtitle">Discover More, Shop Smarter</h3>
                                <p className="card-description">
                                    Welcome to your new favorite marketplace—where quality, variety, and trust come
                                    together. We connect you with unique products from independent sellers worldwide,
                                    all in one easy-to-use platform. Whether you're looking for something everyday or
                                    extraordinary, you'll find it here—secure, seamless, and always satisfying.
                                </p>
                                <div>
                                    <button className="card-button" onClick={handleShopClick}>
                                        Shop
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* For Sellers Card */}
                        <div className="card-wrapper">
                            <h2 className="external-card-title">For Sellers</h2>
                            <div className="about-card">
                                <div className="card-icon">
                                    <Store size={48} />
                                </div>
                                <h3 className="card-subtitle">Grow Your Brand, Reach More Customers</h3>
                                <p className="card-description">
                                    Join a marketplace built for growth. Our multivendor platform empowers you to
                                    showcase your products to a diverse, engaged audience—with powerful tools to
                                    manage your store, marketing, and orders. From solo entrepreneurs to expanding
                                    brands, we're here to help you thrive and scale with confidence.
                                </p>
                                <div>
                                    <button className="card-button" onClick={handleBecomeSellerClick} >
                                        Become a Seller
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* The People Behind the Platform Card */}
                        <div className="card-wrapper">
                            <h2 className="external-card-title">The People Behind the Platform</h2>
                            <div className="about-card">
                                <div className="card-icon">
                                    <Users size={48} />
                                </div>
                                <h3 className="card-subtitle">Our Team</h3>
                                <p className="card-description">
                                    At the heart of everything we do is a team committed to excellence. From responsive
                                    support to consistent service quality, we work behind the scenes to ensure both
                                    vendors and shoppers have the best possible experience. Our approach is built on
                                    transparency, care, and a deep respect for every interaction. You can count on us to
                                    be professional, helpful, and always focused on getting it right.
                                </p>
                                <div>
                                    <button className="card-button" onClick={handleContactClick} >
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Team Card */}
                        <div className="card-wrapper">
                            <h2 className="external-card-title">Delivery Team</h2>
                            <div className="about-card">
                                <div className="card-icon">
                                    <Truck size={48} />
                                </div>
                                <h3 className="card-subtitle">Driven by Reliability, Powered by People</h3>
                                <p className="card-description">
                                    Our delivery network plays a vital role in connecting sellers and shoppers every day.
                                    Behind every successful order is a team of dependable, hardworking individuals who
                                    ensure packages arrive safely and on time. Whether on the road or coordinating
                                    behind the scenes, our drivers and logistics staff are committed to professionalism,
                                    efficiency, and service that reflects our promise to customers and vendors alike.
                                </p>
                                <div>
                                    <button className="card-button" onClick={handleJoinDeliveryClick} >
                                        Join our delivery team
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Section - Illustration and Service Info */}
                <div className="service-section">
                    <div className="service-content">
                        <div className="service-illustration">
                            <img src={woman} alt="Woman Image" />
                        </div>
                        <div className="service-info">
                            <div className="brand-logo">
                                <img src={logo} alt="Logo" />
                            </div>
                            <h2 className="service-title">Excellent Service by Dedicated team</h2>
                            <p className="service-description">
                                Our team is always available to help you with any concern, if any questions,
                                please don't hesitate to contact us
                            </p>
                            <div className="payment-methods">
                                <img src={payment} alt="Payment Methods" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;