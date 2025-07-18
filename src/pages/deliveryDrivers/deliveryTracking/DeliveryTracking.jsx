import { Link } from 'react-router-dom';
import { ExternalLink, MapPin, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './DeliveryTracking.scss';

const DeliveryTracking = () => {
    const { t } = useLanguage();

    return (
        <div className="delivery-tracking-page">
            <div className="delivery-tracking-container">
                <Link to="/delivery-drivers" className="back-link">
                    <ArrowLeft size={20} />
                    {t('drivers.deliveryTracking.backLink')}
                </Link>

                <div className="delivery-tracking-content">
                    <div className="delivery-tracking-icon">
                        <MapPin size={80} />
                    </div>

                    <h1>{t('drivers.deliveryTracking.heading')}</h1>

                    <p>
                        {t('drivers.deliveryTracking.description')}
                    </p>

                    <a
                        href={t('drivers.deliveryTracking.trackingUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="delivery-tracking-btn"
                    >
                        <ExternalLink size={20} />
                        {t('drivers.deliveryTracking.trackingButton')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeliveryTracking;