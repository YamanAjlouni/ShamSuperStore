import { useLanguage } from '../../../context/LanguageContext';
import './Orders.scss';

const Orders = ({ orders = [], onBrowseProducts, onViewOrder, onDownloadInvoice, onCancelOrder }) => {
    const { t } = useLanguage();

    const getStatusBadge = (status) => {
        return (
            <span className={`status-badge ${status.toLowerCase()}`}>
                {t(`myAccount.orders.status.${status.toLowerCase()}`)}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formatPrice = (price) => {
        return `$${price.toFixed(2)}`;
    };

    return (
        <div className="orders-content">
            <h3>{t('myAccount.orders.title')}</h3>

            {orders.length > 0 ? (
                <div className="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>{t('myAccount.orders.table.headers.order')}</th>
                                <th>{t('myAccount.orders.table.headers.date')}</th>
                                <th>{t('myAccount.orders.table.headers.status')}</th>
                                <th>{t('myAccount.orders.table.headers.total')}</th>
                                <th>{t('myAccount.orders.table.headers.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td>{formatDate(order.date)}</td>
                                    <td>{getStatusBadge(order.status)}</td>
                                    <td>{formatPrice(order.total)}</td>
                                    <td>
                                        <div className="order-actions">
                                            <button
                                                className="action-btn view"
                                                onClick={() => onViewOrder && onViewOrder(order.id)}
                                                title={t('myAccount.orders.actions.viewOrder')}
                                            >
                                                <span className="icon">👁</span>
                                                {t('myAccount.orders.actions.viewOrder')}
                                            </button>
                                            {order.status === 'completed' && (
                                                <button
                                                    className="action-btn download"
                                                    onClick={() => onDownloadInvoice && onDownloadInvoice(order.id)}
                                                    title={t('myAccount.orders.actions.downloadInvoice')}
                                                >
                                                    <span className="icon">📄</span>
                                                    {t('myAccount.orders.actions.downloadInvoice')}
                                                </button>
                                            )}
                                            {(order.status === 'pending' || order.status === 'processing') && (
                                                <button
                                                    className="action-btn cancel"
                                                    onClick={() => onCancelOrder && onCancelOrder(order.id)}
                                                    title={t('myAccount.orders.actions.cancelOrder')}
                                                >
                                                    <span className="icon">❌</span>
                                                    {t('myAccount.orders.actions.cancelOrder')}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h4>{t('myAccount.orders.emptyState.title')}</h4>
                    <p>{t('myAccount.orders.emptyState.description')}</p>
                    <a
                        href="#"
                        className="browse-products"
                        onClick={(e) => {
                            e.preventDefault();
                            onBrowseProducts && onBrowseProducts();
                        }}
                    >
                        <span className="icon">🛍️</span>
                        {t('myAccount.orders.actions.browseProducts')}
                    </a>
                </div>
            )}

            {orders.length === 0 && (
                <div className="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>{t('myAccount.orders.table.headers.order')}</th>
                                <th>{t('myAccount.orders.table.headers.date')}</th>
                                <th>{t('myAccount.orders.table.headers.status')}</th>
                                <th>{t('myAccount.orders.table.headers.total')}</th>
                                <th>{t('myAccount.orders.table.headers.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="5">{t('myAccount.orders.emptyState.message')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Orders;