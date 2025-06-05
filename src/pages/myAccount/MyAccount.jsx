import React, { useState } from 'react';
import './MyAccount.scss';

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
    // Handle login logic here
    setIsLoggedIn(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    setFormData({ email: '', password: '', rememberMe: false });
  };

  // Login/Register Component
  const AuthSection = () => (
    <div className="auth-section">
      <div className="auth-container">
        <div className="auth-forms">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Username or email address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="it@shamsuperstore.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="password-input">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••••••••••••••"
                    required
                  />
                  <span className="password-toggle">👁</span>
                </div>
              </div>
              <button type="submit" className="login-btn">Log in</button>
              <div className="form-footer">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  Remember me
                </label>
                <a href="#" className="forgot-password">Lost your password?</a>
              </div>
            </form>
          </div>

          <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="reg-email">Email address *</label>
                <input
                  type="email"
                  id="reg-email"
                  name="email"
                  required
                />
              </div>
              <p className="register-info">
                A link to set a new password will be sent to your email address.
              </p>
              <p className="privacy-info">
                Your personal data will be used to support your experience throughout this
                website, to manage access to your account, and for other purposes described
                in our <a href="#" className="privacy-link">privacy policy</a>.
              </p>
              <button type="submit" className="register-btn">Register</button>
            </form>
            <div className="vendor-link">
              <a href="#" className="become-vendor">Become a Vendor</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="dashboard-content">
      <div className="welcome-message">
        <p>Hello <strong>yamanajlouni</strong> (not yamanajlouni? <button onClick={handleLogout} className="logout-link">Log out</button>)</p>
        <p>From your account dashboard you can view your <a href="#" onClick={() => setActiveTab('orders')}>recent orders</a>, manage your <a href="#" onClick={() => setActiveTab('addresses')}>shipping and billing addresses</a>, and <a href="#" onClick={() => setActiveTab('account-details')}>edit your password and account details</a>.</p>
        <p><a href="#" className="become-vendor-link">Become a Vendor</a></p>
      </div>
    </div>
  );

  // Orders Component
  const Orders = () => (
    <div className="orders-content">
      <h3>Orders</h3>
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5">No orders have been made yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <a href="#" className="browse-products">Browse products</a>
    </div>
  );

  // Order Tracking Component
  const OrderTracking = () => (
    <div className="order-tracking-content">
      <h3>Order Tracking</h3>
      <div className="tracking-form">
        <p>To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
        <form>
          <div className="form-group">
            <label htmlFor="order-id">Order ID</label>
            <input type="text" id="order-id" placeholder="Found in your order confirmation email." />
          </div>
          <div className="form-group">
            <label htmlFor="billing-email">Billing Email</label>
            <input type="email" id="billing-email" placeholder="Email you used during checkout." />
          </div>
          <button type="submit" className="track-btn">Track</button>
        </form>
      </div>
    </div>
  );

  // Downloads Component
  const Downloads = () => (
    <div className="downloads-content">
      <h3>Downloads</h3>
      <div className="downloads-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Downloads remaining</th>
              <th>Expires</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4">No downloads available yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <a href="#" className="browse-products">Browse products</a>
    </div>
  );

  // Addresses Component
  const Addresses = () => (
    <div className="addresses-content">
      <h3>Addresses</h3>
      <p>The following addresses will be used on the checkout page by default.</p>
      <div className="address-cards">
        <div className="address-card">
          <div className="address-header">
            <h4>Billing Address</h4>
            <a href="#" className="edit-link">Edit</a>
          </div>
          <div className="address-info">
            <p>You have not set up this type of address yet.</p>
          </div>
        </div>
        <div className="address-card">
          <div className="address-header">
            <h4>Shipping Address</h4>
            <a href="#" className="edit-link">Edit</a>
          </div>
          <div className="address-info">
            <p>You have not set up this type of address yet.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Payment Methods Component
  const PaymentMethods = () => (
    <div className="payment-methods-content">
      <h3>Payment Methods</h3>
      <p>You cannot add a new payment method so no billing address is required.</p>
      <div className="payment-methods-list">
        <p>No saved payment methods found.</p>
      </div>
    </div>
  );

  // Account Details Component
  const AccountDetails = () => (
    <div className="account-details-content">
      <h3>Account Details</h3>
      <form className="account-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="first-name">First name *</label>
            <input type="text" id="first-name" name="firstName" />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last name *</label>
            <input type="text" id="last-name" name="lastName" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="display-name">Display name *</label>
          <input type="text" id="display-name" name="displayName" />
          <small>This will be how your name will be displayed in the account section and in reviews</small>
        </div>
        <div className="form-group">
          <label htmlFor="account-email">Email address *</label>
          <input type="email" id="account-email" name="email" />
        </div>
        <fieldset className="password-fieldset">
          <legend>Password change</legend>
          <div className="form-group">
            <label htmlFor="current-password">Current password (leave blank to leave unchanged)</label>
            <input type="password" id="current-password" name="currentPassword" />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New password (leave blank to leave unchanged)</label>
            <input type="password" id="new-password" name="newPassword" />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm new password</label>
            <input type="password" id="confirm-password" name="confirmPassword" />
          </div>
        </fieldset>
        <button type="submit" className="save-changes-btn">Save changes</button>
      </form>
    </div>
  );

  // Wishlist Component
  const Wishlist = () => (
    <div className="wishlist-content">
      <h3>Wishlist</h3>
      <div className="wishlist-items">
        <p>No products added to the wishlist</p>
      </div>
      <a href="#" className="return-shop">Return To Shop</a>
    </div>
  );

  // Following Component
  const Following = () => (
    <div className="following-content">
      <h3>Following</h3>
      <div className="following-list">
        <p>You are not following any stores yet.</p>
      </div>
      <a href="#" className="browse-stores">Browse Stores</a>
    </div>
  );

  // Lost Password Component
  const LostPassword = () => (
    <div className="lost-password-content">
      <h3>Lost Password</h3>
      <p>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</p>
      <form className="lost-password-form">
        <div className="form-group">
          <label htmlFor="username-email">Username or email address</label>
          <input type="text" id="username-email" name="usernameEmail" />
        </div>
        <button type="submit" className="reset-password-btn">Reset password</button>
      </form>
      <a href="#" onClick={() => setShowLogin(true)} className="back-login">Remember your password?</a>
    </div>
  );

  // Support Tickets Component
  const SupportTickets = () => (
    <div className="support-tickets-content">
      <h3>Support Tickets</h3>
      <div className="tickets-header">
        <button className="new-ticket-btn">Create New Ticket</button>
      </div>
      <div className="tickets-table">
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6">No support tickets found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Inquiries Component
  const Inquiries = () => (
    <div className="inquiries-content">
      <h3>Inquiries</h3>
      <div className="inquiries-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5">No inquiries found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'orders': return <Orders />;
      case 'order-tracking': return <OrderTracking />;
      case 'downloads': return <Downloads />;
      case 'addresses': return <Addresses />;
      case 'payment-methods': return <PaymentMethods />;
      case 'account-details': return <AccountDetails />;
      case 'wishlist': return <Wishlist />;
      case 'following': return <Following />;
      case 'lost-password': return <LostPassword />;
      case 'support-tickets': return <SupportTickets />;
      case 'inquiries': return <Inquiries />;
      default: return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <AuthSection />;
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
                <button onClick={() => setActiveTab('inquiries')}>Inquiries</button>
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