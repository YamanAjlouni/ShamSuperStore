import React from 'react';
import './Wishlist.scss';

const Wishlist = () => {
    return (
        <div className="wishlist-content">
            <h3>Wishlist</h3>
            <div className="wishlist-items">
                <p>No products added to the wishlist</p>
            </div>
            <a href="#" className="return-shop">Return To Shop</a>
        </div>
    );
};

export default Wishlist;