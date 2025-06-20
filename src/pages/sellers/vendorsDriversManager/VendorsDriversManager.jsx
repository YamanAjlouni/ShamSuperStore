import { Link } from 'react-router-dom';
import { ExternalLink, TruckIcon, ArrowLeft } from 'lucide-react';
import './VendorsDriversManager.scss';

const VendorsDriversManager = () => {
    const vendorsDriversUrl = "https://seller-dashboard.shamsuperstore.com/drivers-manager";

    return (
        <div className="vendors-drivers-manager-page">
            <div className="vendors-drivers-manager-container">
                <Link to="/sellers" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Sellers
                </Link>

                <div className="vendors-drivers-manager-content">
                    <div className="vendors-drivers-manager-icon">
                        <TruckIcon size={80} />
                    </div>

                    <h1>Vendors Drivers Manager</h1>

                    <p>
                        Coordinate and manage delivery drivers for your vendor operations. Access the drivers
                        management portal to assign deliveries, track driver performance, and ensure timely order fulfillment.
                    </p>

                    <a
                        href={vendorsDriversUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vendors-drivers-manager-btn"
                    >
                        <ExternalLink size={20} />
                        Manage Drivers
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VendorsDriversManager;