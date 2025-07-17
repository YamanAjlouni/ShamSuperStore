import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './OrderTracking.scss';

const OrderTracking = ({ onTrackOrder }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        orderId: '',
        billingEmail: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [trackingResult, setTrackingResult] = useState(null);

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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.orderId.trim()) {
            newErrors.orderId = t('myAccount.orderTracking.validation.orderIdRequired');
        }

        if (!formData.billingEmail.trim()) {
            newErrors.billingEmail = t('myAccount.orderTracking.validation.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.billingEmail)) {
            newErrors.billingEmail = t('myAccount.orderTracking.validation.emailInvalid');
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
        setTrackingResult(null);

        try {
            if (onTrackOrder) {
                const result = await onTrackOrder(formData.orderId, formData.billingEmail);
                setTrackingResult(result);
            } else {
                // Simulate tracking for demo
                setTimeout(() => {
                    setTrackingResult({
                        success: false,
                        message: t('myAccount.orderTracking.results.notFound')
                    });
                    setIsLoading(false);
                }, 2000);
                return;
            }
        } catch (error) {
            setTrackingResult({
                success: false,
                message: t('myAccount.orderTracking.results.error')
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="order-tracking-content">
            <h3>{t('myAccount.orderTracking.title')}</h3>

            <div className="tracking-form">
                <p>{t('myAccount.orderTracking.instructions')}</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="order-id">
                            {t('myAccount.orderTracking.form.orderIdLabel')}
                        </label>
                        <input
                            type="text"
                            id="order-id"
                            name="orderId"
                            value={formData.orderId}
                            onChange={handleInputChange}
                            placeholder={t('myAccount.orderTracking.form.orderIdPlaceholder')}
                            className={errors.orderId ? 'error' : ''}
                        />
                        {errors.orderId && (
                            <span className="error-message">{errors.orderId}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="billing-email">
                            {t('myAccount.orderTracking.form.billingEmailLabel')}
                        </label>
                        <input
                            type="email"
                            id="billing-email"
                            name="billingEmail"
                            value={formData.billingEmail}
                            onChange={handleInputChange}
                            placeholder={t('myAccount.orderTracking.form.billingEmailPlaceholder')}
                            className={errors.billingEmail ? 'error' : ''}
                        />
                        {errors.billingEmail && (
                            <span className="error-message">{errors.billingEmail}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="track-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                {t('myAccount.orderTracking.results.loading')}
                            </>
                        ) : (
                            t('myAccount.orderTracking.form.trackButton')
                        )}
                    </button>
                </form>

                {trackingResult && (
                    <div className={`tracking-result ${trackingResult.success ? 'success' : 'error'}`}>
                        <p>{trackingResult.message}</p>
                        {trackingResult.orderDetails && (
                            <div className="order-details">
                                {/* Display order tracking details here */}
                                <pre>{JSON.stringify(trackingResult.orderDetails, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTracking;