import { ExternalLink, Truck } from 'lucide-react';
import './DeliveryDrivers.scss';

const DeliveryDrivers = () => {
    const driverDashboardUrl = "https://driver-dashboard.shamsuperstore.com";

    return (
        <div className="delivery-drivers-page">
            <div className="delivery-drivers-container">
                <div className="delivery-drivers-content">
                    <div className="drivers-icon">
                        <Truck size={80} />
                    </div>

                    <h1>Join as a Delivery Driver</h1>

                    <p>
                        Become a delivery driver with Sham Super Store and start earning with flexible hours.
                        Access our driver dashboard to manage your deliveries, track earnings, and join our growing network.
                    </p>

                    <a
                        href={driverDashboardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dashboard-btn"
                    >
                        <ExternalLink size={20} />
                        Go to Driver Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDrivers;