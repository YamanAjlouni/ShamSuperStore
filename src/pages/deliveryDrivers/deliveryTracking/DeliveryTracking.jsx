import { Link } from 'react-router-dom';
import { ExternalLink, MapPin, ArrowLeft } from 'lucide-react';
import './DeliveryTracking.scss';

const DeliveryTracking = () => {
    const trackingUrl = "https://shamsuperstore-dashboard.netlify.app/";

    return (
        <div className="delivery-tracking-page">
            <div className="delivery-tracking-container">
                <Link to="/delivery-drivers" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Delivery Drivers
                </Link>

                <div className="delivery-tracking-content">
                    <div className="delivery-tracking-icon">
                        <MapPin size={80} />
                    </div>

                    <h1>Delivery Tracking</h1>

                    <p>
                        Track all deliveries in real-time with our advanced tracking system. Access the tracking
                        portal to monitor delivery status, view routes, and ensure timely order fulfillment.
                    </p>

                    <a
                        href={trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="delivery-tracking-btn"
                    >
                        <ExternalLink size={20} />
                        Track Deliveries
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeliveryTracking;