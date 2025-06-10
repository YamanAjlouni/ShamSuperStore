// ProductsList.jsx - Updated with Unsplash images
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
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop&crop=center",
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
                image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center",
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
                image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop&crop=center",
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
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center",
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
                image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&crop=center",
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
                image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400&h=400&fit=crop&crop=center",
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
                image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop&crop=center",
                description: "Vertical ergonomic design reduces wrist strain",
                inStock: true,
                rating: 4.6,
                reviews: 178
            }
        ],
        13: [ // Monitors products
            {
                id: 401,
                name: "4K Gaming Monitor 27\"",
                price: 449.99,
                originalPrice: 599.99,
                image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop&crop=center",
                description: "Ultra HD 4K gaming monitor with HDR support and 144Hz refresh rate",
                inStock: true,
                rating: 4.8,
                reviews: 342
            },
            {
                id: 402,
                name: "Ultrawide Curved Monitor 34\"",
                price: 699.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
                description: "Immersive ultrawide curved display for productivity and gaming",
                inStock: true,
                rating: 4.6,
                reviews: 189
            },
            {
                id: 403,
                name: "Portable Monitor 15.6\"",
                price: 199.99,
                originalPrice: 249.99,
                image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&h=400&fit=crop&crop=center",
                description: "Lightweight portable monitor perfect for remote work and travel",
                inStock: false,
                rating: 4.4,
                reviews: 156
            }
        ],
        14: [ // Laptops products
            {
                id: 501,
                name: "Gaming Laptop RTX 4070",
                price: 1899.99,
                originalPrice: 2199.99,
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center",
                description: "High-performance gaming laptop with RTX 4070 graphics and 16GB RAM",
                inStock: true,
                rating: 4.7,
                reviews: 445
            },
            {
                id: 502,
                name: "Business Ultrabook 14\"",
                price: 1299.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
                description: "Lightweight business laptop with long battery life and premium build",
                inStock: true,
                rating: 4.5,
                reviews: 267
            },
            {
                id: 503,
                name: "Budget Student Laptop",
                price: 549.99,
                originalPrice: 699.99,
                image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=400&fit=crop&crop=center",
                description: "Affordable laptop perfect for students and everyday computing tasks",
                inStock: true,
                rating: 4.2,
                reviews: 523
            }
        ],
        21: [ // Smartphones products
            {
                id: 301,
                name: "Latest Pro Smartphone 128GB",
                price: 899.99,
                originalPrice: 999.99,
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
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
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop&crop=center",
                description: "Affordable smartphone with essential features",
                inStock: true,
                rating: 4.0,
                reviews: 589
            },
            {
                id: 303,
                name: "Flagship Android Phone 256GB",
                price: 799.99,
                originalPrice: 899.99,
                image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
                description: "Premium Android smartphone with triple camera system and 5G",
                inStock: true,
                rating: 4.6,
                reviews: 834
            }
        ],
        22: [ // Tablets products
            {
                id: 601,
                name: "Pro Tablet 12.9\" 256GB",
                price: 1099.99,
                originalPrice: 1299.99,
                image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center",
                description: "Professional tablet with keyboard support and Apple Pencil compatibility",
                inStock: true,
                rating: 4.8,
                reviews: 567
            },
            {
                id: 602,
                name: "Android Tablet 10\" 128GB",
                price: 299.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop&crop=center",
                description: "Versatile Android tablet perfect for entertainment and productivity",
                inStock: true,
                rating: 4.3,
                reviews: 324
            },
            {
                id: 603,
                name: "Budget Tablet 8\" 64GB",
                price: 149.99,
                originalPrice: 199.99,
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop&crop=center",
                description: "Compact and affordable tablet for reading and light tasks",
                inStock: false,
                rating: 4.1,
                reviews: 189
            }
        ],
        61: [ // Men's Clothing products
            {
                id: 701,
                name: "Premium Cotton Dress Shirt",
                price: 89.99,
                originalPrice: 129.99,
                image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&crop=center",
                description: "High-quality cotton dress shirt perfect for business and formal occasions",
                inStock: true,
                rating: 4.5,
                reviews: 234
            },
            {
                id: 702,
                name: "Casual Denim Jeans",
                price: 69.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center",
                description: "Comfortable and stylish denim jeans for everyday wear",
                inStock: true,
                rating: 4.3,
                reviews: 445
            },
            {
                id: 703,
                name: "Wool Blend Suit Jacket",
                price: 299.99,
                originalPrice: 399.99,
                image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop&crop=center",
                description: "Elegant wool blend suit jacket for professional and formal events",
                inStock: true,
                rating: 4.7,
                reviews: 156
            },
            {
                id: 704,
                name: "Casual Polo Shirt",
                price: 39.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&crop=center",
                description: "Classic polo shirt perfect for casual and smart-casual occasions",
                inStock: true,
                rating: 4.2,
                reviews: 378
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