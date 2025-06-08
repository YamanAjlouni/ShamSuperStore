import './Dashboard.scss';

const Dashboard = ({ handleLogout, setActiveTab }) => {
    return (
        <div className="dashboard-content">
            <div className="welcome-message">
                <p>Hello <strong>yamanajlouni</strong> (not yamanajlouni? <button onClick={handleLogout} className="logout-link">Log out</button>)</p>
                <p>From your account dashboard you can view your <a href="#" onClick={() => setActiveTab('orders')}>recent orders</a>, manage your <a href="#" onClick={() => setActiveTab('addresses')}>shipping and billing addresses</a>, and <a href="#" onClick={() => setActiveTab('account-details')}>edit your password and account details</a>.</p>
                <p><a href="#" className="become-vendor-link">Become a Vendor</a></p>
            </div>
        </div>
    );
};

export default Dashboard;