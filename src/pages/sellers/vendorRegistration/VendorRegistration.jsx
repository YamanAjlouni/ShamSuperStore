import { Link } from 'react-router-dom';
import { ExternalLink, UserPlus, ArrowLeft } from 'lucide-react';
import './VendorRegistration.scss';

const VendorRegistration = () => {
    const registrationUrl = "https://seller-dashboard.shamsuperstore.com/register";

    return (
        <div className="vendor-registration-page">
            <div className="vendor-registration-container">
                <Link to="/sellers" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Sellers
                </Link>

                <div className="registration-content">
                    <div className="registration-icon">
                        <UserPlus size={80} />
                    </div>

                    <h1>Vendor Registration</h1>

                    <p>
                        Start your seller journey with Sham Super Store. Register as a vendor through our
                        secure registration portal and begin selling your products to millions of customers.
                    </p>

                    <a
                        href={registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="registration-btn"
                    >
                        <ExternalLink size={20} />
                        Start Registration
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VendorRegistration;