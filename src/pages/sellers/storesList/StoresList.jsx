import { Link } from 'react-router-dom';
import { ExternalLink, Building2, ArrowLeft } from 'lucide-react';
import './StoresList.scss';

const StoresList = () => {
    const storesListUrl = "https://seller-dashboard.shamsuperstore.com/stores-list";

    return (
        <div className="stores-list-page">
            <div className="stores-list-container">
                <Link to="/sellers" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Sellers
                </Link>

                <div className="stores-list-content">
                    <div className="stores-list-icon">
                        <Building2 size={80} />
                    </div>

                    <h1>Stores List</h1>

                    <p>
                        Browse and explore all active stores on our marketplace platform. Access the comprehensive
                        stores directory to discover vendors, compare offerings, and manage store relationships.
                    </p>

                    <a
                        href={storesListUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stores-list-btn"
                    >
                        <ExternalLink size={20} />
                        View All Stores
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StoresList;