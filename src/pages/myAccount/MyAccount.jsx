import React, { useState } from 'react';
import './MyAccount.scss';

// Import all components
import AuthSection from './authSection/AuthSection';
import Dashboard from './dashboard/Dashboard';
import Orders from './orders/Orders';
import OrderTracking from './orderTracking/OrderTracking';
import Downloads from './downloads/Downloads';
import Addresses from './addresses/Addresses';
import PaymentMethods from './paymentMethods/PaymentMethods';
import AccountDetails from './accountDetails/AccountDetails';
import Wishlist from './wishlist/Wishlist';
import Following from './following/Following';
import LostPassword from './lostPassword/LostPassword';
import SupportTickets from './supportTickets/SupportTickets';
import Inquiries from './inquiries/Inquiries';

const MyAccount = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showLogin, setShowLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setActiveTab('dashboard');
        setFormData({ email: '', password: '', rememberMe: false });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard handleLogout={handleLogout} setActiveTab={setActiveTab} />;
            case 'orders':
                return <Orders />;
            case 'order-tracking':
                return <OrderTracking />;
            case 'downloads':
                return <Downloads />;
            case 'addresses':
                return <Addresses />;
            case 'payment-methods':
                return <PaymentMethods />;
            case 'account-details':
                return <AccountDetails />;
            case 'wishlist':
                return <Wishlist />;
            case 'following':
                return <Following />;
            case 'lost-password':
                return <LostPassword setShowLogin={setShowLogin} />;
            case 'support-tickets':
                return <SupportTickets />;
            case 'inquiries':
                return <Inquiries />;
            default:
                return <Dashboard handleLogout={handleLogout} setActiveTab={setActiveTab} />;
        }
    };

    if (!isLoggedIn) {
        return (
            <AuthSection
                formData={formData}
                handleInputChange={handleInputChange}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
            />
        );
    }

    return (
        <div className="my-account">
            <div className="account-container">
                <div className="account-sidebar">
                    <div className="user-info">
                        <h3>yamanajlouni</h3>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                    <nav className="account-nav">
                        <ul>
                            <li className={activeTab === 'dashboard' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
                            </li>
                            <li className={activeTab === 'orders' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('orders')}>Orders</button>
                            </li>
                            <li className={activeTab === 'order-tracking' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('order-tracking')}>Order Tracking</button>
                            </li>
                            <li className={activeTab === 'downloads' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('downloads')}>Downloads</button>
                            </li>
                            <li className={activeTab === 'addresses' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('addresses')}>Addresses</button>
                            </li>
                            <li className={activeTab === 'payment-methods' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('payment-methods')}>Payment Methods</button>
                            </li>
                            <li className={activeTab === 'account-details' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('account-details')}>Account Details</button>
                            </li>
                            <li className={activeTab === 'wishlist' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('wishlist')}>Wishlist</button>
                            </li>
                            <li className={activeTab === 'following' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('following')}>Following</button>
                            </li>
                            <li className={activeTab === 'support-tickets' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('support-tickets')}>Support Tickets</button>
                            </li>
                            <li className={activeTab === 'inquiries' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('inquiries')}>Contacted Sellers</button>
                            </li>
                            <li className={activeTab === 'lost-password' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('lost-password')}>Lost Password</button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="account-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MyAccount;