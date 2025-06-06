import React from 'react';
import './LostPassword.scss';

const LostPassword = ({ setShowLogin }) => {
    return (
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
};

export default LostPassword;