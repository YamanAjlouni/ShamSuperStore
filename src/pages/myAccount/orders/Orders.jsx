import React from 'react';
import './Orders.scss';

const Orders = () => {
    return (
        <div className="orders-content">
            <h3>Orders</h3>
            <div className="orders-table">
                <table>
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5">No orders have been made yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <a href="#" className="browse-products">Browse products</a>
        </div>
    );
};

export default Orders;