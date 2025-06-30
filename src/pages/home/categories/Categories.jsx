import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';

const Categories = () => {
    const categories = [
        // Row 1
        { id: 1, icon: 'computer-icon', name: 'Computers' },
        { id: 2, icon: 'headphones-icon', name: 'Electronics' },
        { id: 3, icon: 'smarthome-icon', name: 'Smart Home' },
        { id: 5, icon: 'furniture-icon', name: 'Furniture' },
        { id: 6, icon: 'clothes-icon', name: 'Clothes' },
        { id: 7, icon: 'shoes-icon', name: 'Shoes' },

        // Row 2
        { id: 4, icon: 'home-garden-icon', name: 'Home & Garden' },
        { id: 11, icon: 'sport-icon', name: 'Sport & Outdoor Activities' },
        { id: 9, icon: 'teen-icon', name: 'Teen Supplies' },
        { id: 8, icon: 'babies-icon', name: 'Babies & Kids Supply' },
        { id: 10, icon: 'beauty-icon', name: 'Beauty & Health' },
        { id: 20, icon: 'bags-icon', name: 'Bags & Luggage' },

        // Row 3
        { id: 14, icon: 'entertainment-icon', name: 'Entertainment' },
        { id: 15, icon: 'handmade-icon', name: 'Handmade' },
        { id: 16, icon: 'school-icon', name: 'School & Office Supplies' },
        { id: 13, icon: 'pets-icon', name: 'Pets Supplies' },
        { id: 18, icon: 'cars-icon', name: 'Cars' },
        { id: 17, icon: 'books-icon', name: 'Books' },
    ];

    return (
        <div className="categories-section">
            <h2 className="section-title">Categories</h2>

            <div className="categories-grid">
                {categories.map((category) => (
                    <Link 
                        key={category.id} 
                        to={`/shop/category/${category.id}`}
                        className="category-item"
                    >
                        <div className={`category-icon ${category.icon}`}></div>
                        <span className="category-name">{category.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;