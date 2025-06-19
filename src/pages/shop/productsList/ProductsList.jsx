// ProductsList.jsx - Clean version without extra buttons
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Search, Filter, ChevronLeft } from 'lucide-react';
import ProductsOnSale from '../productsOnSale/ProductsOnSale';
import FeaturedProducts from '../featuredProducts/FeaturedProducts';
import './ProductsList.scss';

export const ProductsList = () => {
    const { categoryId, subcategoryId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState('name');
    const [filterInStock, setFilterInStock] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    // Get comparison state from URL
    const compareProducts = searchParams.get('compare');

    // Categories data
    const categories = {
        1: { name: "Computer" },
        2: { name: "Electronics" },
        6: { name: "Clothes" }
    };

    // Subcategories data
    const subcategories = {
        11: { name: "Keyboards", categoryId: 1 },
        12: { name: "Mice", categoryId: 1 },
        13: { name: "Monitors", categoryId: 1 },
        14: { name: "Laptops", categoryId: 1 },
        15: { name: "Desktops", categoryId: 1 },
        21: { name: "Smartphones", categoryId: 2 },
        22: { name: "Tablets", categoryId: 2 },
        61: { name: "Men's Clothing", categoryId: 6 }
    };

    const productsData = {
        11: [
            {
                id: 101,
                name: "Mechanical Gaming Keyboard RGB",
                price: 89.99,
                originalPrice: 129.99,
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 102,
                name: "Wireless Compact Keyboard",
                price: 45.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 103,
                name: "Ergonomic Split Keyboard",
                price: 159.99,
                originalPrice: 199.99,
                image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop&crop=center",
                inStock: false
            },
            {
                id: 104,
                name: "Membrane Office Keyboard",
                price: 24.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center",
                inStock: true
            }
        ],
        12: [
            {
                id: 201,
                name: "Gaming Mouse with LED",
                price: 29.99,
                originalPrice: 39.99,
                image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 202,
                name: "Wireless Office Mouse",
                price: 19.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 203,
                name: "Ergonomic Vertical Mouse",
                price: 65.99,
                originalPrice: 85.99,
                image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop&crop=center",
                inStock: true
            }
        ],
        13: [
            {
                id: 401,
                name: "4K Gaming Monitor 27\"",
                price: 449.99,
                originalPrice: 599.99,
                image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 402,
                name: "Ultrawide Curved Monitor 34\"",
                price: 699.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 403,
                name: "Portable Monitor 15.6\"",
                price: 199.99,
                originalPrice: 249.99,
                image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&h=400&fit=crop&crop=center",
                inStock: false
            }
        ],
        14: [
            {
                id: 501,
                name: "Gaming Laptop RTX 4070",
                price: 1899.99,
                originalPrice: 2199.99,
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 502,
                name: "Business Ultrabook 14\"",
                price: 1299.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 503,
                name: "Budget Student Laptop",
                price: 549.99,
                originalPrice: 699.99,
                image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=400&fit=crop&crop=center",
                inStock: true
            }
        ],
        15: [
            {
                id: 511,
                name: "Gaming Desktop PC",
                price: 1599.99,
                originalPrice: 1899.99,
                image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 512,
                name: "Office Desktop Computer",
                price: 799.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 513,
                name: "Workstation Desktop",
                price: 2499.99,
                originalPrice: 2799.99,
                image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 514,
                name: "Compact Mini PC",
                price: 599.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 515,
                name: "All-in-One Desktop",
                price: 1299.99,
                originalPrice: 1499.99,
                image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop&crop=center",
                inStock: false
            }
        ],
        21: [
            {
                id: 301,
                name: "Latest Pro Smartphone 128GB",
                price: 899.99,
                originalPrice: 999.99,
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 302,
                name: "Budget Smartphone 64GB",
                price: 199.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 303,
                name: "Flagship Android Phone 256GB",
                price: 799.99,
                originalPrice: 899.99,
                image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
                inStock: true
            }
        ],
        22: [
            {
                id: 601,
                name: "Pro Tablet 12.9\" 256GB",
                price: 1099.99,
                originalPrice: 1299.99,
                image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 602,
                name: "Android Tablet 10\" 128GB",
                price: 299.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 603,
                name: "Budget Tablet 8\" 64GB",
                price: 149.99,
                originalPrice: 199.99,
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop&crop=center",
                inStock: false
            }
        ],
        61: [
            {
                id: 701,
                name: "Premium Cotton Dress Shirt",
                price: 89.99,
                originalPrice: 129.99,
                image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 702,
                name: "Casual Denim Jeans",
                price: 69.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 703,
                name: "Wool Blend Suit Jacket",
                price: 299.99,
                originalPrice: 399.99,
                image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop&crop=center",
                inStock: true
            },
            {
                id: 704,
                name: "Casual Polo Shirt",
                price: 39.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&crop=center",
                inStock: true
            }
        ]
    };

    const category = categories[categoryId];
    const subcategory = subcategories[subcategoryId];
    const products = productsData[subcategoryId] || [];

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products];

        // Filter by search term
        if (searchTerm.trim()) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by stock
        if (filterInStock) {
            filtered = filtered.filter(product => product.inStock);
        }

        // Filter by price range
        if (priceRange.min !== '') {
            filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
        }
        if (priceRange.max !== '') {
            filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return filtered;
    }, [products, sortBy, filterInStock, searchTerm, priceRange]);

    const handleBackToSubcategories = () => {
        // Preserve comparison state when going back
        if (compareProducts) {
            navigate(`/shop/category/${categoryId}?compare=${compareProducts}`);
        } else {
            navigate(`/shop/category/${categoryId}`);
        }
    };

    const handleProductClick = (productId) => {
        // Preserve comparison state when viewing product
        if (compareProducts) {
            navigate(`/shop/product/${productId}?compare=${compareProducts}`);
        } else {
            navigate(`/shop/product/${productId}`);
        }
    };

    const handleSearch = () => {
        // Search is already handled by the useMemo dependency on searchTerm
        // This function can be used for additional search actions if needed
    };

    const clearFilters = () => {
        setPriceRange({ min: '', max: '' });
        setFilterInStock(false);
        setSearchTerm('');
    };

    if (!subcategory) {
        return (
            <div className="shop-page">
                <div className="sidebar">
                    <ProductsOnSale compareProducts={compareProducts} />
                    <FeaturedProducts compareProducts={compareProducts} />
                </div>
                <div className="main-content">
                    <div className="error-message">
                        <h2>Subcategory not found</h2>
                        <button onClick={handleBackToSubcategories}>Back to Categories</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="shop-page">
            <div className="sidebar">
                <ProductsOnSale compareProducts={compareProducts} />
                <FeaturedProducts compareProducts={compareProducts} />
            </div>
            <div className="main-content">
                <div className="shop-products-section">
                    <button
                        className="back-button"
                        onClick={handleBackToSubcategories}
                    >
                        <ChevronLeft size={16} />
                        Back to {category?.name}
                    </button>
                    
                    <h2 className="section-title">{subcategory.name}</h2>
                    
                    {/* Show comparison status if active */}
                    {compareProducts && (
                        <div className="comparison-status">
                            <p>🔍 Comparing {compareProducts.split(',').length} product(s) - Add more products or <button onClick={() => navigate(`/compare?products=${compareProducts}`)} style={{color: '#FEF3C7', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600'}}>view comparison</button></p>
                        </div>
                    )}
                    
                    {/* Filter Bar */}
                    <div className="filter-bar">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="search-button" onClick={handleSearch}>
                                <Search size={16} />
                            </button>
                        </div>
                        
                        <div className="filter-controls">
                            <div className="sort-dropdown">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="sort-select"
                                >
                                    <option value="name">Default sorting</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                            <button 
                                className="filter-button"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter size={16} />
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Advanced Filters Panel */}
                    {showFilters && (
                        <div className="advanced-filters">
                            <h3 className="filters-title">Advanced Filters</h3>
                            
                            <div className="filter-row">
                                <div className="price-range">
                                    <label className="filter-label">Price:</label>
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="price-input"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                                    />
                                    <span className="price-separator">to</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="price-input"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                                    />
                                </div>

                                <button className="clear-filters-btn" onClick={clearFilters}>
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {products.length === 0 ? (
                        <div className="no-products">
                            <p>No products available for this category yet.</p>
                            <p>Please check back later or browse other categories.</p>
                        </div>
                    ) : (
                        <>
                            <div className="results-info">
                                <span>Showing {filteredAndSortedProducts.length} of {products.length} results</span>
                            </div>
                            
                            <div className="products-grid">
                                {filteredAndSortedProducts.map(product => (
                                    <div
                                        key={product.id}
                                        className="product-card"
                                        onClick={() => handleProductClick(product.id)}
                                    >
                                        <div className="product-image">
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                        <div className="product-info">
                                            <h3 className="product-name">{product.name}</h3>
                                            <div className="product-price">
                                                {product.originalPrice && (
                                                    <span className="original-price">${product.originalPrice}</span>
                                                )}
                                                <span className="current-price">${product.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsList;