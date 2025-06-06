import React from 'react';
import './PaymentMethods.scss';

const PaymentMethods = () => {
    return (
        <div className="payment-methods-content">
            <h3>Payment Methods</h3>
            <p>You cannot add a new payment method so no billing address is required.</p>
            <div className="payment-methods-list">
                <p>No saved payment methods found.</p>
            </div>
        </div>
    );
};

export default PaymentMethods;