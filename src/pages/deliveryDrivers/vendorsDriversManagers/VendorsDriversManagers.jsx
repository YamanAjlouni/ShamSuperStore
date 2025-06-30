import { Link } from 'react-router-dom';
import { ExternalLink, Users, ArrowLeft } from 'lucide-react';
import './VendorsDriversManagers.scss';

const VendorsDriversManagers = () => {
    const vendorsDriversManagersUrl = "https://shamsuperstore-dashboard.netlify.app/";

    return (
        <div className="vendors-drivers-managers-page">
            <div className="vendors-drivers-managers-container">
                <Link to="/delivery-drivers" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Delivery Drivers
                </Link>

                <div className="vendors-drivers-managers-content">
                    <div className="vendors-drivers-managers-icon">
                        <Users size={80} />
                    </div>

                    <h1>Vendors Drivers Managers</h1>

                    <p>
                        Coordinate between vendors and delivery drivers for seamless operations. Access the management
                        portal to facilitate communication, assign tasks, and ensure efficient delivery workflows.
                    </p>

                    <a
                        href={vendorsDriversManagersUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vendors-drivers-managers-btn"
                    >
                        <ExternalLink size={20} />
                        Access Management Portal
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VendorsDriversManagers;