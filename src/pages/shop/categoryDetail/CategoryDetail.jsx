// CategoryDetail.jsx - Shows subcategories when category is clicked
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryDetail.scss';

export const CategoryDetail = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    // Categories data to get category info
    const categories = {
        1: { name: "Computer", image: "/api/placeholder/120/120", description: "Computer hardware and accessories" },
        2: { name: "Electronics", image: "/api/placeholder/120/120", description: "Electronic devices and gadgets" },
        3: { name: "Smart Home", image: "/api/placeholder/120/120", description: "Smart home devices and automation" },
        4: { name: "Home - Garden", image: "/api/placeholder/120/120", description: "Home and garden essentials" },
        5: { name: "Furniture", image: "/api/placeholder/120/120", description: "Indoor and outdoor furniture" },
        6: { name: "Clothes", image: "/api/placeholder/120/120", description: "Fashion and clothing" },
        7: { name: "Shoes", image: "/api/placeholder/120/120", description: "Footwear for all occasions" },
        8: { name: "Babies - Kids - Children Supplies", image: "/api/placeholder/120/120", description: "Everything for babies and children" },
        9: { name: "Teen Supplies", image: "/api/placeholder/120/120", description: "Products for teenagers" },
        10: { name: "Beauty - Health", image: "/api/placeholder/120/120", description: "Beauty and health products" },
        11: { name: "Sports - Outdoor Activities", image: "/api/placeholder/120/120", description: "Sports and outdoor equipment" },
        12: { name: "Food Grocery", image: "/api/placeholder/120/120", description: "Food and grocery items" },
        13: { name: "Pets Supplies", image: "/api/placeholder/120/120", description: "Everything for your pets" },
        14: { name: "Entertainment", image: "/api/placeholder/120/120", description: "Entertainment and media" },
        15: { name: "Handmade", image: "/api/placeholder/120/120", description: "Handcrafted items and art" },
        16: { name: "School - Office Supplies", image: "/api/placeholder/120/120", description: "School and office essentials" },
        17: { name: "Books", image: "/api/placeholder/120/120", description: "Books and literature" },
        18: { name: "Cars", image: "/api/placeholder/120/120", description: "Automotive and car accessories" },
        19: { name: "Industrial Scientific Materials", image: "/api/placeholder/120/120", description: "Industrial and scientific equipment" },
        20: { name: "Bags - Luggage", image: "/api/placeholder/120/120", description: "Bags and travel luggage" }
    };

    // Subcategories data for each category
    const subcategoriesData = {
        1: [ // Computer subcategories
            {
                id: 11,
                name: "Keyboards",
                image: "/api/placeholder/120/120",
                description: "Mechanical and membrane keyboards"
            },
            {
                id: 12,
                name: "Mice",
                image: "/api/placeholder/120/120",
                description: "Gaming and office mice"
            },
            {
                id: 13,
                name: "Monitors",
                image: "/api/placeholder/120/120",
                description: "LCD, LED, and OLED monitors"
            },
            {
                id: 14,
                name: "Laptops",
                image: "/api/placeholder/120/120",
                description: "Gaming and business laptops"
            },
            {
                id: 15,
                name: "Desktops",
                image: "/api/placeholder/120/120",
                description: "Pre-built and custom PCs"
            },
            {
                id: 16,
                name: "Accessories",
                image: "/api/placeholder/120/120",
                description: "Cables, adapters, and more"
            }
        ],
        2: [ // Electronics subcategories
            {
                id: 21,
                name: "Smartphones",
                image: "/api/placeholder/120/120",
                description: "Latest smartphones and accessories"
            },
            {
                id: 22,
                name: "Tablets",
                image: "/api/placeholder/120/120",
                description: "Tablets for work and entertainment"
            },
            {
                id: 23,
                name: "Headphones",
                image: "/api/placeholder/120/120",
                description: "Wireless and wired headphones"
            },
            {
                id: 24,
                name: "Cameras",
                image: "/api/placeholder/120/120",
                description: "Digital cameras and equipment"
            }
        ],
        6: [ // Clothes subcategories
            {
                id: 61,
                name: "Men's Clothing",
                image: "/api/placeholder/120/120",
                description: "Shirts, pants, suits and more"
            },
            {
                id: 62,
                name: "Women's Clothing",
                image: "/api/placeholder/120/120",
                description: "Dresses, tops, pants and more"
            },
            {
                id: 63,
                name: "Kids Clothing",
                image: "/api/placeholder/120/120",
                description: "Clothing for children"
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