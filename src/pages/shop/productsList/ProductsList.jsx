// ProductsList.jsx - Updated with unique class names to avoid conflicts
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import './ProductsList.scss';

export const ProductsList = () => {
    const { categoryId, subcategoryId } = useParams();
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('name');
    const [filterInStock, setFilterInStock] = useState(false);

    // Categories data
    const categories = {
        1: { name: "Computer" },
        2: { name: "Electronics" },
        6: { name: "Clothes" }
    };

    // Subcategories data
    const subcategories = {
        11: { name: "Keyboards", categoryId: 1, description: "Mechanical and membrane keyboards" },
        12: { name: "Mice", categoryId: 1, description: "Gaming and office mice" },
        13: { name: "Monitors", categoryId: 1, description: "LCD, LED, and OLED monitors" },
        14: { name: "Laptops", categoryId: 1, description: "Gaming and business laptops" },
        21: { name: "Smartphones", categoryId: 2, description: "Latest smartphones and accessories" },
        22: { name: "Tablets", categoryId: 2, description: "Tablets for work and entertainment" },
        61: { name: "Men's Clothing", categoryId: 6, description: "Shirts, pants, suits and more" }
    };

    const productsData = {
        11: [
            {
                id: 101,
                name: "Mechanical Gaming Keyboard RGB",
                price: 89.99,
                originalPrice: 129.99,
                image: "/api/placeholder/300/300",
                description: "High-quality mechanical keyboard with RGB lighting and Cherry MX switches",
                inStock: true,
                rating: 4.5,
                reviews: 234
            },
            {
                id: 102,
                name: "Wireless Compact Keyboard",
                price: 45.99,
                originalPrice: null,
                image: "/api/placeholder/300/300",
                description: "Compact wireless keyboard perfect for productivity and travel",
                inStock: true,
                rating: 4.2,
                reviews: 156
            },
            {
                id: 103,
                name: "Ergonomic Split Keyboard",
                price: 159.99,
                originalPrice: 199.99,
                image: "/api/placeholder/300/300",
                description: "Ergonomic split design for comfortable typing during long sessions",
                inStock: false,
                rating: 4.7,
                reviews: 89
            },
            {
                id: 104,
                name: "Membrane Office Keyboard",
                price: 24.99,
                originalPrice: null,
                image: "/api/placeholder/300/300",
                description: "Quiet membrane keyboard ideal for office environments",
                inStock: true,
                rating: 4.0,
                reviews: 312
            }
        ],
        12: [ // Mice products
            {
                id: 201,
                name: "Gaming Mouse with LED",
                price: 29.99,
                originalPrice: 39.99,
                image: "/api/placeholder/300/300",
                description: "High-DPI gaming mouse with customizable LED lighting",
                inStock: true,
                rating: 4.3,
                reviews: 445
            },
            {
                id: 202,
                name: "Wireless Office Mouse",
                price: 19.99,
                originalPrice: null,
                image: "/api/placeholder/300/300",
                description: "Comfortable wireless mouse designed for office productivity",
                inStock: true,
                rating: 4.1,
                reviews: 267
            },
            {
                id: 203,
                name: "Ergonomic Vertical Mouse",
                price: 65.99,
                originalPrice: 85.99,
                image: "/api/placeholder/300/300",
                description: "Vertical ergonomic design reduces wrist strain",
                inStock: true,
                rating: 4.6,
                reviews: 178
            }
        ],
        21: [ // Smartphones products
            {
                id: 301,
                name: "Latest Pro Smartphone 128GB",
                price: 899.99,
                originalPrice: 999.99,
                image: "/api/placeholder/300/300",
                description: "Latest flagship smartphone with advanced camera system",
                inStock: true,
                rating: 4.8,
                reviews: 1205
            },
            {
                id: 302,
                name: "Budget Smartphone 64GB",
                price: 199.99,
                originalPrice: null,
                image: "/api/placeholder/300/300",
                description: "Affordable smartphone with essential features",
                inStock: true,
                rating: 4.0,
                reviews: 589
            }
        ]
    };

    const category = categories[categoryId];
    const subcategory = subcategories[subcategoryId];
    const products = productsData[subcategoryId] || [];

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products];

        // Filter by stock
        if (filterInStock) {
            filtered = filtered.filter(product => product.inStock);
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return filtered;
    }, [products, sortBy, filterInStock]);

    const handleBackToSubcategories = () => {
        navigate(`/shop/category/${categoryId}`);
    };

    const handleBackToCategories = () => {
        navigate('/shop');
    };

    const handleProductClick = (productId) => {
        navigate(`/shop/product/${productId}`);
        // Navigate to product detail page if implemented
    };

    const handleAddToCart = (productId, e) => {
        e.stopPropagation();
        console.log('Add to cart:', productId);
        // Add your cart logic here
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star filled">★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
        }

        return stars;
    };

    if (!subcategory) {
        return (
            <div className="products-page">
                <div className="error-message">
                    <h2>Subcategory not found</h2>
                    <button onClick={handleBackToCategories}>Back to Shop</button>
                </div>
            </div>
        );
    }

    return (
        <div className="products-page">
            {/* Breadcrumb Navigation */}
            <div className="breadcrumb-nav">
                <button onClick={handleBackToCategories} className="breadcrumb-link">
                    All Categories
                </button>
                <span className="breadcrumb-separator">›</span>
                <button onClick={handleBackToSubcategories} className="breadcrumb-link">
                    {category?.name}
                </button>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-current">{subcategory.name}</span>
            </div>

            {/* Page Header */}
            <div className="page-header">
                <div className="subcategory-info">
                    <div className="subcategory-text">
                        <h1 className="page-title">{subcategory.name}</h1>
                        <p className="subcategory-description">{subcategory.description}</p>
                        <p className="products-count">
                            {filteredAndSortedProducts.length} products found
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters and Sorting */}
            {products.length > 0 && (
                <div className="filters-bar">
                    <div className="filter-group">
                        {/* <label className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={filterInStock}
                                onChange={(e) => setFilterInStock(e.target.checked)}
                            />
                            In Stock Only
                        </label> */}
                    </div>

                    <div className="sort-group">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select
                            id="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="name">Name (A-Z)</option>
                            <option value="price-low">Price (Low to High)</option>
                            <option value="price-high">Price (High to Low)</option>
                            <option value="rating">Customer Rating</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            <div className="products-section">
                {products.length === 0 ? (
                    <div className="no-products">
                        <h3>No products available</h3>
                        <p>This subcategory doesn't have any products yet. Please check back later.</p>
                    </div>
                ) : filteredAndSortedProducts.length === 0 ? (
                    <div className="no-products">
                        <h3>No products found</h3>
                        <p>Try adjusting your filters to see more products.</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {filteredAndSortedProducts.map(product => (
                            <div
                                key={product.id}
                                className="product-card"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div className="product-card-image">
                                    <img src={product.image} alt={product.name} />
                                    {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
                                    {product.originalPrice && (
                                        <div className="sale-badge">Sale</div>
                                    )}
                                </div>

                                <div className="product-card-info">
                                    <h3 className="product-card-name">{product.name}</h3>
                                    <p className="product-card-description">{product.description}</p>

                                    <div className="product-rating">
                                        <div className="stars">
                                            {renderStars(product.rating)}
                                        </div>
                                        <span className="reviews-count">({product.reviews} reviews)</span>
                                    </div>

                                    <div className="product-card-pricing">
                                        <div className="price-container">
                                            <span className="current-price">${product.price}</span>
                                            {product.originalPrice && (
                                                <span className="original-price">${product.originalPrice}</span>
                                            )}
                                        </div>
                                        {product.originalPrice && (
                                            <div className="savings">
                                                Save ${(product.originalPrice - product.price).toFixed(2)}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                                        onClick={(e) => handleAddToCart(product.id, e)}
                                        disabled={!product.inStock}
                                    >
                                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsList;