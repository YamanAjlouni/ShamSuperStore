import React from 'react';
import './Categories.scss';

const Categories = () => {
    const categories = [
        // Row 1
        { icon: 'computer-icon', name: 'Computers' },
        { icon: 'headphones-icon', name: 'Electronics' },
        { icon: 'smarthome-icon', name: 'Smart Home' },
        { icon: 'furniture-icon', name: 'Furniture' },
        { icon: 'clothes-icon', name: 'Clothes' },
        { icon: 'shoes-icon', name: 'Shoes' },

        // Row 2
        { icon: 'home-garden-icon', name: 'Home & Garden' },
        { icon: 'sport-icon', name: 'Sport & Outdoor Activities' },
        { icon: 'teen-icon', name: 'Teen Supplies' },
        { icon: 'babies-icon', name: 'Babies & Kids Supply' },
        { icon: 'beauty-icon', name: 'Beauty & Health' },
        { icon: 'bags-icon', name: 'Bags & Luggage' },

        // Row 3
        { icon: 'entertainment-icon', name: 'Entertainment' },
        { icon: 'handmade-icon', name: 'Handmade' },
        { icon: 'school-icon', name: 'School & Office Supplies' },
        { icon: 'pets-icon', name: 'Pets Supplies' },
        { icon: 'cars-icon', name: 'Cars' },
        { icon: 'books-icon', name: 'Books' },
    ];

    return (
        <div className="categories-section">
            <h2 className="section-title">Categories</h2>

            <div className="categories-grid">
                {categories.map((category, index) => (
                    <div key={index} className="category-item">
                        <div className={`category-icon ${category.icon}`}></div>
                        <span className="category-name">{category.name}</span>
                    </div>
                ))}
            </div>

            <div className="divider"></div>
        </div>
    );
};

export default Categories;