import React from 'react';
import './Downloads.scss';

const Downloads = () => {
    return (
        <div className="downloads-content">
            <h3>Downloads</h3>
            <div className="downloads-table">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Downloads remaining</th>
                            <th>Expires</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="4">No downloads available yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <a href="#" className="browse-products">Browse products</a>
        </div>
    );
};

export default Downloads;