import React from 'react';
import './OrderTracking.scss';

const OrderTracking = () => {
    return (
        <div className="order-tracking-content">
            <h3>Order Tracking</h3>
            <div className="tracking-form">
                <p>To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                <form>
                    <div className="form-group">
                        <label htmlFor="order-id">Order ID</label>
                        <input type="text" id="order-id" placeholder="Found in your order confirmation email." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="billing-email">Billing Email</label>
                        <input type="email" id="billing-email" placeholder="Email you used during checkout." />
                    </div>
                    <button type="submit" className="track-btn">Track</button>
                </form>
            </div>
        </div>
    );
};

export default OrderTracking;