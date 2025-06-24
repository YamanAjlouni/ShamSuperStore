import React from 'react';
import './AuthSection.scss';

const AuthSection = ({ formData, handleInputChange, handleLogin, handleRegister }) => {
    return (
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
                            {/* <a href="#" className="become-vendor">Become a Vendor</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthSection;