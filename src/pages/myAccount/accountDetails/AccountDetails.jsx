import React from 'react';
import './AccountDetails.scss';

const AccountDetails = () => {
    return (
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
};

export default AccountDetails;