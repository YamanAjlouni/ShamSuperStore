// CategoryDetail.jsx - Updated with Unsplash images
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryDetail.scss';

export const CategoryDetail = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    // Categories data to get category info
    const categories = {
        1: { name: "Computer", image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=240&h=240&fit=crop&crop=center", description: "Computer hardware and accessories" },
        2: { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=240&h=240&fit=crop&crop=center", description: "Electronic devices and gadgets" },
        3: { name: "Smart Home", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=240&h=240&fit=crop&crop=center", description: "Smart home devices and automation" },
        4: { name: "Home - Garden", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=240&h=240&fit=crop&crop=center", description: "Home and garden essentials" },
        5: { name: "Furniture", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=240&h=240&fit=crop&crop=center", description: "Indoor and outdoor furniture" },
        6: { name: "Clothes", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=240&h=240&fit=crop&crop=center", description: "Fashion and clothing" },
        7: { name: "Shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=240&h=240&fit=crop&crop=center", description: "Footwear for all occasions" },
        8: { name: "Babies - Kids - Children Supplies", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=240&h=240&fit=crop&crop=center", description: "Everything for babies and children" },
        9: { name: "Teen Supplies", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=240&h=240&fit=crop&crop=center", description: "Products for teenagers" },
        10: { name: "Beauty - Health", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=240&h=240&fit=crop&crop=center", description: "Beauty and health products" },
        11: { name: "Sports - Outdoor Activities", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=240&h=240&fit=crop&crop=center", description: "Sports and outdoor equipment" },
        12: { name: "Food Grocery", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=240&h=240&fit=crop&crop=center", description: "Food and grocery items" },
        13: { name: "Pets Supplies", image: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=240&h=240&fit=crop&crop=center", description: "Everything for your pets" },
        14: { name: "Entertainment", image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=240&h=240&fit=crop&crop=center", description: "Entertainment and media" },
        15: { name: "Handmade", image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=240&h=240&fit=crop&crop=center", description: "Handcrafted items and art" },
        16: { name: "School - Office Supplies", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=240&h=240&fit=crop&crop=center", description: "School and office essentials" },
        17: { name: "Books", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=240&fit=crop&crop=center", description: "Books and literature" },
        18: { name: "Cars", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=240&h=240&fit=crop&crop=center", description: "Automotive and car accessories" },
        19: { name: "Industrial Scientific Materials", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=240&h=240&fit=crop&crop=center", description: "Industrial and scientific equipment" },
        20: { name: "Bags - Luggage", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=240&h=240&fit=crop&crop=center", description: "Bags and travel luggage" }
    };

    // Subcategories data for each category
    const subcategoriesData = {
        1: [ // Computer subcategories
            {
                id: 11,
                name: "Keyboards",
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=240&h=240&fit=crop&crop=center",
                description: "Mechanical and membrane keyboards"
            },
            {
                id: 12,
                name: "Mice",
                image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=240&h=240&fit=crop&crop=center",
                description: "Gaming and office mice"
            },
            {
                id: 13,
                name: "Monitors",
                image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=240&h=240&fit=crop&crop=center",
                description: "LCD, LED, and OLED monitors"
            },
            {
                id: 14,
                name: "Laptops",
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=240&h=240&fit=crop&crop=center",
                description: "Gaming and business laptops"
            },
            {
                id: 15,
                name: "Desktops",
                image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=240&h=240&fit=crop&crop=center",
                description: "Pre-built and custom PCs"
            },
            {
                id: 16,
                name: "Accessories",
                image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=240&h=240&fit=crop&crop=center",
                description: "Cables, adapters, and more"
            }
        ],
        2: [ // Electronics subcategories
            {
                id: 21,
                name: "Smartphones",
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=240&h=240&fit=crop&crop=center",
                description: "Latest smartphones and accessories"
            },
            {
                id: 22,
                name: "Tablets",
                image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=240&h=240&fit=crop&crop=center",
                description: "Tablets for work and entertainment"
            },
            {
                id: 23,
                name: "Headphones",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=240&h=240&fit=crop&crop=center",
                description: "Wireless and wired headphones"
            },
            {
                id: 24,
                name: "Cameras",
                image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=240&h=240&fit=crop&crop=center",
                description: "Digital cameras and equipment"
            }
        ],
        3: [ // Smart Home subcategories
            {
                id: 31,
                name: "Smart Speakers",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=240&h=240&fit=crop&crop=center",
                description: "Voice-controlled smart speakers"
            },
            {
                id: 32,
                name: "Smart Lighting",
                image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=240&h=240&fit=crop&crop=center",
                description: "Smart bulbs and lighting systems"
            },
            {
                id: 33,
                name: "Security Systems",
                image: "https://images.unsplash.com/photo-1558618047-e5c8fc20caef?w=240&h=240&fit=crop&crop=center",
                description: "Smart cameras and security devices"
            }
        ],
        4: [ // Home - Garden subcategories
            {
                id: 41,
                name: "Garden Tools",
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=240&h=240&fit=crop&crop=center",
                description: "Tools for gardening and landscaping"
            },
            {
                id: 42,
                name: "Home Decor",
                image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=240&h=240&fit=crop&crop=center",
                description: "Decorative items for your home"
            },
            {
                id: 43,
                name: "Kitchen Appliances",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=240&h=240&fit=crop&crop=center",
                description: "Small and large kitchen appliances"
            }
        ],
        5: [ // Furniture subcategories
            {
                id: 51,
                name: "Living Room",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=240&h=240&fit=crop&crop=center",
                description: "Sofas, chairs, and living room furniture"
            },
            {
                id: 52,
                name: "Bedroom",
                image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=240&h=240&fit=crop&crop=center",
                description: "Beds, wardrobes, and bedroom furniture"
            },
            {
                id: 53,
                name: "Office",
                image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=240&h=240&fit=crop&crop=center",
                description: "Desks, chairs, and office furniture"
            }
        ],
        6: [ // Clothes subcategories
            {
                id: 61,
                name: "Men's Clothing",
                image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=240&h=240&fit=crop&crop=center",
                description: "Shirts, pants, suits and more"
            },
            {
                id: 62,
                name: "Women's Clothing",
                image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=240&h=240&fit=crop&crop=center",
                description: "Dresses, tops, pants and more"
            },
            {
                id: 63,
                name: "Kids Clothing",
                image: "https://images.unsplash.com/photo-1503944168970-8c03014faa46?w=240&h=240&fit=crop&crop=center",
                description: "Clothing for children"
            }
        ],
        7: [ // Shoes subcategories
            {
                id: 71,
                name: "Athletic Shoes",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=240&h=240&fit=crop&crop=center",
                description: "Running, training, and sports shoes"
            },
            {
                id: 72,
                name: "Casual Shoes",
                image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=240&h=240&fit=crop&crop=center",
                description: "Everyday casual footwear"
            },
            {
                id: 73,
                name: "Formal Shoes",
                image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=240&h=240&fit=crop&crop=center",
                description: "Dress shoes and formal footwear"
            }
        ],
        10: [ // Beauty - Health subcategories
            {
                id: 101,
                name: "Skincare",
                image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=240&h=240&fit=crop&crop=center",
                description: "Face care and skincare products"
            },
            {
                id: 102,
                name: "Makeup",
                image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=240&h=240&fit=crop&crop=center",
                description: "Cosmetics and makeup products"
            },
            {
                id: 103,
                name: "Health Supplements",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=240&h=240&fit=crop&crop=center",
                description: "Vitamins and health supplements"
            }
        ],
        11: [ // Sports - Outdoor Activities subcategories
            {
                id: 111,
                name: "Fitness Equipment",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=240&h=240&fit=crop&crop=center",
                description: "Home gym and fitness equipment"
            },
            {
                id: 112,
                name: "Outdoor Gear",
                image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=240&h=240&fit=crop&crop=center",
                description: "Camping and outdoor equipment"
            },
            {
                id: 113,
                name: "Sports Apparel",
                image: "https://images.unsplash.com/photo-1556306535-38febf6782e7?w=240&h=240&fit=crop&crop=center",
                description: "Athletic wear and sports clothing"
            }
        ]
    };

    const category = categories[categoryId];
    const subcategories = subcategoriesData[categoryId] || [];

    const handleBackToCategories = () => {
        navigate('/shop');
    };

    const handleSubcategoryClick = (subcategoryId) => {
        navigate(`/shop/category/${categoryId}/subcategory/${subcategoryId}`);
    };

    if (!category) {
        return (
            <div className="category-detail">
                <div className="error-message">
                    <h2>Category not found</h2>
                    <button onClick={handleBackToCategories}>Back to Shop</button>
                </div>
            </div>
        );
    }

    return (
        <div className="category-detail">
            <div className="category-header">
                <button
                    className="back-button"
                    onClick={handleBackToCategories}
                >
                    ← Back to Categories
                </button>
                <div className="category-info">
                    <div className="category-image">
                        <img src={category.image} alt={category.name} />
                    </div>
                    <div className="category-text">
                        <h1 className="category-title">{category.name}</h1>
                        <p className="category-description">{category.description}</p>
                    </div>
                </div>
            </div>

            <div className="subcategories-section">
                <h2 className="section-title">Browse {category.name}</h2>
                {subcategories.length === 0 ? (
                    <div className="no-subcategories">
                        <p>No subcategories available for this category yet.</p>
                        <p>Please check back later or browse other categories.</p>
                    </div>
                ) : (
                    <div className="subcategories-grid">
                        {subcategories.map(subcategory => (
                            <div
                                key={subcategory.id}
                                className="subcategory-item"
                                onClick={() => handleSubcategoryClick(subcategory.id)}
                            >
                                <div className="subcategory-image">
                                    <img src={subcategory.image} alt={subcategory.name} />
                                </div>
                                <div className="subcategory-content">
                                    <h3 className="subcategory-name">{subcategory.name}</h3>
                                    <p className="subcategory-description">{subcategory.description}</p>
                                    <button
                                        className="view-products-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSubcategoryClick(subcategory.id);
                                        }}
                                    >
                                        View Products
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

export default CategoryDetail;