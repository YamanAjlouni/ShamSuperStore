import { Link } from 'react-router-dom';
import { ExternalLink, Store, ArrowLeft } from 'lucide-react';
import './StoreManager.scss';

const StoreManager = () => {
    const storeManagerUrl = "https://seller-dashboard.shamsuperstore.com/store-manager";

    return (
        <div className="store-manager-page">
            <div className="store-manager-container">
                <Link to="/sellers" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Sellers
                </Link>

                <div className="store-manager-content">
                    <div className="store-manager-icon">
                        <Store size={80} />
                    </div>

                    <h1>Store Manager</h1>

                    <p>
                        Manage your online store with powerful tools and analytics. Access your store management
                        dashboard to update products, process orders, and track your business performance.
                    </p>

                    <a
                        href={storeManagerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="store-manager-btn"
                    >
                        <ExternalLink size={20} />
                        Access Store Manager
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StoreManager;