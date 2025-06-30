import './ContactedSellers.scss';

const ContactedSellers = () => {
    return (
        <div className="inquiries-content">
            <h3>Contacted Sellers</h3>
            <div className="inquiries-table">
                <table>
                    <thead>
                        <tr>
                            <th>Seller</th>
                            <th>Subject</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5">No Contacted Sellers found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactedSellers;