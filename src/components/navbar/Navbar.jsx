import { useState, useRef, useEffect, useCallback } from 'react';
import { Mail, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import shamSuperStoreLogo from '../../assets/images/shamSuperStoreLogo.jpg'

const Navbar = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const timeoutRefs = useRef({});
    const navRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpenDropdowns({});
                clearAllTimeouts();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            clearAllTimeouts();
        };
    }, []);

    const clearAllTimeouts = useCallback(() => {
        Object.values(timeoutRefs.current).forEach(timeout => clearTimeout(timeout));
        timeoutRefs.current = {};
    }, []);

    const clearTimeout = useCallback((key) => {
        if (timeoutRefs.current[key]) {
            clearTimeout(timeoutRefs.current[key]);
            delete timeoutRefs.current[key];
        }
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            setOpenDropdowns({});
        }
    };

    const handleMouseEnter = useCallback((dropdownKey) => {
        // Clear any pending close timeout for this dropdown
        clearTimeout(dropdownKey);

        // Determine the dropdown hierarchy
        const isMainDropdown = ['shop', 'account', 'sellers', 'delivery', 'language'].includes(dropdownKey);
        const isSubDropdown = ['computer', 'electronics', 'smart-home', 'furniture', 'clothes', 'shoes', 'home-garden', 'sports', 'babies-kids', 'beauty-health', 'bags-luggage', 'entertainment', 'food-grocery', 'handmade', 'pets'].includes(dropdownKey);

        if (isMainDropdown) {
            // Close all dropdowns and open only this main dropdown
            setOpenDropdowns({ [dropdownKey]: true });
        } else if (isSubDropdown) {
            // Keep the shop dropdown open and add this subdropdown
            setOpenDropdowns(prev => {
                const newState = { shop: true, [dropdownKey]: true };
                return newState;
            });
        } else {
            // For nested dropdowns (third level), keep parent hierarchy
            setOpenDropdowns(prev => {
                // Find which main category this belongs to
                const parentDropdown = findParentDropdown(dropdownKey);
                if (parentDropdown) {
                    return {
                        shop: true,
                        [parentDropdown]: true,
                        [dropdownKey]: true
                    };
                }
                return {
                    ...prev,
                    [dropdownKey]: true
                };
            });
        }
    }, [clearTimeout]);

    const handleMouseLeave = useCallback((dropdownKey) => {
        // Add a small delay before closing to prevent flickering
        timeoutRefs.current[dropdownKey] = setTimeout(() => {
            setOpenDropdowns(prev => {
                const newState = { ...prev };
                delete newState[dropdownKey];
                
                // If closing a main dropdown, also close its children
                if (dropdownKey === 'shop') {
                    Object.keys(newState).forEach(key => {
                        if (key !== 'shop') {
                            delete newState[key];
                        }
                    });
                }
                
                return newState;
            });
        }, 150); // 150ms delay
    }, []);

    // Helper function to find parent dropdown for nested items
    const findParentDropdown = (dropdownKey) => {
        const nestedMapping = {
            'computer-components': 'computer',
            'wearable': 'electronics',
            'electronic-office': 'electronics',
            'bedroom': 'furniture',
            'kitchen': 'home-garden',
            'bath': 'home-garden',
            'home-repair': 'home-garden'
        };
        return nestedMapping[dropdownKey];
    };

    const handleMobileDropdownClick = (dropdownKey, event) => {
        if (window.innerWidth <= 768) {
            event.preventDefault();
            event.stopPropagation();

            setOpenDropdowns(prev => ({
                ...prev,
                [dropdownKey]: !prev[dropdownKey]
            }));
        }
    };

    const isDropdownOpen = (dropdownKey) => {
        return openDropdowns[dropdownKey] || false;
    };

    // Handle login button click
    const handleLoginClick = () => {
        navigate('/my-account');
    };

    // Dropdown component for reusability
    const DropdownItem = ({ to, children, dropdownKey, onMouseEnter, onMouseLeave, onClick, hasSubmenu = false, submenu = null }) => (
        <li
            className={hasSubmenu ? "ecommerce-nav-dropdown-item-has-submenu" : ""}
            onMouseEnter={() => hasSubmenu && onMouseEnter(dropdownKey)}
            onMouseLeave={() => hasSubmenu && onMouseLeave(dropdownKey)}
        >
            <Link
                to={to}
                onClick={(e) => hasSubmenu && onClick(dropdownKey, e)}
            >
                {children}
                {hasSubmenu && <ChevronDown size={14} className="ecommerce-nav-arrow-right" />}
            </Link>
            {hasSubmenu && submenu && (
                <div className={`ecommerce-nav-submenu ${isDropdownOpen(dropdownKey) ? 'ecommerce-nav-submenu-active' : ''}`}>
                    {submenu}
                </div>
            )}
        </li>
    );

    // Nested dropdown component
    const NestedDropdownItem = ({ to, children, dropdownKey, onMouseEnter, onMouseLeave, onClick, nestedSubmenu = null }) => (
        <li
            className="ecommerce-nav-submenu-item-has-submenu"
            onMouseEnter={() => onMouseEnter(dropdownKey)}
            onMouseLeave={() => onMouseLeave(dropdownKey)}
        >
            <Link
                to={to}
                onClick={(e) => onClick(dropdownKey, e)}
            >
                {children}
                <ChevronDown size={12} className="ecommerce-nav-arrow-right" />
            </Link>
            {nestedSubmenu && (
                <div className={`ecommerce-nav-submenu-nested ${isDropdownOpen(dropdownKey) ? 'ecommerce-nav-submenu-nested-active' : ''}`}>
                    {nestedSubmenu}
                </div>
            )}
        </li>
    );

    return (
        <nav className="ecommerce-nav" ref={navRef}>
            <div className="ecommerce-nav-top">
                <div className="ecommerce-nav-container">
                    <div className="ecommerce-nav-logo">
                        <Link to="/">
                            <img src={shamSuperStoreLogo} alt="Sham Super Store" className="ecommerce-nav-logo-img" />
                        </Link>
                    </div>

                    <div className="ecommerce-nav-top-items">
                        <div className="ecommerce-nav-email">
                            <Mail size={16} />
                            <span>support@shamsuperstore.com</span>
                        </div>

                        <div className="ecommerce-nav-login" onClick={handleLoginClick}>
                            <User size={16} />
                            <span>Login</span>
                        </div>

                        <button className="ecommerce-nav-seller-btn">
                            Become a seller
                        </button>
                    </div>

                    <button className="ecommerce-nav-mobile-toggle" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <div className="ecommerce-nav-border-container">
                <div className="ecommerce-nav-border"></div>
            </div>

            <div className="ecommerce-nav-bottom">
                <div className="ecommerce-nav-container">
                    <ul className={`ecommerce-nav-menu ${isMobileMenuOpen ? 'ecommerce-nav-menu-open' : ''}`}>
                        <li className="ecommerce-nav-item">
                            <Link to="/" className="ecommerce-nav-link">Home</Link>
                        </li>

                        <li
                            className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                            onMouseEnter={() => handleMouseEnter('shop')}
                            onMouseLeave={() => handleMouseLeave('shop')}
                        >
                            <Link
                                to="/shop"
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('shop', e)}
                            >
                                Shop <ChevronDown size={16} />
                            </Link>
                            <div className={`ecommerce-nav-dropdown ${isDropdownOpen('shop') ? 'ecommerce-nav-dropdown-active' : ''}`}>
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><Link to="/shop">All Categories</Link></li>
                                    <li><Link to="/shop/category/1">Computer</Link></li>
                                    <li><Link to="/shop/category/2">Electronics</Link></li>
                                    <li><Link to="/shop/category/3">Smart Home</Link></li>
                                    <li><Link to="/shop/category/4">Home - Garden</Link></li>
                                    <li><Link to="/shop/category/5">Furniture</Link></li>
                                    <li><Link to="/shop/category/6">Clothes</Link></li>
                                    <li><Link to="/shop/category/7">Shoes</Link></li>
                                    <li><Link to="/shop/category/8">Babies - Kids - Children Supplies</Link></li>
                                    <li><Link to="/shop/category/9">Teen Supplies</Link></li>
                                    <li><Link to="/shop/category/10">Beauty - Health</Link></li>
                                    <li><Link to="/shop/category/11">Sports - Outdoor Activities</Link></li>
                                    <li><Link to="/shop/category/12">Food Grocery</Link></li>
                                    <li><Link to="/shop/category/13">Pets Supplies</Link></li>
                                    <li><Link to="/shop/category/14">Entertainment</Link></li>
                                    <li><Link to="/shop/category/15">Handmade</Link></li>
                                    <li><Link to="/shop/category/16">School - Office Supplies</Link></li>
                                    <li><Link to="/shop/category/17">Books</Link></li>
                                    <li><Link to="/shop/category/18">Cars</Link></li>
                                    <li><Link to="/shop/category/19">Industrial Scientific Materials</Link></li>
                                    <li><Link to="/shop/category/20">Bags - Luggage</Link></li>
                                </ul>
                            </div>
                        </li>

                        <li
                            className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                            onMouseEnter={() => handleMouseEnter('account')}
                            onMouseLeave={() => handleMouseLeave('account')}
                        >
                            <Link
                                to="/my-account"
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('account', e)}
                            >
                                My Account <ChevronDown size={16} />
                            </Link>
                            <div className={`ecommerce-nav-dropdown ${isDropdownOpen('account') ? 'ecommerce-nav-dropdown-active' : ''}`}>
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><Link to="/my-account">Dashboard</Link></li>
                                    <li><Link to="/my-account">Orders</Link></li>
                                    <li><Link to="/my-account">Order Tracking</Link></li>
                                    <li><Link to="/my-account">Downloads</Link></li>
                                    <li><Link to="/my-account">Addresses</Link></li>
                                    <li><Link to="/my-account">Payment Methods</Link></li>
                                    <li><Link to="/my-account">Account Details</Link></li>
                                    <li><Link to="/my-account">Wishlist</Link></li>
                                    <li><Link to="/my-account">Following</Link></li>
                                    <li><Link to="/my-account">Support Tickets</Link></li>
                                    <li><Link to="/my-account">Inquiries</Link></li>
                                    <li><Link to="/my-account">Lost Password</Link></li>
                                </ul>
                            </div>
                        </li>

                        <li className="ecommerce-nav-item">
                            <Link to="/about" className="ecommerce-nav-link">About</Link>
                        </li>

                        <li className="ecommerce-nav-item">
                            <Link to="/contact" className="ecommerce-nav-link">Contact Us</Link>
                        </li>

                        <li
                            className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                            onMouseEnter={() => handleMouseEnter('sellers')}
                            onMouseLeave={() => handleMouseLeave('sellers')}
                        >
                            <Link
                                to="/sellers"
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('sellers', e)}
                            >
                                Sellers <ChevronDown size={16} />
                            </Link>
                            <div className={`ecommerce-nav-dropdown ${isDropdownOpen('sellers') ? 'ecommerce-nav-dropdown-active' : ''}`}>
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><Link to="/vendor-registration">Vendor Registration</Link></li>
                                    <li><Link to="/vendor-membership">Vendor Membership</Link></li>
                                    <li><Link to="/store-manager">Store Manager</Link></li>
                                    <li><Link to="/vendors-drivers-manager">Vendors Drivers Manager</Link></li>
                                    <li><Link to="/stores-list">Stores List</Link></li>
                                </ul>
                            </div>
                        </li>

                        <li
                            className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                            onMouseEnter={() => handleMouseEnter('delivery')}
                            onMouseLeave={() => handleMouseLeave('delivery')}
                        >
                            <Link
                                to="/delivery-drivers"
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('delivery', e)}
                            >
                                Delivery Drivers <ChevronDown size={16} />
                            </Link>
                            <div className={`ecommerce-nav-dropdown ${isDropdownOpen('delivery') ? 'ecommerce-nav-dropdown-active' : ''}`}>
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><Link to="/delivery-drivers">Delivery Drivers</Link></li>
                                    <li><Link to="/delivery-drivers-manager">Delivery Drivers Manager</Link></li>
                                    <li><Link to="/vendors-drivers-managers">Vendors Drivers Managers</Link></li>
                                    <li><Link to="/delivery-tracking">Delivery Tracking</Link></li>
                                    <li><Link to="/delivery-drivers-app">Delivery Drivers App</Link></li>
                                </ul>
                            </div>
                        </li>

                        <li className="ecommerce-nav-item ecommerce-nav-item-cart">
                            <Link to="/cart" className="ecommerce-nav-link ecommerce-nav-link-orange">
                                <ShoppingCart size={20} />
                            </Link>
                        </li>

                        <li
                            className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                            onMouseEnter={() => handleMouseEnter('language')}
                            onMouseLeave={() => handleMouseLeave('language')}
                        >
                            <button
                                className="ecommerce-nav-link ecommerce-nav-link-orange"
                                onClick={(e) => handleMobileDropdownClick('language', e)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
                            >
                                English <ChevronDown size={16} />
                            </button>
                            <div className={`ecommerce-nav-dropdown ${isDropdownOpen('language') ? 'ecommerce-nav-dropdown-active' : ''}`}>
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><Link to="/ar">Arabic</Link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { Mail, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
// import './Navbar.scss';
// import { Link } from 'react-router-dom';
// import shamSuperStoreLogo from '../../assets/images/shamSuperStoreLogo.jpg'

// const Navbar = () => {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [openDropdowns, setOpenDropdowns] = useState({});
//     const timeoutRefs = useRef({});
//     const navRef = useRef(null);

//     // Close dropdowns when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (navRef.current && !navRef.current.contains(event.target)) {
//                 setOpenDropdowns({});
//                 clearAllTimeouts();
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//             clearAllTimeouts();
//         };
//     }, []);

//     const clearAllTimeouts = useCallback(() => {
//         Object.values(timeoutRefs.current).forEach(timeout => clearTimeout(timeout));
//         timeoutRefs.current = {};
//     }, []);

//     const clearTimeout = useCallback((key) => {
//         if (timeoutRefs.current[key]) {
//             clearTimeout(timeoutRefs.current[key]);
//             delete timeoutRefs.current[key];
//         }
//     }, []);

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen);
//         if (!isMobileMenuOpen) {
//             setOpenDropdowns({});
//         }
//     };

//     const handleMouseEnter = useCallback((dropdownKey) => {
//         // Clear any pending close timeout for this dropdown
//         clearTimeout(dropdownKey);

//         // Determine the dropdown hierarchy
//         const isMainDropdown = ['shop', 'account', 'sellers', 'delivery', 'language'].includes(dropdownKey);
//         const isSubDropdown = ['computer', 'electronics', 'smart-home', 'furniture', 'clothes', 'shoes', 'home-garden', 'sports', 'babies-kids', 'beauty-health', 'bags-luggage', 'entertainment', 'food-grocery', 'handmade', 'pets'].includes(dropdownKey);

//         if (isMainDropdown) {
//             // Close all dropdowns and open only this main dropdown
//             setOpenDropdowns({ [dropdownKey]: true });
//         } else if (isSubDropdown) {
//             // Keep the shop dropdown open and add this subdropdown
//             setOpenDropdowns(prev => {
//                 const newState = { shop: true, [dropdownKey]: true };
//                 return newState;
//             });
//         } else {
//             // For nested dropdowns (third level), keep parent hierarchy
//             setOpenDropdowns(prev => {
//                 // Find which main category this belongs to
//                 const parentDropdown = findParentDropdown(dropdownKey);
//                 if (parentDropdown) {
//                     return {
//                         shop: true,
//                         [parentDropdown]: true,
//                         [dropdownKey]: true
//                     };
//                 }
//                 return {
//                     ...prev,
//                     [dropdownKey]: true
//                 };
//             });
//         }
//     }, [clearTimeout]);

//     const handleMouseLeave = useCallback((dropdownKey) => {
//         // Add a small delay before closing to prevent flickering
//         timeoutRefs.current[dropdownKey] = setTimeout(() => {
//             setOpenDropdowns(prev => {
//                 const newState = { ...prev };
//                 delete newState[dropdownKey];
                
//                 // If closing a main dropdown, also close its children
//                 if (dropdownKey === 'shop') {
//                     Object.keys(newState).forEach(key => {
//                         if (key !== 'shop') {
//                             delete newState[key];
//                         }
//                     });
//                 }
                
//                 return newState;
//             });
//         }, 150); // 150ms delay
//     }, []);

//     // Helper function to find parent dropdown for nested items
//     const findParentDropdown = (dropdownKey) => {
//         const nestedMapping = {
//             'computer-components': 'computer',
//             'wearable': 'electronics',
//             'electronic-office': 'electronics',
//             'bedroom': 'furniture',
//             'kitchen': 'home-garden',
//             'bath': 'home-garden',
//             'home-repair': 'home-garden'
//         };
//         return nestedMapping[dropdownKey];
//     };

//     const handleMobileDropdownClick = (dropdownKey, event) => {
//         if (window.innerWidth <= 768) {
//             event.preventDefault();
//             event.stopPropagation();

//             setOpenDropdowns(prev => ({
//                 ...prev,
//                 [dropdownKey]: !prev[dropdownKey]
//             }));
//         }
//     };

//     const isDropdownOpen = (dropdownKey) => {
//         return openDropdowns[dropdownKey] || false;
//     };

//     // Dropdown component for reusability
//     const DropdownItem = ({ to, children, dropdownKey, onMouseEnter, onMouseLeave, onClick, hasSubmenu = false, submenu = null }) => (
//         <li
//             className={hasSubmenu ? "ecommerce-nav-dropdown-item-has-submenu" : ""}
//             onMouseEnter={() => hasSubmenu && onMouseEnter(dropdownKey)}
//             onMouseLeave={() => hasSubmenu && onMouseLeave(dropdownKey)}
//         >
//             <Link
//                 to={to}
//                 onClick={(e) => hasSubmenu && onClick(dropdownKey, e)}
//             >
//                 {children}
//                 {hasSubmenu && <ChevronDown size={14} className="ecommerce-nav-arrow-right" />}
//             </Link>
//             {hasSubmenu && submenu && (
//                 <div className={`ecommerce-nav-submenu ${isDropdownOpen(dropdownKey) ? 'ecommerce-nav-submenu-active' : ''}`}>
//                     {submenu}
//                 </div>
//             )}
//         </li>
//     );

//     // Nested dropdown component
//     const NestedDropdownItem = ({ to, children, dropdownKey, onMouseEnter, onMouseLeave, onClick, nestedSubmenu = null }) => (
//         <li
//             className="ecommerce-nav-submenu-item-has-submenu"
//             onMouseEnter={() => onMouseEnter(dropdownKey)}
//             onMouseLeave={() => onMouseLeave(dropdownKey)}
//         >
//             <Link
//                 to={to}
//                 onClick={(e) => onClick(dropdownKey, e)}
//             >
//                 {children}
//                 <ChevronDown size={12} className="ecommerce-nav-arrow-right" />
//             </Link>
//             {nestedSubmenu && (
//                 <div className={`ecommerce-nav-submenu-nested ${isDropdownOpen(dropdownKey) ? 'ecommerce-nav-submenu-nested-active' : ''}`}>
//                     {nestedSubmenu}
//                 </div>
//             )}
//         </li>
//     );

//     return (
//         <nav className="ecommerce-nav" ref={navRef}>
//             <div className="ecommerce-nav-top">
//                 <div className="ecommerce-nav-container">
//                     <div className="ecommerce-nav-logo">
//                         <img src={shamSuperStoreLogo} alt="Sham Super Store" className="ecommerce-nav-logo-img" />
//                     </div>

//                     <div className="ecommerce-nav-top-items">
//                         <div className="ecommerce-nav-email">
//                             <Mail size={16} />
//                             <span>support@shamsuperstore.com</span>
//                         </div>

//                         <div className="ecommerce-nav-login">
//                             <User size={16} />
//                             <span>Login</span>
//                         </div>

//                         <button className="ecommerce-nav-seller-btn">
//                             Become a seller
//                         </button>
//                     </div>

//                     <button className="ecommerce-nav-mobile-toggle" onClick={toggleMobileMenu}>
//                         {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//                     </button>
//                 </div>
//             </div>

//             <div className="ecommerce-nav-border-container">
//                 <div className="ecommerce-nav-border"></div>
//             </div>

//             <div className="ecommerce-nav-bottom">
//                 <div className="ecommerce-nav-container">
//                     <ul className={`ecommerce-nav-menu ${isMobileMenuOpen ? 'ecommerce-nav-menu-open' : ''}`}>
//                         <li className="ecommerce-nav-item">
//                             <Link to="/" className="ecommerce-nav-link">Home</Link>
//                         </li>

//                         <li
//                             className="ecommerce-nav-item ecommerce-nav-item-dropdown"
//                             onMouseEnter={() => handleMouseEnter('shop')}
//                             onMouseLeave={() => handleMouseLeave('shop')}
//                         >
//                             <Link
//                                 to="/shop"
//                                 className="ecommerce-nav-link"
//                                 onClick={(e) => handleMobileDropdownClick('shop', e)}
//                             >
//                                 Shop <ChevronDown size={16} />
//                             </Link>
//                             <div className={`ecommerce-nav-dropdown ${isDropdownOpen('shop') ? 'ecommerce-nav-dropdown-active' : ''}`}>
//                                 <ul className="ecommerce-nav-dropdown-menu">
//                                     <li><Link to="/shop">All Categories</Link></li>

//                                     <DropdownItem
//                                         to="/computer"
//                                         dropdownKey="computer"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/desktop-computer">Desktop Computer</Link></li>
//                                                 <li><Link to="/tablet-pc">Tablet PC</Link></li>
//                                                 <li><Link to="/computer-monitor">Computer Monitor</Link></li>
//                                                 <li><Link to="/mouse-keyboard">Computer Mouse - Keyboard</Link></li>
//                                                 <li><Link to="/computer-software">Computer Software</Link></li>
//                                                 <li><Link to="/computer-accessories">Computer Accessories</Link></li>

//                                                 <NestedDropdownItem
//                                                     to="/computer-components"
//                                                     dropdownKey="computer-components"
//                                                     onMouseEnter={handleMouseEnter}
//                                                     onMouseLeave={handleMouseLeave}
//                                                     onClick={handleMobileDropdownClick}
//                                                     nestedSubmenu={
//                                                         <ul>
//                                                             <li><Link to="/cpu">CPU</Link></li>
//                                                             <li><Link to="/motherboard">Motherboard</Link></li>
//                                                             <li><Link to="/harddisk">Hard Disk</Link></li>
//                                                             <li><Link to="/memory">Memory</Link></li>
//                                                             <li><Link to="/graphic-card">Graphic Card</Link></li>
//                                                             <li><Link to="/power-supply">Power Supply</Link></li>
//                                                             <li><Link to="/computer-case">Computer Case</Link></li>
//                                                         </ul>
//                                                     }
//                                                 >
//                                                     Computer Components
//                                                 </NestedDropdownItem>
//                                             </ul>
//                                         }
//                                     >
//                                         Computer
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/electronics"
//                                         dropdownKey="electronics"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/mobile-smartphone">Mobile - Smart Phone</Link></li>

//                                                 <NestedDropdownItem
//                                                     to="/wearable-technology"
//                                                     dropdownKey="wearable"
//                                                     onMouseEnter={handleMouseEnter}
//                                                     onMouseLeave={handleMouseLeave}
//                                                     onClick={handleMobileDropdownClick}
//                                                     nestedSubmenu={
//                                                         <ul>
//                                                             <li><Link to="/smart-watches">Smart Watches</Link></li>
//                                                             <li><Link to="/headphones">Headphones</Link></li>
//                                                         </ul>
//                                                     }
//                                                 >
//                                                     Wearable Technology
//                                                 </NestedDropdownItem>

//                                                 <li><Link to="/tv-video">TV and Video</Link></li>
//                                                 <li><Link to="/speakers">Speakers</Link></li>
//                                                 <li><Link to="/cameras-pictures">Cameras - Pictures</Link></li>
//                                                 <li><Link to="/movies-music">Movies - Music</Link></li>
//                                                 <li><Link to="/musical-instruments">Musical Instruments</Link></li>

//                                                 <NestedDropdownItem
//                                                     to="/electronic-office"
//                                                     dropdownKey="electronic-office"
//                                                     onMouseEnter={handleMouseEnter}
//                                                     onMouseLeave={handleMouseLeave}
//                                                     onClick={handleMobileDropdownClick}
//                                                     nestedSubmenu={
//                                                         <ul>
//                                                             <li><Link to="/copiers-printers-ink">Copiers - Printers - Ink</Link></li>
//                                                         </ul>
//                                                     }
//                                                 >
//                                                     Electronic Office Equipment
//                                                 </NestedDropdownItem>
//                                             </ul>
//                                         }
//                                     >
//                                         Electronics
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/smart-home"
//                                         dropdownKey="smart-home"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/smart-lock">Smart Lock</Link></li>
//                                                 <li><Link to="/smart-lighting">Smart Lighting</Link></li>
//                                                 <li><Link to="/vacuums-mops">Vacuums - Mops</Link></li>
//                                                 <li><Link to="/plugs-outlets">Plugs - Outlets</Link></li>
//                                                 <li><Link to="/wifi-networking">WiFi - Networking</Link></li>
//                                                 <li><Link to="/detectors-sensors">Detectors - Sensors</Link></li>
//                                                 <li><Link to="/security-cameras">Security Cameras - Systems</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Smart Home
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/furniture"
//                                         dropdownKey="furniture"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/chair">Chair</Link></li>
//                                                 <li><Link to="/sofa">Sofa</Link></li>
//                                                 <li><Link to="/living-room">Living Room</Link></li>
//                                                 <li><Link to="/guest-room">Guest Room</Link></li>
//                                                 <li><Link to="/kids-room">Kids - Children Room</Link></li>
//                                                 <li><Link to="/dining-room">Dining Room</Link></li>

//                                                 <NestedDropdownItem
//                                                     to="/bedroom"
//                                                     dropdownKey="bedroom"
//                                                     onMouseEnter={handleMouseEnter}
//                                                     onMouseLeave={handleMouseLeave}
//                                                     onClick={handleMobileDropdownClick}
//                                                     nestedSubmenu={
//                                                         <ul>
//                                                             <li><Link to="/mattress">Mattress</Link></li>
//                                                         </ul>
//                                                     }
//                                                 >
//                                                     Bedroom
//                                                 </NestedDropdownItem>

//                                                 <li><Link to="/study-office">Study - Home Office</Link></li>
//                                                 <li><Link to="/outdoor-furniture">Outdoor Furniture</Link></li>
//                                                 <li><Link to="/antiques">Antiques - Fine Arts</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Furniture
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/clothes"
//                                         dropdownKey="clothes"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/womens-clothing">Women's Clothing</Link></li>
//                                                 <li><Link to="/mens-clothing">Men's Clothing</Link></li>
//                                                 <li><Link to="/girls-clothing">Girl's Clothing</Link></li>
//                                                 <li><Link to="/boys-clothing">Boy's Clothing</Link></li>
//                                                 <li><Link to="/childrens-clothing">Children's Clothing</Link></li>
//                                                 <li><Link to="/baby-clothing">Infant's - Baby's Clothing</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Clothes
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/shoes"
//                                         dropdownKey="shoes"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/womens-shoes">Women's Shoes</Link></li>
//                                                 <li><Link to="/mens-shoes">Men's Shoes</Link></li>
//                                                 <li><Link to="/girls-shoes">Girl's Shoes</Link></li>
//                                                 <li><Link to="/boys-shoes">Boy's Shoes</Link></li>
//                                                 <li><Link to="/childrens-shoes">Children's Shoes</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Shoes
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/home-garden"
//                                         dropdownKey="home-garden"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/home-appliances">Home Appliances - Electrical Tools</Link></li>

//                                                 <NestedDropdownItem
//                                                     to="/kitchen"
//                                                     dropdownKey="kitchen"
//                                                     onMouseEnter={handleMouseEnter}
//                                                     onMouseLeave={handleMouseLeave}
//                                                     onClick={handleMobileDropdownClick}
//                                                     nestedSubmenu={
//                                                         <ul>
//                                                             <li><Link to="/cooking-appliances">Cooking Appliances</Link></li>
//                                                             <li><Link to="/kitchen-dining-appliances">Kitchen - Dining Room Appliances</Link></li>
//                                                             <li><Link to="/kitchen-supplies">Kitchen Other Supplies</Link></li>
//                                                         </ul>
//                                                     }
//                                                 >
//                                                     Kitchen
//                                                 </NestedDropdownItem>

//                                                 <NestedDropdownItem
//                                                     to="/bath"
//                                                     dropdownKey="bath"
//                                                     onMouseEnter={handleMouseEnter}
//                                                     onMouseLeave={handleMouseLeave}
//                                                     onClick={handleMobileDropdownClick}
//                                                     nestedSubmenu={
//                                                         <ul>
//                                                             <li><Link to="/bathroom-fixtures">Bathroom Fixtures</Link></li>
//                                                             <li><Link to="/bathroom-supplies">Bathroom Supplies</Link></li>
//                                                         </ul>
//                                                     }
//                                                 >
//                                                     Bath
//                                                 </NestedDropdownItem>

//                                                 <li><Link to="/laundry-supplies">Laundry Supplies</Link></li>
//                                                 <li><Link to="/heating-cooling">Heating - Cooling</Link></li>
//                                                 <li><Link to="/lighting">Lighting</Link></li>
//                                                 <li><Link to="/home-audio-video">Home Audio - Video Systems</Link></li>
//                                                 <li><Link to="/storage-organization">Storage - Organization Supplies</Link></li>

//                                                 <NestedDropdownItem
//                                                     to="/home-repair"
//                                                     dropdownKey="home-repair"
//                                                     onMouseEnter={handleMouseEnter}
//                                                     onMouseLeave={handleMouseLeave}
//                                                     onClick={handleMobileDropdownClick}
//                                                     nestedSubmenu={
//                                                         <ul>
//                                                             <li><Link to="/hand-power-tools">Hand and Power Tools</Link></li>
//                                                             <li><Link to="/lamps-lighting">Lamps - Lighting - Fixtures</Link></li>
//                                                             <li><Link to="/paints">Paints</Link></li>
//                                                             <li><Link to="/building-supplies">Home Building Supplies</Link></li>
//                                                         </ul>
//                                                     }
//                                                 >
//                                                     Home Repair Tools
//                                                 </NestedDropdownItem>

//                                                 <li><Link to="/lawn-garden">Lawn - Garden</Link></li>
//                                                 <li><Link to="/garden-supplies">Garden Supplies - Outdoor Activities</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Home - Garden
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/sports"
//                                         dropdownKey="sports"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/sports-equipment">Sports Equipment</Link></li>
//                                                 <li><Link to="/exercise-fitness">Exercise - Fitness Equipment</Link></li>
//                                                 <li><Link to="/game-rooms">Game Rooms - Outdoor Games</Link></li>
//                                                 <li><Link to="/outdoor-entertainment">Outdoor Entertainment - Equipment</Link></li>
//                                                 <li><Link to="/golf">Golf</Link></li>
//                                                 <li><Link to="/hunting">Hunting</Link></li>
//                                                 <li><Link to="/cycling">Cycling</Link></li>
//                                                 <li><Link to="/fishing-boating">Fishing - Boating</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Sports - Outdoor Activities
//                                     </DropdownItem>

//                                     <li><Link to="/teen-supplies">Teen Supplies</Link></li>

//                                     <DropdownItem
//                                         to="/babies-kids"
//                                         dropdownKey="babies-kids"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/babies-supplies">Babies Supplies</Link></li>
//                                                 <li><Link to="/kids-supplies">Kids - Children Supplies</Link></li>
//                                                 <li><Link to="/children-toys">Children Toys</Link></li>
//                                                 <li><Link to="/baby-diapers">Baby Diapers</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Babies - Kids - Children Supplies
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/beauty-health"
//                                         dropdownKey="beauty-health"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/cosmetics-accessories">Cosmetics Accessories</Link></li>
//                                                 <li><Link to="/skin-care">Specialized Skin Care</Link></li>
//                                                 <li><Link to="/salon-spa">Salon - Spa Products</Link></li>
//                                                 <li><Link to="/vitamins">Vitamins - Other Nutrients</Link></li>
//                                                 <li><Link to="/mens-cosmetics">Men's Cosmetics Skin Care</Link></li>
//                                                 <li><Link to="/jewelry">Jewelry</Link></li>
//                                                 <li><Link to="/sunglasses">Sunglasses</Link></li>
//                                                 <li><Link to="/watches">Watches</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Beauty and Health
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/bags-luggage"
//                                         dropdownKey="bags-luggage"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/handbags">Handbags</Link></li>
//                                                 <li><Link to="/shoulder-bags">Shoulder Bags</Link></li>
//                                                 <li><Link to="/luggage">Luggage</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Bags - Luggage
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/entertainment"
//                                         dropdownKey="entertainment"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/video-games">Video Games</Link></li>
//                                                 <li><Link to="/home-entertainment">Home Entertainment System</Link></li>
//                                                 <li><Link to="/vr">VR - Virtual Reality</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Entertainment
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/food-grocery"
//                                         dropdownKey="food-grocery"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/gourmet-food">Gourmet Food</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Food and Grocery
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/handmade"
//                                         dropdownKey="handmade"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/arts-crafts">Arts - Crafts - Sewing</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Handmade
//                                     </DropdownItem>

//                                     <DropdownItem
//                                         to="/pets"
//                                         dropdownKey="pets"
//                                         onMouseEnter={handleMouseEnter}
//                                         onMouseLeave={handleMouseLeave}
//                                         onClick={handleMobileDropdownClick}
//                                         hasSubmenu={true}
//                                         submenu={
//                                             <ul>
//                                                 <li><Link to="/cat-food">Cat Food</Link></li>
//                                                 <li><Link to="/cat-supplies">Cat Supplies</Link></li>
//                                                 <li><Link to="/dog-food">Dog Food</Link></li>
//                                                 <li><Link to="/dog-supplies">Dog Supplies</Link></li>
//                                                 <li><Link to="/bird-food">Bird Food</Link></li>
//                                                 <li><Link to="/bird-supplies">Bird Supplies</Link></li>
//                                                 <li><Link to="/fish-supplies">Fish Aquatic Supplies</Link></li>
//                                                 <li><Link to="/other-animal-supplies">Other Animal Supplies</Link></li>
//                                             </ul>
//                                         }
//                                     >
//                                         Pets Supplies
//                                     </DropdownItem>

//                                     <li><Link to="/school-office">School - Office Supplies</Link></li>
//                                     <li><Link to="/books">Books</Link></li>
//                                     <li><Link to="/cars">Cars</Link></li>
//                                     <li><Link to="/industrial">Industrial Scientific Materials</Link></li>
//                                 </ul>
//                             </div>
//                         </li>

//                         <li
//                             className="ecommerce-nav-item ecommerce-nav-item-dropdown"
//                             onMouseEnter={() => handleMouseEnter('account')}
//                             onMouseLeave={() => handleMouseLeave('account')}
//                         >
//                             <Link
//                                 to="/my-account"
//                                 className="ecommerce-nav-link"
//                                 onClick={(e) => handleMobileDropdownClick('account', e)}
//                             >
//                                 My Account <ChevronDown size={16} />
//                             </Link>
//                             <div className={`ecommerce-nav-dropdown ${isDropdownOpen('account') ? 'ecommerce-nav-dropdown-active' : ''}`}>
//                                 <ul className="ecommerce-nav-dropdown-menu">
//                                     <li><Link to="/account-details">Account Details</Link></li>
//                                     <li><Link to="/addresses">Addresses</Link></li>
//                                     <li><Link to="/payment-methods">Payment Methods</Link></li>
//                                     <li><Link to="/wishlist">Wishlist</Link></li>
//                                     <li><Link to="/saved-for-later">Saved For Later</Link></li>
//                                     <li><Link to="/orders">Orders</Link></li>
//                                     <li><Link to="/order-tracking">Order Tracking</Link></li>
//                                     <li><Link to="/download">Download</Link></li>
//                                     <li><Link to="/lost-password">Lost Password</Link></li>
//                                 </ul>
//                             </div>
//                         </li>

//                         <li className="ecommerce-nav-item">
//                             <Link to="/about" className="ecommerce-nav-link">About</Link>
//                         </li>

//                         <li className="ecommerce-nav-item">
//                             <Link to="/contact" className="ecommerce-nav-link">Contact Us</Link>
//                         </li>

//                         <li
//                             className="ecommerce-nav-item ecommerce-nav-item-dropdown"
//                             onMouseEnter={() => handleMouseEnter('sellers')}
//                             onMouseLeave={() => handleMouseLeave('sellers')}
//                         >
//                             <Link
//                                 to="/sellers"
//                                 className="ecommerce-nav-link"
//                                 onClick={(e) => handleMobileDropdownClick('sellers', e)}
//                             >
//                                 Sellers <ChevronDown size={16} />
//                             </Link>
//                             <div className={`ecommerce-nav-dropdown ${isDropdownOpen('sellers') ? 'ecommerce-nav-dropdown-active' : ''}`}>
//                                 <ul className="ecommerce-nav-dropdown-menu">
//                                     <li><Link to="/vendor-registration">Vendor Registration</Link></li>
//                                     <li><Link to="/vendor-membership">Vendor Membership</Link></li>
//                                     <li><Link to="/store-manager">Store Manager</Link></li>
//                                     <li><Link to="/vendors-drivers-manager">Vendors Drivers Manager</Link></li>
//                                     <li><Link to="/stores-list">Stores List</Link></li>
//                                 </ul>
//                             </div>
//                         </li>

//                         <li
//                             className="ecommerce-nav-item ecommerce-nav-item-dropdown"
//                             onMouseEnter={() => handleMouseEnter('delivery')}
//                             onMouseLeave={() => handleMouseLeave('delivery')}
//                         >
//                             <Link
//                                 to="/delivery-drivers"
//                                 className="ecommerce-nav-link"
//                                 onClick={(e) => handleMobileDropdownClick('delivery', e)}
//                             >
//                                 Delivery Drivers <ChevronDown size={16} />
//                             </Link>
//                             <div className={`ecommerce-nav-dropdown ${isDropdownOpen('delivery') ? 'ecommerce-nav-dropdown-active' : ''}`}>
//                                 <ul className="ecommerce-nav-dropdown-menu">
//                                     <li><Link to="/delivery-drivers">Delivery Drivers</Link></li>
//                                     <li><Link to="/delivery-drivers-manager">Delivery Drivers Manager</Link></li>
//                                     <li><Link to="/vendors-drivers-managers">Vendors Drivers Managers</Link></li>
//                                     <li><Link to="/delivery-tracking">Delivery Tracking</Link></li>
//                                     <li><Link to="/delivery-drivers-app">Delivery Drivers App</Link></li>
//                                 </ul>
//                             </div>
//                         </li>

//                         <li className="ecommerce-nav-item ecommerce-nav-item-cart">
//                             <Link to="/cart" className="ecommerce-nav-link ecommerce-nav-link-orange">
//                                 <ShoppingCart size={20} />
//                             </Link>
//                         </li>

//                         <li
//                             className="ecommerce-nav-item ecommerce-nav-item-dropdown"
//                             onMouseEnter={() => handleMouseEnter('language')}
//                             onMouseLeave={() => handleMouseLeave('language')}
//                         >
//                             <button
//                                 className="ecommerce-nav-link ecommerce-nav-link-orange"
//                                 onClick={(e) => handleMobileDropdownClick('language', e)}
//                                 style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
//                             >
//                                 English <ChevronDown size={16} />
//                             </button>
//                             <div className={`ecommerce-nav-dropdown ${isDropdownOpen('language') ? 'ecommerce-nav-dropdown-active' : ''}`}>
//                                 <ul className="ecommerce-nav-dropdown-menu">
//                                     <li><Link to="/ar">Arabic</Link></li>
//                                 </ul>
//                             </div>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;