import React from 'react';
import './Addresses.scss';

const Addresses = () => {
    return (
        <div className="addresses-content">
            <h3>Addresses</h3>
            <p>The following addresses will be used on the checkout page by default.</p>
            <div className="address-cards">
                <div className="address-card">
                    <div className="address-header">
                        <h4>Billing Address</h4>
                        <a href="#" className="edit-link">Edit</a>
                    </div>
                    <div className="address-info">
                        <p>You have not set up this type of address yet.</p>
                    </div>
                </div>
                <div className="address-card">
                    <div className="address-header">
                        <h4>Shipping Address</h4>
                        <a href="#" className="edit-link">Edit</a>
                    </div>
                    <div className="address-info">
                        <p>You have not set up this type of address yet.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addresses;