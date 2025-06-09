import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import './ProductDetails.scss';

export const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeTab, setActiveTab] = useState('about');

    // Mock products database - in real app, this would be an API call
    const productsDatabase = {
        101: {
            id: 101,
            name: "Mechanical Gaming Keyboard RGB",
            price: 89.99,
            originalPrice: 129.99,
            images: [
                "/api/placeholder/600/600",
                "/api/placeholder/600/600",
                "/api/placeholder/600/600",
                "/api/placeholder/600/600"
            ],
            tags: ["gaming", "keyboard", "rgb"],
            description: "High-quality mechanical keyboard with RGB lighting and Cherry MX switches. Perfect for gaming and productivity.",
            inStock: true,
            rating: 4.5,
            reviews: 234,
            details: {
                about: "This mechanical gaming keyboard features premium Cherry MX switches, customizable RGB lighting, and durable construction. Designed for both gaming enthusiasts and professionals who demand precision and reliability.",
                shortDescription: "High-quality mechanical keyboard with RGB lighting and Cherry MX switches.",
                moreInformation: "Switch Type: Cherry MX Blue, Backlight: RGB, Connection: USB-C, Compatibility: Windows/Mac/Linux, Warranty: 2 years",
                productRating: "4.5/5 stars based on 234 customer reviews. Customers love the build quality and responsiveness.",
                shippingTime: "Standard shipping takes 3-5 business days. Express shipping available.",
                inquiry: "Contact our support team for any questions about this product or technical specifications.",
                otherSellers: "This product is also available from 3 other verified sellers with competitive pricing.",
                marketplacePolicy: "30-day return policy, buyer protection, and secure payment processing.",
                storePolicy: "Free returns within 30 days, 2-year manufacturer warranty, and lifetime customer support."
            }
        },
        102: {
            id: 102,
            name: "Wireless Compact Keyboard",
            price: 45.99,
            originalPrice: null,
            images: [
                "/api/placeholder/600/600",
                "/api/placeholder/600/600",
                "/api/placeholder/600/600"
            ],
            tags: ["wireless", "compact", "productivity"],
            description: "Compact wireless keyboard perfect for productivity and travel. Ultra-slim design with long battery life.",
            inStock: true,
            rating: 4.2,
            reviews: 156,
            details: {
                about: "Ultra-portable wireless keyboard designed for modern professionals. Features low-profile keys, excellent battery life, and seamless connectivity across multiple devices.",
                shortDescription: "Compact wireless keyboard perfect for productivity and travel.",
                moreInformation: "Connection: Bluetooth 5.0, Battery Life: 6 months, Weight: 300g, Dimensions: 28x12x1.5cm",
                productRating: "4.2/5 stars based on 156 customer reviews. Great for travel and office use.",
                shippingTime: "Standard shipping takes 2-4 business days.",
                inquiry: "Contact us for bulk orders or enterprise pricing.",
                otherSellers: "Available from 2 other sellers.",
                marketplacePolicy: "Standard return and refund policies apply.",
                storePolicy: "1-year warranty and free technical support."
            }
        },
        201: {
            id: 201,
            name: "Gaming Mouse with LED",
            price: 29.99,
            originalPrice: 39.99,
            images: [
                "/api/placeholder/600/600",
                "/api/placeholder/600/600",
                "/api/placeholder/600/600"
            ],
            tags: ["gaming", "mouse", "led"],
            description: "High-DPI gaming mouse with customizable LED lighting and ergonomic design.",
            inStock: true,
            rating: 4.3,
            reviews: 445,
            details: {
                about: "Professional gaming mouse with high-precision sensor, customizable LED lighting, and ergonomic design for extended gaming sessions.",
                shortDescription: "High-DPI gaming mouse with customizable LED lighting.",
                moreInformation: "DPI: 12000, Buttons: 6 programmable, Sensor: Optical, Cable: Braided USB",
                productRating: "4.3/5 stars based on 445 reviews. Excellent for competitive gaming.",
                shippingTime: "Ships within 1-2 business days.",
                inquiry: "Ask about our gaming accessories bundle deals.",
                otherSellers: "Compare prices from 4 other verified sellers.",
                marketplacePolicy: "Protected purchase with money-back guarantee.",
                storePolicy: "2-year warranty and gaming gear specialist support."
            }
        }
    };

    // Get product by ID from URL params
    const product = productsDatabase[productId];

    // Handle product not found
    if (!product) {
        return (
            <div className="product-details">
                <div className="error-message">
                    <h2>Product not found</h2>
                    <p>The product you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => navigate('/shop')}>Back to Shop</button>
                </div>
            </div>
        );
    }

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} items to cart`);
        // Add your cart logic here
    };

    const handleCompare = () => {
        console.log('Added to compare');
        // Add your compare logic here
    };

    const tabs = [
        { id: 'about', label: 'About this item' },
        { id: 'shortDescription', label: 'Short Description' },
        { id: 'moreInformation', label: 'More information' },
        { id: 'productRating', label: 'Product Rating' },
        { id: 'shippingTime', label: 'Shipping time' },
        { id: 'inquiry', label: 'Inquiry' },
        { id: 'otherSellers', label: 'Offers from other sellers' },
        { id: 'marketplacePolicy', label: 'Marketplace Policy' },
        { id: 'storePolicy', label: 'Store Policy' }
    ];

    const hasSale = product.originalPrice && product.originalPrice > product.price;

    return (
        <div className="product-details">
            <div className="product-container">
                {/* Product Images Section */}
                <div className="product-images">
                    <div className="main-image-container">
                        <Swiper
                            modules={[Navigation, Pagination, Thumbs]}
                            thumbs={{ swiper: thumbsSwiper }}
                            navigation
                            pagination={{ clickable: true }}
                            className="main-swiper"
                        >
                            {product.images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="image-wrapper">
                                        {hasSale && <div className="sale-badge">Sale</div>}
                                        <img src={image} alt={`${product.name} ${index + 1}`} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="thumbnails-container">
                        <Swiper
                            modules={[Thumbs]}
                            onSwiper={setThumbsSwiper}
                            slidesPerView={4}
                            spaceBetween={10}
                            className="thumbs-swiper"
                        >
                            {product.images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image} alt={`${product.name} thumbnail ${index + 1}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="product-info">
                    <h1 className="product-name">{product.name}</h1>
                    
                    <div className="price-container">
                        <span className="current-price">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>

                    <div className="tags-section">
                        <span className="tags-label">Tags:</span>
                        {product.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>

                    <div className="description">
                        <p>{product.description}</p>
                    </div>

                    <div className="purchase-section">
                        <div className="quantity-selector">
                            <button 
                                className="quantity-btn"
                                onClick={() => handleQuantityChange('decrement')}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="quantity-display">{quantity}</span>
                            <button 
                                className="quantity-btn"
                                onClick={() => handleQuantityChange('increment')}
                            >
                                +
                            </button>
                        </div>

                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    </div>

                    <button className="compare-btn" onClick={handleCompare}>
                        Compare
                    </button>

                    <div className="sold-by">
                        <span>Sold By:</span>
                        <div className="social-links">
                            <a href="#" className="social-link facebook">f</a>
                            <a href="#" className="social-link twitter">t</a>
                            <a href="#" className="social-link whatsapp">w</a>
                            <a href="#" className="social-link telegram">T</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="product-tabs">
                <div className="tabs-navigation">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="tab-content">
                    <div className="tab-panel">
                        <p>{product.details[activeTab]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;