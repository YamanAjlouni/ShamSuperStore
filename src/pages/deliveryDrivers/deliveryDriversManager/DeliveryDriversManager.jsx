import { Link } from 'react-router-dom';
import { ExternalLink, Users, ArrowLeft } from 'lucide-react';
import './DeliveryDriversManager.scss';

const DeliveryDriversManager = () => {
    const managerDashboardUrl = "https://shamsuperstore-dashboard.netlify.app/";

    return (
        <div className="delivery-drivers-manager-page">
            <div className="delivery-drivers-manager-container">
                <Link to="/delivery-drivers" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Delivery Drivers
                </Link>

                <div className="manager-content">
                    <div className="manager-icon">
                        <Users size={80} />
                    </div>

                    <h1>Delivery Drivers Manager</h1>

                    <p>
                        Manage delivery operations and coordinate driver teams efficiently. Access the manager
                        dashboard to oversee deliveries, track performance, and ensure smooth operations.
                    </p>

                    <a
                        href={managerDashboardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="manager-btn"
                    >
                        <ExternalLink size={20} />
                        Access Manager Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDriversManager;