import { Link } from 'react-router-dom';
import { ExternalLink, Crown, ArrowLeft } from 'lucide-react';
import './VendorMembership.scss';

const VendorMembership = () => {
    const membershipUrl = "https://shamsuperstore-dashboard.netlify.app/";

    return (
        <div className="vendor-membership-page">
            <div className="vendor-membership-container">
                <Link to="/sellers" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Sellers
                </Link>

                <div className="membership-content">
                    <div className="membership-icon">
                        <Crown size={80} />
                    </div>

                    <h1>Vendor Membership</h1>

                    <p>
                        Explore our vendor membership tiers and exclusive benefits. Access the membership
                        portal to choose the plan that best fits your business needs and unlock premium features.
                    </p>

                    <a
                        href={membershipUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="membership-btn"
                    >
                        <ExternalLink size={20} />
                        View Membership Plans
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VendorMembership;