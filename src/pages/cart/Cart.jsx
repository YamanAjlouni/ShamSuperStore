import { useState } from 'react';
import { Minus, Plus, X, RefreshCw, Heart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';
import { useCart } from '../../context/CartReducer';

const Cart = () => {
    const {
        items,
        updateQuantity,
        removeFromCart,
        getSubtotal,
        getTotalPrice
    } = useCart();

    const navigate = useNavigate();
    const [couponCode, setCouponCode] = useState('');
    const [savedItems, setSavedItems] = useState([]);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleSaveForLater = (item) => {
        setSavedItems(prev => [...prev, item]);
        removeFromCart(item.id);
    };

    const handleMoveToCart = (item) => {
        setSavedItems(prev => prev.filter(savedItem => savedItem.id !== item.id));
    };

    const handleRemoveSaved = (itemId) => {
        setSavedItems(prev => prev.filter(item => item.id !== itemId));
    };

    const handleApplyCoupon = () => {
        // Coupon logic would go here
        console.log('Applying coupon:', couponCode);
    };

    const handleRefreshCart = () => {
        // Refresh cart logic would go here
        console.log('Refreshing cart...');
    };

    const handleProceedToCheckout = () => {
        // Checkout logic would go here
        navigate('/checkout');
    };

    const shippingFee = 0; // Free shipping for now
    const totalAmount = getTotalPrice() + shippingFee;

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-content">
                    <div className="cart-main">
                        <h1 className="cart-title">Shopping Cart</h1>

                        {items.length === 0 ? (
                            <div className="cart-empty">
                                <div className="empty-cart-icon">🛒</div>
                                <h2>Your cart is empty</h2>
                                <p>Looks like you haven't added any items to your cart yet.</p>
                                <button
                                    className="continue-shopping-btn"
                                    onClick={() => navigate('/shop')}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="cart-table">
                                    <div className="cart-table-header">
                                        <div className="header-product">Product</div>
                                        <div className="header-price">Price</div>
                                        <div className="header-quantity">Quantity</div>
                                        <div className="header-subtotal">Subtotal</div>
                                    </div>

                                    <div className="cart-table-body">
                                        {items.map((item) => (
                                            <div key={item.id} className="cart-item">
                                                <div className="item-product">
                                                    <button
                                                        className="remove-btn"
                                                        onClick={() => removeFromCart(item.id)}
                                                        aria-label="Remove item"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                    <div className="product-image">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <div className="product-details">
                                                        <h3 className="product-name">{item.name}</h3>
                                                        <button
                                                            className="save-for-later-btn"
                                                            onClick={() => handleSaveForLater(item)}
                                                        >
                                                            <Heart size={14} />
                                                            <span>Save for later</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="item-price">
                                                    ${item.price.toFixed(2)}
                                                </div>

                                                <div className="item-quantity">
                                                    <div className="quantity-controls">
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

                                                <div className="item-subtotal">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="cart-actions">
                                    <div className="coupon-section">
                                        <input
                                            type="text"
                                            placeholder="Coupon code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="coupon-input"
                                        />
                                        <button
                                            className="apply-coupon-btn"
                                            onClick={handleApplyCoupon}
                                        >
                                            Apply coupon
                                        </button>
                                    </div>

                                    <button
                                        className="refresh-cart-btn"
                                        onClick={handleRefreshCart}
                                    >
                                        <RefreshCw size={16} />
                                        Refresh Cart
                                    </button>
                                </div>

                                {/* Saved for Later Section */}
                                {savedItems.length > 0 && (
                                    <div className="saved-items-section">
                                        <h2 className="saved-items-title">Saved for Later</h2>
                                        <div className="saved-items-grid">
                                            {savedItems.map((item) => (
                                                <div key={`saved-${item.id}`} className="saved-item">
                                                    <button
                                                        className="remove-saved-btn"
                                                        onClick={() => handleRemoveSaved(item.id)}
                                                        aria-label="Remove from saved"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                    <div className="saved-item-image">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <div className="saved-item-details">
                                                        <h4 className="saved-item-name">{item.name}</h4>
                                                        <div className="saved-item-price">${item.price.toFixed(2)}</div>
                                                        <button
                                                            className="move-to-cart-btn"
                                                            onClick={() => handleMoveToCart(item)}
                                                        >
                                                            Move to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="cart-sidebar">
                            <div className="cart-totals">
                                <h2 className="totals-title">Cart totals</h2>

                                <div className="totals-row">
                                    <span>Subtotal</span>
                                    <span>${getSubtotal().toFixed(2)}</span>
                                </div>

                                <div className="shipping-section">
                                    <div className="shipping-header">
                                        <span>Shipping</span>
                                    </div>
                                    <div className="shipping-info">
                                        <p>No shipping options were found for danaes, TX, 43243, Syria.</p>
                                        <button className="change-address-btn">
                                            <MapPin size={14} />
                                            Enter a different address
                                        </button>
                                    </div>
                                </div>

                                <div className="totals-row total-row">
                                    <span>Total</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>

                                <button
                                    className="checkout-btn"
                                    onClick={handleProceedToCheckout}
                                >
                                    Proceed to checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;