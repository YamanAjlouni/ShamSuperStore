import { Link } from 'react-router-dom';
import { ExternalLink, Users, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './VendorsDriversManagers.scss';

const VendorsDriversManagers = () => {
    const { t } = useLanguage();

    return (
        <div className="vendors-drivers-managers-page">
            <div className="vendors-drivers-managers-container">
                <Link to="/delivery-drivers" className="back-link">
                    <ArrowLeft size={20} />
                    {t('drivers.vendorsDriversManagers.backLink')}
                </Link>

                <div className="vendors-drivers-managers-content">
                    <div className="vendors-drivers-managers-icon">
                        <Users size={80} />
                    </div>

                    <h1>{t('drivers.vendorsDriversManagers.heading')}</h1>

                    <p>
                        {t('drivers.vendorsDriversManagers.description')}
                    </p>

                    <a
                        href={t('drivers.vendorsDriversManagers.managementUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vendors-drivers-managers-btn"
                    >
                        <ExternalLink size={20} />
                        {t('drivers.vendorsDriversManagers.managementButton')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VendorsDriversManagers;