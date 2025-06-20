import { useEffect } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartReducer';
import './SidebarCart.scss';

const SidebarCart = () => {
    const {
        items,
        isOpen,
        closeCart,
        updateQuantity,
        removeFromCart,
        getSubtotal,
        getTotalPrice
    } = useCart();
    const navigate = useNavigate();

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close cart when clicking outside
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeCart();
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleViewCart = () => {
        closeCart();
        navigate('/cart');
    };

    const handleCheckout = () => {
        closeCart();
        // Add checkout logic here
        console.log('Proceeding to checkout...');
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`sidebar-cart-overlay ${isOpen ? 'sidebar-cart-overlay-active' : ''}`}
                onClick={handleOverlayClick}
            />

            {/* Sidebar */}
            <div className={`sidebar-cart ${isOpen ? 'sidebar-cart-open' : ''}`}>
                <div className="sidebar-cart-header">
                    <h3>Shopping Cart</h3>
                    <button
                        className="sidebar-cart-close"
                        onClick={closeCart}
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="sidebar-cart-content">
                    {items.length === 0 ? (
                        <div className="sidebar-cart-empty">
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            <div className="sidebar-cart-items">
                                {items.map((item) => (
                                    <div key={item.id} className="sidebar-cart-item">
                                        <div className="sidebar-cart-item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>

                                        <div className="sidebar-cart-item-details">
                                            <h4 className="sidebar-cart-item-name">{item.name}</h4>
                                            <div className="sidebar-cart-item-price">${item.price.toFixed(2)}</div>

                                            <div className="sidebar-cart-item-controls">
                                                <div className="sidebar-cart-item-quantity">
                                                    <button
                                                        className="quantity-btn"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="quantity-value">{item.quantity}</span>
                                                    <button
                                                        className="quantity-btn"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="sidebar-cart-item-remove"
                                            onClick={() => removeFromCart(item.id)}
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="sidebar-cart-summary">
                                <div className="sidebar-cart-subtotal">
                                    <span>Sub Total</span>
                                    <span>${getSubtotal().toFixed(2)}</span>
                                </div>

                                <div className="sidebar-cart-shipping">
                                    <span>Shipping Calculate</span>
                                    <span>$0.00</span>
                                </div>

                                <div className="sidebar-cart-total">
                                    <span>Total</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                </div>

                                <div className="sidebar-cart-promo">
                                    <input
                                        type="text"
                                        placeholder="Enter your Promo Code"
                                        className="promo-input"
                                    />
                                    <button className="promo-btn">Apply</button>
                                </div>

                                <div className="sidebar-cart-actions">
                                    <button
                                        className="view-cart-btn"
                                        onClick={handleViewCart}
                                    >
                                        View cart
                                    </button>
                                    <button
                                        className="checkout-btn"
                                        onClick={handleCheckout}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default SidebarCart;