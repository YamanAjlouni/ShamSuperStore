import React from 'react';
import './Inquiries.scss';

const Inquiries = () => {
    return (
        <div className="inquiries-content">
            <h3>Inquiries</h3>
            <div className="inquiries-table">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5">No inquiries found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inquiries;