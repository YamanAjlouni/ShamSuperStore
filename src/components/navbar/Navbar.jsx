import React, { useState, useEffect } from 'react';
import { Mail, User, ShoppingCart, Menu, X, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartReducer';
import shamSuperStoreLogo from '../../assets/images/shamSuperStoreLogo.jpg';
import './Navbar.scss';

const Navbar = () => {
    const navigate = useNavigate();
    const { toggleCart, getTotalItems } = useCart();
    const totalItems = getTotalItems();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeSubDropdown, setActiveSubDropdown] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
    const [mobileActiveSubDropdown, setMobileActiveSubDropdown] = useState(null);

    const navItems = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Shop',
            link: '/shop',
            dropdown: [
                { title: 'All Categories', link: '/shop' },
                {
                    title: 'Computer',
                    link: '/shop/category/1',
                    subDropdown: [
                        { title: 'Desktop Computer', link: '/shop/category/1/desktop' },
                        { title: 'Tablet PC', link: '/shop/category/1/tablet' },
                        { title: 'Computer Monitor', link: '/shop/category/1/monitor' },
                        { title: 'Computer Mouse - Keyboard', link: '/shop/category/1/mouse-keyboard' },
                        { title: 'Computer Software', link: '/shop/category/1/software' },
                        { title: 'Computer Accessories', link: '/shop/category/1/accessories' },
                        { title: 'Computer Components', link: '/shop/category/1/components' }
                    ]
                },
                {
                    title: 'Electronics',
                    link: '/shop/category/2',
                    subDropdown: [
                        { title: 'Mobile - Smart Phone', link: '/shop/category/2/mobile' },
                        { title: 'Wearable Technology', link: '/shop/category/2/wearable' },
                        { title: 'TV and Video', link: '/shop/category/2/tv-video' },
                        { title: 'Speakers', link: '/shop/category/2/speakers' },
                        { title: 'Cameras - Pictures', link: '/shop/category/2/cameras' },
                        { title: 'Movies - Music', link: '/shop/category/2/movies-music' },
                        { title: 'Musical Instruments', link: '/shop/category/2/musical-instruments' },
                        { title: 'Electronic Office Equipment', link: '/shop/category/2/office-equipment' }
                    ]
                },
                {
                    title: 'Smart Home',
                    link: '/shop/category/3',
                    subDropdown: [
                        { title: 'Smart Lock', link: '/shop/category/3/smart-lock' },
                        { title: 'Smart Lighting', link: '/shop/category/3/smart-lighting' },
                        { title: 'Vacuums - Mops', link: '/shop/category/3/vacuums-mops' },
                        { title: 'Plugs - Outlets', link: '/shop/category/3/plugs-outlets' },
                        { title: 'WiFi - Networking', link: '/shop/category/3/wifi-networking' },
                        { title: 'Detectors - Sensors', link: '/shop/category/3/detectors-sensors' },
                        { title: 'Security Cameras - Systems', link: '/shop/category/3/security-cameras' }
                    ]
                },
                {
                    title: 'Home - Garden',
                    link: '/shop/category/4',
                    subDropdown: [
                        { title: 'Home Appliances - Electrical Tools', link: '/shop/category/4/home-appliances' },
                        { title: 'Kitchen', link: '/shop/category/4/kitchen' },
                        { title: 'Bath', link: '/shop/category/4/bath' },
                        { title: 'Laundry Supplies', link: '/shop/category/4/laundry' },
                        { title: 'Heating - Cooling', link: '/shop/category/4/heating-cooling' },
                        { title: 'Lighting', link: '/shop/category/4/lighting' },
                        { title: 'Home Audio - Video Systems', link: '/shop/category/4/home-audio-video' },
                        { title: 'Storage - Organization Supplies', link: '/shop/category/4/storage' },
                        { title: 'Home Repair Tools', link: '/shop/category/4/home-repair' },
                        { title: 'Lawn - Garden', link: '/shop/category/4/lawn-garden' },
                        { title: 'Garden Supplies - Outdoor Activities', link: '/shop/category/4/garden-supplies' }
                    ]
                },
                {
                    title: 'Furniture',
                    link: '/shop/category/5',
                    subDropdown: [
                        { title: 'Chair', link: '/shop/category/5/chair' },
                        { title: 'Sofa', link: '/shop/category/5/sofa' },
                        { title: 'Living Room', link: '/shop/category/5/living-room' },
                        { title: 'Guest Room', link: '/shop/category/5/guest-room' },
                        { title: 'Kids - Children Room', link: '/shop/category/5/kids-room' },
                        { title: 'Dining Room', link: '/shop/category/5/dining-room' },
                        { title: 'Bedroom', link: '/shop/category/5/bedroom' },
                        { title: 'Study - Home Office', link: '/shop/category/5/study-office' },
                        { title: 'Outdoor Furniture', link: '/shop/category/5/outdoor' },
                        { title: 'Antiques - Fine Arts', link: '/shop/category/5/antiques' }
                    ]
                },
                {
                    title: 'Clothes',
                    link: '/shop/category/6',
                    subDropdown: [
                        { title: 'Women\'s Clothing', link: '/shop/category/6/womens' },
                        { title: 'Men\'s Clothing', link: '/shop/category/6/mens' },
                        { title: 'Girl\'s Clothing', link: '/shop/category/6/girls' },
                        { title: 'Boy\'s Clothing', link: '/shop/category/6/boys' },
                        { title: 'Children\'s Clothing', link: '/shop/category/6/childrens' },
                        { title: 'Infant\'s - Baby\'s Clothing', link: '/shop/category/6/baby' }
                    ]
                },
                {
                    title: 'Shoes',
                    link: '/shop/category/7',
                    subDropdown: [
                        { title: 'Women\'s Shoes', link: '/shop/category/7/womens' },
                        { title: 'Men\'s Shoes', link: '/shop/category/7/mens' },
                        { title: 'Girl\'s Shoes', link: '/shop/category/7/girls' },
                        { title: 'Boy\'s Shoes', link: '/shop/category/7/boys' },
                        { title: 'Children\'s Shoes', link: '/shop/category/7/childrens' }
                    ]
                },
                {
                    title: 'Babies - Kids - Children Supplies',
                    link: '/shop/category/8',
                    subDropdown: [
                        { title: 'Babies Supplies', link: '/shop/category/8/babies' },
                        { title: 'Kids - Children Supplies', link: '/shop/category/8/kids' },
                        { title: 'Children Toys', link: '/shop/category/8/toys' },
                        { title: 'Baby Diapers', link: '/shop/category/8/diapers' }
                    ]
                },
                { title: 'Teen Supplies', link: '/shop/category/9' },
                {
                    title: 'Beauty - Health',
                    link: '/shop/category/10',
                    subDropdown: [
                        { title: 'Cosmetics Accessories', link: '/shop/category/10/cosmetics' },
                        { title: 'Specialized Skin Care', link: '/shop/category/10/skin-care' },
                        { title: 'Salon - Spa Products', link: '/shop/category/10/salon-spa' },
                        { title: 'Vitamins - Other Nutrients', link: '/shop/category/10/vitamins' },
                        { title: 'Men\'s Cosmetics Skin Care', link: '/shop/category/10/mens-cosmetics' },
                        { title: 'Jewelry', link: '/shop/category/10/jewelry' },
                        { title: 'Sunglasses', link: '/shop/category/10/sunglasses' },
                        { title: 'Watches', link: '/shop/category/10/watches' }
                    ]
                },
                {
                    title: 'Sports - Outdoor Activities',
                    link: '/shop/category/11',
                    subDropdown: [
                        { title: 'Sports Equipment', link: '/shop/category/11/sports-equipment' },
                        { title: 'Exercise - Fitness Equipment', link: '/shop/category/11/exercise-fitness' },
                        { title: 'Game Rooms - Outdoor Games', link: '/shop/category/11/game-rooms' },
                        { title: 'Outdoor Entertainment - Equipment', link: '/shop/category/11/outdoor-entertainment' },
                        { title: 'Golf', link: '/shop/category/11/golf' },
                        { title: 'Hunting', link: '/shop/category/11/hunting' },
                        { title: 'Cycling', link: '/shop/category/11/cycling' },
                        { title: 'Fishing - Boating', link: '/shop/category/11/fishing-boating' }
                    ]
                },
                {
                    title: 'Food Grocery',
                    link: '/shop/category/12',
                    subDropdown: [
                        { title: 'Gourmet Food', link: '/shop/category/12/gourmet' }
                    ]
                },
                {
                    title: 'Pets Supplies',
                    link: '/shop/category/13',
                    subDropdown: [
                        { title: 'Cat Food', link: '/shop/category/13/cat-food' },
                        { title: 'Cat Supplies', link: '/shop/category/13/cat-supplies' },
                        { title: 'Dog Food', link: '/shop/category/13/dog-food' },
                        { title: 'Dog Supplies', link: '/shop/category/13/dog-supplies' },
                        { title: 'Bird Food', link: '/shop/category/13/bird-food' },
                        { title: 'Bird Supplies', link: '/shop/category/13/bird-supplies' },
                        { title: 'Fish Aquatic Supplies', link: '/shop/category/13/fish-supplies' },
                        { title: 'Other Animal Supplies', link: '/shop/category/13/other-animals' }
                    ]
                },
                {
                    title: 'Entertainment',
                    link: '/shop/category/14',
                    subDropdown: [
                        { title: 'Video Games', link: '/shop/category/14/video-games' },
                        { title: 'Home Entertainment System', link: '/shop/category/14/home-entertainment' },
                        { title: 'VR - Virtual Reality', link: '/shop/category/14/vr' }
                    ]
                },
                {
                    title: 'Handmade',
                    link: '/shop/category/15',
                    subDropdown: [
                        { title: 'Arts - Crafts - Sewing', link: '/shop/category/15/arts-crafts' }
                    ]
                },
                { title: 'School - Office Supplies', link: '/shop/category/16' },
                { title: 'Books', link: '/shop/category/17' },
                { title: 'Cars', link: '/shop/category/18' },
                { title: 'Industrial Scientific Materials', link: '/shop/category/19' },
                {
                    title: 'Bags - Luggage',
                    link: '/shop/category/20',
                    subDropdown: [
                        { title: 'Handbags', link: '/shop/category/20/handbags' },
                        { title: 'Shoulder Bags', link: '/shop/category/20/shoulder-bags' },
                        { title: 'Luggage', link: '/shop/category/20/luggage' }
                    ]
                }
            ]
        },
        {
            title: 'My Account',
            link: '/my-account',
            dropdown: [
                { title: 'Dashboard', link: '/my-account' },
                { title: 'Orders', link: '/my-account' },
                { title: 'Order Tracking', link: '/my-account' },
                { title: 'Downloads', link: '/my-account' },
                { title: 'Addresses', link: '/my-account' },
                { title: 'Payment Methods', link: '/my-account' },
                { title: 'Account Details', link: '/my-account' },
                { title: 'Wishlist', link: '/my-account' },
                { title: 'Following', link: '/my-account' },
                { title: 'Support Tickets', link: '/my-account' },
                { title: 'Contacted Sellers', link: '/my-account' },
                { title: 'Lost Password', link: '/my-account' }
            ]
        },
        {
            title: 'About',
            link: '/about'
        },
        {
            title: 'Contact Us',
            link: '/contact'
        },
        {
            title: 'Sellers',
            link: '/sellers',
            dropdown: [
                { title: 'Vendor Registration', link: '/vendor-registration' },
                { title: 'Vendor Membership', link: '/vendor-membership' },
                { title: 'Store Manager', link: '/store-manager' },
                { title: 'Vendors Drivers Manager', link: '/vendors-drivers-manager' },
                { title: 'Stores List', link: '/stores-list' }
            ]
        },
        {
            title: 'Delivery Drivers',
            link: '/delivery-drivers',
            dropdown: [
                { title: 'Delivery Drivers', link: '/delivery-drivers' },
                { title: 'Delivery Drivers Manager', link: '/delivery-drivers-manager' },
                { title: 'Vendors Drivers Managers', link: '/vendors-drivers-managers' },
                { title: 'Delivery Tracking', link: '/delivery-tracking' },
                { title: 'Delivery Drivers App', link: '/delivery-drivers-app' }
            ]
        },
        {
            title: 'English',
            dropdown: [
                { title: 'العربية (Arabic)', link: '/ar' }
            ]
        }
    ];

    const handleMouseEnter = (index) => {
        setActiveDropdown(index);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
    };

    const handleSubMouseEnter = (index) => {
        setActiveSubDropdown(index);
    };

    const handleSubMouseLeave = () => {
        setActiveSubDropdown(null);
    };

    // Mobile dropdown handlers
    const handleMobileDropdownToggle = (index, e) => {
        e.preventDefault();
        e.stopPropagation();
        setMobileActiveDropdown(mobileActiveDropdown === index ? null : index);
        setMobileActiveSubDropdown(null);
    };

    const handleMobileSubDropdownToggle = (index, e) => {
        e.preventDefault();
        e.stopPropagation();
        setMobileActiveSubDropdown(mobileActiveSubDropdown === index ? null : index);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        setMobileActiveDropdown(null);
        setMobileActiveSubDropdown(null);
    };

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        setMobileActiveDropdown(null);
        setMobileActiveSubDropdown(null);
    };

    const handleNavigation = (path) => {
        navigate(path);
        handleLinkClick();
    };

    const handleCartClick = () => {
        toggleCart();
        handleLinkClick();
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            handleLinkClick();
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setMobileMenuOpen(false);
                setMobileActiveDropdown(null);
                setMobileActiveSubDropdown(null);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            const scrollY = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [mobileMenuOpen]);

    return (
        <nav className="navbar">
            {/* Top Bar */}
            <div className="navbar__top">
                <div className="navbar__top-container">
                    {/* Logo */}
                    <div className="navbar__logo">
                        <Link to="/" onClick={handleLinkClick}>
                            <img src={shamSuperStoreLogo} alt="Sham Super Store" />
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="navbar__search">
                        <form onSubmit={handleSearchSubmit} className="navbar__search-form">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="navbar__search-input"
                            />
                            <button type="submit" className="navbar__search-button">
                                <Search size={20} />
                            </button>
                        </form>
                    </div>

                    {/* Top Actions (Desktop Only) */}
                    <div className="navbar__actions">
                        <button
                            className="navbar__action-btn"
                            onClick={() => handleNavigation('/contact')}
                        >
                            <Mail size={16} />
                            <span>support@shamsuperstore.com</span>
                        </button>

                        <button
                            className="navbar__action-btn"
                            onClick={() => handleNavigation('/my-account')}
                        >
                            <User size={16} />
                            <span>Login</span>
                        </button>

                        <button
                            className="navbar__seller-btn"
                            onClick={() => handleNavigation('/sellers')}
                        >
                            Become a seller
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="navbar__toggle" onClick={toggleMobileMenu}>
                        <span className={`navbar__toggle-line ${mobileMenuOpen ? 'active' : ''}`}></span>
                        <span className={`navbar__toggle-line ${mobileMenuOpen ? 'active' : ''}`}></span>
                        <span className={`navbar__toggle-line ${mobileMenuOpen ? 'active' : ''}`}></span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="navbar__container">
                {/* Desktop Navigation */}
                <ul className="navbar__menu">
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className="navbar__item"
                            onMouseEnter={() => item.dropdown && handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to={item.link || '#'} className="navbar__link" onClick={handleLinkClick}>
                                {item.title}
                                {item.dropdown && (
                                    <ChevronDown
                                        size={16}
                                        className={`navbar__arrow ${activeDropdown === index ? 'rotated' : ''}`}
                                    />
                                )}
                            </Link>

                            {/* Second Level Dropdown */}
                            {item.dropdown && activeDropdown === index && (
                                <ul className={`navbar__dropdown ${index === 1 ? 'navbar__dropdown--scrollable' : ''}`}>
                                    {item.dropdown.map((dropdownItem, dropIndex) => (
                                        <li
                                            key={dropIndex}
                                            className="navbar__dropdown-item"
                                            onMouseEnter={() => dropdownItem.subDropdown && handleSubMouseEnter(dropIndex)}
                                            onMouseLeave={handleSubMouseLeave}
                                        >
                                            <Link to={dropdownItem.link} className="navbar__dropdown-link" onClick={handleLinkClick}>
                                                {dropdownItem.title}
                                                {dropdownItem.subDropdown && (
                                                    <ChevronRight
                                                        size={14}
                                                        className="navbar__arrow--sub"
                                                    />
                                                )}
                                            </Link>

                                            {/* Third Level Dropdown */}
                                            {dropdownItem.subDropdown && activeSubDropdown === dropIndex && (
                                                <ul className="navbar__sub-dropdown">
                                                    {dropdownItem.subDropdown.map((subItem, subIndex) => (
                                                        <li key={subIndex} className="navbar__sub-dropdown-item">
                                                            <Link to={subItem.link} className="navbar__sub-dropdown-link" onClick={handleLinkClick}>
                                                                {subItem.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}

                    {/* Cart */}
                    <li className="navbar__item navbar__cart">
                        <button className="navbar__cart-btn" onClick={handleCartClick}>
                            <div className="navbar__cart-icon">
                                <ShoppingCart size={20} />
                                {totalItems > 0 && (
                                    <span className="navbar__cart-badge">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </div>
                        </button>
                    </li>
                </ul>

                {/* Mobile Menu */}
                <div className={`navbar__mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    {/* Mobile Search */}
                    <div className="navbar__mobile-search">
                        <form onSubmit={handleSearchSubmit} className="navbar__mobile-search-form">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="navbar__mobile-search-input"
                            />
                            <button type="submit" className="navbar__mobile-search-button">
                                <Search size={20} />
                            </button>
                        </form>
                    </div>

                    {navItems.map((item, index) => (
                        <div key={index} className="navbar__mobile-item">
                            <div className="navbar__mobile-link-container">
                                <Link
                                    to={item.link || '#'}
                                    className="navbar__mobile-link"
                                    onClick={item.link ? handleLinkClick : undefined}
                                >
                                    {item.title}
                                </Link>
                                {item.dropdown && (
                                    <button
                                        className="navbar__mobile-arrow-btn"
                                        onClick={(e) => handleMobileDropdownToggle(index, e)}
                                    >
                                        <ChevronDown
                                            size={20}
                                            className={`navbar__mobile-arrow ${mobileActiveDropdown === index ? 'rotated' : ''}`}
                                        />
                                    </button>
                                )}
                            </div>

                            {item.dropdown && (
                                <div className={`navbar__mobile-dropdown ${mobileActiveDropdown === index ? 'active' : ''}`}>
                                    {item.dropdown.map((dropdownItem, dropIndex) => (
                                        <div key={dropIndex} className="navbar__mobile-dropdown-item">
                                            <div className="navbar__mobile-dropdown-link-container">
                                                <Link
                                                    to={dropdownItem.link}
                                                    className="navbar__mobile-dropdown-link"
                                                    onClick={handleLinkClick}
                                                >
                                                    {dropdownItem.title}
                                                </Link>
                                                {dropdownItem.subDropdown && (
                                                    <button
                                                        className="navbar__mobile-arrow-btn"
                                                        onClick={(e) => handleMobileSubDropdownToggle(dropIndex, e)}
                                                    >
                                                        <ChevronDown
                                                            size={18}
                                                            className={`navbar__mobile-arrow ${mobileActiveSubDropdown === dropIndex ? 'rotated' : ''}`}
                                                        />
                                                    </button>
                                                )}
                                            </div>

                                            {dropdownItem.subDropdown && (
                                                <div className={`navbar__mobile-sub-dropdown ${mobileActiveSubDropdown === dropIndex ? 'active' : ''}`}>
                                                    {dropdownItem.subDropdown.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            to={subItem.link}
                                                            className="navbar__mobile-sub-dropdown-link"
                                                            onClick={handleLinkClick}
                                                        >
                                                            {subItem.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Mobile Cart */}
                    <div className="navbar__mobile-item">
                        <button className="navbar__mobile-cart" onClick={handleCartClick}>
                            <ShoppingCart size={20} />
                            <span>Cart</span>
                            {totalItems > 0 && (
                                <span className="navbar__mobile-cart-badge">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;