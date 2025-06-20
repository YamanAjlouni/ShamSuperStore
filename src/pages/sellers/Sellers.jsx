import { ExternalLink, Store } from 'lucide-react';
import './Sellers.scss';

const Sellers = () => {
    const sellerDashboardUrl = "https://seller-dashboard.shamsuperstore.com";

    return (
        <div className="sellers-page">
            <div className="sellers-container">
                <div className="sellers-content">
                    <div className="sellers-icon">
                        <Store size={80} />
                    </div>

                    <h1>Join as a Seller</h1>

                    <p>
                        Become a seller on Sham Super Store and start your business journey with us.
                        Access our seller dashboard to manage your products, orders, and grow your business.
                    </p>

                    <a
                        href={sellerDashboardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dashboard-btn"
                    >
                        <ExternalLink size={20} />
                        Go to Seller Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sellers;