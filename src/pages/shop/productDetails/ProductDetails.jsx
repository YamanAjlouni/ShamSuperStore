import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './ProductDetails.scss';

export const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('about');

    // Mock products database - in real app, this would be an API call
    const productsDatabase = {
        101: {
            id: 101,
            name: "Mechanical Gaming Keyboard RGB",
            price: 89.99,
            originalPrice: 129.99,
            images: [
                "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop"
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
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop"
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
        103: {
            id: 103,
            name: "Ergonomic Split Keyboard",
            price: 159.99,
            originalPrice: 199.99,
            images: [
                "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=600&fit=crop"
            ],
            tags: ["ergonomic", "split", "health"],
            description: "Ergonomic split design for comfortable typing during long sessions. Reduces wrist strain and improves posture.",
            inStock: false,
            rating: 4.7,
            reviews: 89,
            details: {
                about: "Revolutionary split keyboard design that promotes natural hand positioning and reduces repetitive strain injuries. Perfect for professionals who spend long hours typing.",
                shortDescription: "Ergonomic split design for comfortable typing during long sessions.",
                moreInformation: "Layout: Split QWERTY, Connection: USB-A, Key Travel: 4mm, Wrist Rest: Included, Medical Certification: Yes",
                productRating: "4.7/5 stars based on 89 reviews. Highly recommended by ergonomic specialists.",
                shippingTime: "Currently out of stock. Expected restock in 2-3 weeks.",
                inquiry: "Join our waiting list for immediate notification when back in stock.",
                otherSellers: "Limited availability from 1 other seller at higher price.",
                marketplacePolicy: "Pre-order available with full refund if not satisfied.",
                storePolicy: "Extended 45-day return policy for ergonomic products."
            }
        },
        201: {
            id: 201,
            name: "Gaming Mouse with LED",
            price: 29.99,
            originalPrice: 39.99,
            images: [
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&h=600&fit=crop"
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
        },
        203: {
            id: 203,
            name: "Ergonomic Vertical Mouse",
            price: 65.99,
            originalPrice: 85.99,
            images: [
                "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop"
            ],
            tags: ["ergonomic", "vertical", "health"],
            description: "Vertical ergonomic design reduces wrist strain and promotes natural hand positioning.",
            inStock: true,
            rating: 4.6,
            reviews: 178,
            details: {
                about: "Innovative vertical mouse design that eliminates wrist twisting and reduces the risk of repetitive strain injuries. Recommended by occupational therapists.",
                shortDescription: "Vertical ergonomic design reduces wrist strain.",
                moreInformation: "DPI: 1600, Connection: Wireless 2.4GHz, Battery: Rechargeable Li-ion, Grip: Right-handed",
                productRating: "4.6/5 stars based on 178 reviews. Life-changing for users with wrist pain.",
                shippingTime: "Ships within 1-2 business days.",
                inquiry: "Ask about our ergonomic workspace consultation service.",
                otherSellers: "Available from 2 other health-focused retailers.",
                marketplacePolicy: "30-day comfort guarantee or full refund.",
                storePolicy: "Health-focused return policy with ergonomic specialist support."
            }
        },
        301: {
            id: 301,
            name: "Latest Pro Smartphone 128GB",
            price: 899.99,
            originalPrice: 999.99,
            images: [
                "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop"
            ],
            tags: ["smartphone", "pro", "camera"],
            description: "Latest flagship smartphone with advanced camera system and premium features.",
            inStock: true,
            rating: 4.8,
            reviews: 1205,
            details: {
                about: "Flagship smartphone featuring the latest processor, professional-grade camera system, and premium build quality. Perfect for photography, gaming, and productivity.",
                shortDescription: "Latest flagship smartphone with advanced camera system.",
                moreInformation: "Display: 6.7\" OLED, Storage: 128GB, Camera: Triple 48MP, Battery: 4000mAh, 5G Ready",
                productRating: "4.8/5 stars based on 1205 reviews. Outstanding camera and performance.",
                shippingTime: "Ships within 1-2 business days with free express shipping.",
                inquiry: "Ask about trade-in programs and financing options.",
                otherSellers: "Compare prices from authorized retailers.",
                marketplacePolicy: "Full warranty coverage and certified authentic products.",
                storePolicy: "30-day return policy with full manufacturer warranty."
            }
        },
        401: {
            id: 401,
            name: "4K Gaming Monitor 27\"",
            price: 449.99,
            originalPrice: 599.99,
            images: [
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&h=600&fit=crop"
            ],
            tags: ["monitor", "4K", "gaming"],
            description: "Ultra HD 4K gaming monitor with HDR support and 144Hz refresh rate for immersive gaming experience.",
            inStock: true,
            rating: 4.8,
            reviews: 342,
            details: {
                about: "Professional 4K gaming monitor with stunning visual clarity, HDR support, and ultra-fast refresh rate. Perfect for gaming, content creation, and professional work.",
                shortDescription: "Ultra HD 4K gaming monitor with HDR support and 144Hz refresh rate.",
                moreInformation: "Resolution: 3840x2160, Refresh Rate: 144Hz, HDR: HDR10, Inputs: HDMI 2.1, DisplayPort 1.4, USB-C",
                productRating: "4.8/5 stars based on 342 reviews. Exceptional color accuracy and gaming performance.",
                shippingTime: "Free shipping within 2-3 business days.",
                inquiry: "Ask about our monitor calibration service and mounting solutions.",
                otherSellers: "Available from 3 other electronics retailers.",
                marketplacePolicy: "Pixel-perfect guarantee with easy returns.",
                storePolicy: "3-year warranty with on-site replacement service."
            }
        },
        501: {
            id: 501,
            name: "Gaming Laptop RTX 4070",
            price: 1899.99,
            originalPrice: 2199.99,
            images: [
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=600&fit=crop"
            ],
            tags: ["laptop", "gaming", "rtx"],
            description: "High-performance gaming laptop with RTX 4070 graphics, 16GB RAM, and premium cooling system.",
            inStock: true,
            rating: 4.7,
            reviews: 445,
            details: {
                about: "Ultimate gaming laptop powered by RTX 4070 graphics and latest generation processor. Features advanced cooling, high-refresh display, and premium build quality for serious gamers.",
                shortDescription: "High-performance gaming laptop with RTX 4070 graphics and 16GB RAM.",
                moreInformation: "CPU: Intel i7-13700H, GPU: RTX 4070 8GB, RAM: 16GB DDR5, Storage: 1TB NVMe SSD, Display: 15.6\" 165Hz",
                productRating: "4.7/5 stars based on 445 reviews. Exceptional gaming performance and build quality.",
                shippingTime: "Free express shipping within 1-2 business days.",
                inquiry: "Ask about our gaming setup consultation and accessories bundle.",
                otherSellers: "Compare configurations from 2 other gaming specialists.",
                marketplacePolicy: "Gaming performance guarantee with hassle-free returns.",
                storePolicy: "2-year premium warranty with gaming support hotline."
            }
        },
        601: {
            id: 601,
            name: "Pro Tablet 12.9\" 256GB",
            price: 1099.99,
            originalPrice: 1299.99,
            images: [
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=600&fit=crop"
            ],
            tags: ["tablet", "pro", "creative"],
            description: "Professional tablet with keyboard support and stylus compatibility, perfect for creative work and productivity.",
            inStock: true,
            rating: 4.8,
            reviews: 567,
            details: {
                about: "Professional-grade tablet designed for creative professionals and power users. Features stunning display, powerful processor, and full compatibility with professional creative apps.",
                shortDescription: "Professional tablet with keyboard support and Apple Pencil compatibility.",
                moreInformation: "Display: 12.9\" Liquid Retina, Storage: 256GB, CPU: M2 chip, Camera: 12MP, Compatibility: Apple Pencil, Magic Keyboard",
                productRating: "4.8/5 stars based on 567 reviews. Industry-leading performance for creative professionals.",
                shippingTime: "Ships within 1-2 business days with free premium packaging.",
                inquiry: "Ask about our creative professional bundle deals and financing options.",
                otherSellers: "Available from authorized retailers with same warranty.",
                marketplacePolicy: "Creative satisfaction guarantee - return within 30 days if not meeting creative needs.",
                storePolicy: "AppleCare+ available with comprehensive coverage and priority support."
            }
        },
        // Additional products from ProductsList that should be accessible
        102: {
            id: 102,
            name: "Wireless Compact Keyboard",
            price: 45.99,
            originalPrice: null,
            images: [
                "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop"
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
        202: {
            id: 202,
            name: "Wireless Office Mouse",
            price: 19.99,
            originalPrice: null,
            images: [
                "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop"
            ],
            tags: ["wireless", "office", "productivity"],
            description: "Comfortable wireless mouse designed for office productivity and everyday use.",
            inStock: true,
            rating: 4.1,
            reviews: 267,
            details: {
                about: "Reliable wireless office mouse with comfortable grip and precise tracking. Perfect for daily office work and general computer use.",
                shortDescription: "Comfortable wireless mouse designed for office productivity.",
                moreInformation: "DPI: 1200, Connection: 2.4GHz wireless, Battery: 2 AA batteries, Range: 10 meters",
                productRating: "4.1/5 stars based on 267 reviews. Reliable and comfortable for daily use.",
                shippingTime: "Ships within 1-2 business days.",
                inquiry: "Ask about bulk pricing for office environments.",
                otherSellers: "Available from 3 other office supply retailers.",
                marketplacePolicy: "Standard warranty and return policy.",
                storePolicy: "1-year manufacturer warranty with free replacement."
            }
        },
        302: {
            id: 302,
            name: "Budget Smartphone 64GB",
            price: 199.99,
            originalPrice: null,
            images: [
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop"
            ],
            tags: ["smartphone", "budget", "value"],
            description: "Affordable smartphone with essential features, perfect for everyday communication and basic apps.",
            inStock: true,
            rating: 4.0,
            reviews: 589,
            details: {
                about: "Budget-friendly smartphone that doesn't compromise on essential features. Great for first-time smartphone users or those looking for reliable backup device.",
                shortDescription: "Affordable smartphone with essential features.",
                moreInformation: "Display: 6.1\" LCD, Storage: 64GB, Camera: 13MP, Battery: 3000mAh, OS: Android 13",
                productRating: "4.0/5 stars based on 589 reviews. Great value for money.",
                shippingTime: "Free shipping within 2-3 business days.",
                inquiry: "Ask about our prepaid plan bundles and accessories.",
                otherSellers: "Available from 2 other mobile retailers.",
                marketplacePolicy: "30-day satisfaction guarantee with full refund.",
                storePolicy: "1-year limited warranty and customer support."
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
                        <div className="image-wrapper">
                            {hasSale && <div className="sale-badge">Sale</div>}
                            <img 
                                src={product.images[selectedImageIndex]} 
                                alt={`${product.name}`} 
                                className="main-image"
                            />
                            {product.images.length > 1 && (
                                <>
                                    <button 
                                        className="nav-btn prev-btn"
                                        onClick={() => setSelectedImageIndex(prev => 
                                            prev === 0 ? product.images.length - 1 : prev - 1
                                        )}
                                    >
                                        ❮
                                    </button>
                                    <button 
                                        className="nav-btn next-btn"
                                        onClick={() => setSelectedImageIndex(prev => 
                                            prev === product.images.length - 1 ? 0 : prev + 1
                                        )}
                                    >
                                        ❯
                                    </button>
                                </>
                            )}
                        </div>
                        
                        {/* Pagination dots */}
                        {product.images.length > 1 && (
                            <div className="pagination-dots">
                                {product.images.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`dot ${index === selectedImageIndex ? 'active' : ''}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {product.images.length > 1 && (
                        <div className="thumbnails-container">
                            <div className="thumbnails-grid">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <img src={image} alt={`${product.name} thumbnail ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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

                        <button 
                            className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`} 
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            {product.inStock ? 'Add to cart' : 'Out of Stock'}
                        </button>
                    </div>

                    {/* <button className="compare-btn" onClick={handleCompare}>
                        Compare
                    </button> */}

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