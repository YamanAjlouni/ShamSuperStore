// Categories.jsx - Updated with navigation
import { useNavigate } from 'react-router-dom';
import './Categories.scss';

export const Categories = () => {
    const navigate = useNavigate();

    const categories = [
        {
            id: 1,
            name: "Computer",
            image: "/api/placeholder/120/120"
        },
        {
            id: 2,
            name: "Electronics",
            image: "/api/placeholder/120/120"
        },
        {
            id: 3,
            name: "Smart Home",
            image: "/api/placeholder/120/120"
        },
        {
            id: 4,
            name: "Home - Garden",
            image: "/api/placeholder/120/120"
        },
        {
            id: 5,
            name: "Furniture",
            image: "/api/placeholder/120/120"
        },
        {
            id: 6,
            name: "Clothes",
            image: "/api/placeholder/120/120"
        },
        {
            id: 7,
            name: "Shoes",
            image: "/api/placeholder/120/120"
        },
        {
            id: 8,
            name: "Babies - Kids - Children Supplies",
            image: "/api/placeholder/120/120"
        },
        {
            id: 9,
            name: "Teen Supplies",
            image: "/api/placeholder/120/120"
        },
        {
            id: 10,
            name: "Beauty - Health",
            image: "/api/placeholder/120/120"
        },
        {
            id: 11,
            name: "Sports - Outdoor Activities",
            image: "/api/placeholder/120/120"
        },
        {
            id: 12,
            name: "Food Grocery",
            image: "/api/placeholder/120/120"
        },
        {
            id: 13,
            name: "Pets Supplies",
            image: "/api/placeholder/120/120"
        },
        {
            id: 14,
            name: "Entertainment",
            image: "/api/placeholder/120/120"
        },
        {
            id: 15,
            name: "Handmade",
            image: "/api/placeholder/120/120"
        },
        {
            id: 16,
            name: "School - Office Supplies",
            image: "/api/placeholder/120/120"
        },
        {
            id: 17,
            name: "Books",
            image: "/api/placeholder/120/120"
        },
        {
            id: 18,
            name: "Cars",
            image: "/api/placeholder/120/120"
        },
        {
            id: 19,
            name: "Industrial Scientific Materials",
            image: "/api/placeholder/120/120"
        },
        {
            id: 20,
            name: "Bags - Luggage",
            image: "/api/placeholder/120/120"
        }
    ];

    const handleCategoryClick = (categoryId) => {
        navigate(`/shop/category/${categoryId}`);
    };

    return (
        <div className="shop-categories-section">
            <h2 className="section-title">Categories</h2>
            <div className="categories-grid">
                {categories.map(category => (
                    <div
                        key={category.id}
                        className="category-item"
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        <div className="category-image">
                            <img src={category.image} alt={category.name} />
                        </div>
                        <h3 className="category-name">{category.name}</h3>
                        <button
                            className="view-category-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCategoryClick(category.id);
                            }}
                        >
                            View Category
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;