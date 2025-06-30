import { Link } from 'react-router-dom';
import { ExternalLink, Smartphone, ArrowLeft } from 'lucide-react';
import './DeliveryDriversApp.scss';

const DeliveryDriversApp = () => {
    const appUrl = "https://shamsuperstore-dashboard.netlify.app/";

    return (
        <div className="delivery-drivers-app-page">
            <div className="delivery-drivers-app-container">
                <Link to="/delivery-drivers" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Delivery Drivers
                </Link>

                <div className="delivery-drivers-app-content">
                    <div className="delivery-drivers-app-icon">
                        <Smartphone size={80} />
                    </div>

                    <h1>Delivery Drivers App</h1>

                    <p>
                        Download our mobile app for drivers and manage deliveries on the go. Access app information,
                        download links, and get support for our mobile delivery management platform.
                    </p>

                    <a
                        href={appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="delivery-drivers-app-btn"
                    >
                        <ExternalLink size={20} />
                        Get Mobile App
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDriversApp;