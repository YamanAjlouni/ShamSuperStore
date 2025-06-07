import React, { useState } from 'react';
import './AccountDetails.scss';

const AccountDetails = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.displayName.trim()) {
            newErrors.displayName = 'Display name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation only if user is trying to change password
        if (formData.newPassword || formData.confirmPassword) {
            if (!formData.currentPassword) {
                newErrors.currentPassword = 'Current password is required to change password';
            }

            if (formData.newPassword.length < 8) {
                newErrors.newPassword = 'New password must be at least 8 characters long';
            }

            if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Handle success
            alert('Account details updated successfully!');
            
            // Clear password fields after successful update
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
            
        } catch (error) {
            console.error('Error updating account:', error);
            alert('Failed to update account details. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="account-details-content">
            <div className="section-header">
                <h3>Account Details</h3>
                <p>Update your personal information and manage your account security.</p>
            </div>
            
            <form className="account-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h4>Personal Information</h4>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="first-name">First name *</label>
                            <input 
                                type="text" 
                                id="first-name" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={errors.firstName ? 'error' : ''}
                                placeholder="Enter your first name"
                            />
                            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">Last name *</label>
                            <input 
                                type="text" 
                                id="last-name" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={errors.lastName ? 'error' : ''}
                                placeholder="Enter your last name"
                            />
                            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="display-name">Display name *</label>
                        <input 
                            type="text" 
                            id="display-name" 
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleInputChange}
                            className={errors.displayName ? 'error' : ''}
                            placeholder="Enter your display name"
                        />
                        <small>This will be how your name will be displayed in the account section and in reviews</small>
                        {errors.displayName && <span className="error-message">{errors.displayName}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="account-email">Email address *</label>
                        <input 
                            type="email" 
                            id="account-email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="Enter your email address"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                </div>

                <fieldset className="password-fieldset">
                    <legend>Password Security</legend>
                    <p className="fieldset-description">Leave password fields blank if you don't want to change your password.</p>
                    
                    <div className="form-group">
                        <label htmlFor="current-password">Current password</label>
                        <div className="password-input-wrapper">
                            <input 
                                type={showPasswords.current ? "text" : "password"}
                                id="current-password" 
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className={errors.currentPassword ? 'error' : ''}
                                placeholder="Enter your current password"
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('current')}
                                aria-label={showPasswords.current ? "Hide password" : "Show password"}
                            >
                                {showPasswords.current ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="new-password">New password</label>
                        <div className="password-input-wrapper">
                            <input 
                                type={showPasswords.new ? "text" : "password"}
                                id="new-password" 
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className={errors.newPassword ? 'error' : ''}
                                placeholder="Enter your new password"
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('new')}
                                aria-label={showPasswords.new ? "Hide password" : "Show password"}
                            >
                                {showPasswords.new ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        <small>Password must be at least 8 characters long</small>
                        {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm new password</label>
                        <div className="password-input-wrapper">
                            <input 
                                type={showPasswords.confirm ? "text" : "password"}
                                id="confirm-password" 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={errors.confirmPassword ? 'error' : ''}
                                placeholder="Confirm your new password"
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('confirm')}
                                aria-label={showPasswords.confirm ? "Hide password" : "Show password"}
                            >
                                {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>
                </fieldset>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className={`save-changes-btn ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Saving Changes...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                    <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => {
                            setFormData({
                                firstName: '',
                                lastName: '',
                                displayName: '',
                                email: '',
                                currentPassword: '',
                                newPassword: '',
                                confirmPassword: ''
                            });
                            setErrors({});
                        }}
                        disabled={isLoading}
                    >
                        Reset Form
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountDetails;