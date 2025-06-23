import { useState, useRef, useEffect, useCallback } from 'react';
import { Mail, User, ShoppingCart, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartReducer';
import shamSuperStoreLogo from '../../assets/images/shamSuperStoreLogo.jpg'
import './Navbar.scss';

const Navbar = () => {
    const navigate = useNavigate();
    const { toggleCart, getTotalItems } = useCart();
    const totalItems = getTotalItems();
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const dropdownTimeouts = useRef({});
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

    // Close mobile menu when window resizes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
                setOpenDropdowns({});
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const clearAllTimeouts = useCallback(() => {
        Object.values(dropdownTimeouts.current).forEach(timeout => clearTimeout(timeout));
        dropdownTimeouts.current = {};
    }, []);

    const clearDropdownTimeout = useCallback((key) => {
        if (dropdownTimeouts.current[key]) {
            clearTimeout(dropdownTimeouts.current[key]);
            delete dropdownTimeouts.current[key];
        }
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            setOpenDropdowns({});
        }
    };

    // Simple hover handlers for desktop
    const handleMouseEnter = useCallback((dropdownKey) => {
        if (window.innerWidth < 1024) return;
        
        clearDropdownTimeout(dropdownKey);
        setOpenDropdowns(prev => ({ ...prev, [dropdownKey]: true }));
    }, [clearDropdownTimeout]);

    const handleMouseLeave = useCallback((dropdownKey) => {
        if (window.innerWidth < 1024) return;
        
        dropdownTimeouts.current[dropdownKey] = setTimeout(() => {
            setOpenDropdowns(prev => {
                const newState = { ...prev };
                delete newState[dropdownKey];
                return newState;
            });
        }, 300);
    }, []);

    const handleMobileDropdownToggle = (dropdownKey, event) => {
        if (window.innerWidth >= 1024) return;

        event.preventDefault();
        event.stopPropagation();

        setOpenDropdowns(prev => ({
            ...prev,
            [dropdownKey]: !prev[dropdownKey]
        }));
    };

    const isDropdownOpen = (dropdownKey) => {
        return openDropdowns[dropdownKey] || false;
    };

    const handleLoginClick = () => {
        navigate('/my-account');
        setIsMobileMenuOpen(false);
    };

    const handleEmailClick = () => {
        navigate('/contact');
        setIsMobileMenuOpen(false);
    };

    const handleSellerClick = () => {
        navigate('/sellers');
        setIsMobileMenuOpen(false);
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        toggleCart();
        setIsMobileMenuOpen(false);
    };

    const handleLinkClick = () => {
        setOpenDropdowns({});
        if (window.innerWidth < 1024) {
            setIsMobileMenuOpen(false);
        }
        clearAllTimeouts();
    };

    // Shop categories with subcategories
    const shopCategories = [
        {
            id: 1,
            name: "Computer",
            link: "/shop/category/1",
            subcategories: [
                { name: "Desktop Computer", link: "/shop/category/1/desktop" },
                { name: "Tablet PC", link: "/shop/category/1/tablet" },
                { name: "Computer Monitor", link: "/shop/category/1/monitor" },
                { name: "Computer Mouse - Keyboard", link: "/shop/category/1/mouse-keyboard" },
                { name: "Computer Software", link: "/shop/category/1/software" },
                { name: "Computer Accessories", link: "/shop/category/1/accessories" },
                { name: "Computer Components", link: "/shop/category/1/components" }
            ]
        },
        {
            id: 2,
            name: "Electronics",
            link: "/shop/category/2",
            subcategories: [
                { name: "Mobile - Smart Phone", link: "/shop/category/2/mobile" },
                { name: "Wearable Technology", link: "/shop/category/2/wearable" },
                { name: "TV and Video", link: "/shop/category/2/tv-video" },
                { name: "Speakers", link: "/shop/category/2/speakers" },
                { name: "Cameras - Pictures", link: "/shop/category/2/cameras" },
                { name: "Movies - Music", link: "/shop/category/2/movies-music" },
                { name: "Musical Instruments", link: "/shop/category/2/musical-instruments" },
                { name: "Electronic Office Equipment", link: "/shop/category/2/office-equipment" }
            ]
        },
        {
            id: 3,
            name: "Smart Home",
            link: "/shop/category/3",
            subcategories: [
                { name: "Smart Lock", link: "/shop/category/3/smart-lock" },
                { name: "Smart Lighting", link: "/shop/category/3/smart-lighting" },
                { name: "Vacuums - Mops", link: "/shop/category/3/vacuums-mops" },
                { name: "Plugs - Outlets", link: "/shop/category/3/plugs-outlets" },
                { name: "WiFi - Networking", link: "/shop/category/3/wifi-networking" },
                { name: "Detectors - Sensors", link: "/shop/category/3/detectors-sensors" },
                { name: "Security Cameras - Systems", link: "/shop/category/3/security-cameras" }
            ]
        },
        {
            id: 4,
            name: "Home - Garden",
            link: "/shop/category/4",
            subcategories: [
                { name: "Home Appliances - Electrical Tools", link: "/shop/category/4/home-appliances" },
                { name: "Kitchen", link: "/shop/category/4/kitchen" },
                { name: "Bath", link: "/shop/category/4/bath" },
                { name: "Laundry Supplies", link: "/shop/category/4/laundry" },
                { name: "Heating - Cooling", link: "/shop/category/4/heating-cooling" },
                { name: "Lighting", link: "/shop/category/4/lighting" },
                { name: "Home Audio - Video Systems", link: "/shop/category/4/home-audio-video" },
                { name: "Storage - Organization Supplies", link: "/shop/category/4/storage" },
                { name: "Home Repair Tools", link: "/shop/category/4/home-repair" },
                { name: "Lawn - Garden", link: "/shop/category/4/lawn-garden" },
                { name: "Garden Supplies - Outdoor Activities", link: "/shop/category/4/garden-supplies" }
            ]
        },
        {
            id: 5,
            name: "Furniture",
            link: "/shop/category/5",
            subcategories: [
                { name: "Chair", link: "/shop/category/5/chair" },
                { name: "Sofa", link: "/shop/category/5/sofa" },
                { name: "Living Room", link: "/shop/category/5/living-room" },
                { name: "Guest Room", link: "/shop/category/5/guest-room" },
                { name: "Kids - Children Room", link: "/shop/category/5/kids-room" },
                { name: "Dining Room", link: "/shop/category/5/dining-room" },
                { name: "Bedroom", link: "/shop/category/5/bedroom" },
                { name: "Study - Home Office", link: "/shop/category/5/study-office" },
                { name: "Outdoor Furniture", link: "/shop/category/5/outdoor" },
                { name: "Antiques - Fine Arts", link: "/shop/category/5/antiques" }
            ]
        },
        {
            id: 6,
            name: "Clothes",
            link: "/shop/category/6",
            subcategories: [
                { name: "Women's Clothing", link: "/shop/category/6/womens" },
                { name: "Men's Clothing", link: "/shop/category/6/mens" },
                { name: "Girl's Clothing", link: "/shop/category/6/girls" },
                { name: "Boy's Clothing", link: "/shop/category/6/boys" },
                { name: "Children's Clothing", link: "/shop/category/6/childrens" },
                { name: "Infant's - Baby's Clothing", link: "/shop/category/6/baby" }
            ]
        },
        {
            id: 7,
            name: "Shoes",
            link: "/shop/category/7",
            subcategories: [
                { name: "Women's Shoes", link: "/shop/category/7/womens" },
                { name: "Men's Shoes", link: "/shop/category/7/mens" },
                { name: "Girl's Shoes", link: "/shop/category/7/girls" },
                { name: "Boy's Shoes", link: "/shop/category/7/boys" },
                { name: "Children's Shoes", link: "/shop/category/7/childrens" }
            ]
        },
        {
            id: 8,
            name: "Babies - Kids - Children Supplies",
            link: "/shop/category/8",
            subcategories: [
                { name: "Babies Supplies", link: "/shop/category/8/babies" },
                { name: "Kids - Children Supplies", link: "/shop/category/8/kids" },
                { name: "Children Toys", link: "/shop/category/8/toys" },
                { name: "Baby Diapers", link: "/shop/category/8/diapers" }
            ]
        },
        {
            id: 10,
            name: "Beauty - Health",
            link: "/shop/category/10",
            subcategories: [
                { name: "Cosmetics Accessories", link: "/shop/category/10/cosmetics" },
                { name: "Specialized Skin Care", link: "/shop/category/10/skin-care" },
                { name: "Salon - Spa Products", link: "/shop/category/10/salon-spa" },
                { name: "Vitamins - Other Nutrients", link: "/shop/category/10/vitamins" },
                { name: "Men's Cosmetics Skin Care", link: "/shop/category/10/mens-cosmetics" },
                { name: "Jewelry", link: "/shop/category/10/jewelry" },
                { name: "Sunglasses", link: "/shop/category/10/sunglasses" },
                { name: "Watches", link: "/shop/category/10/watches" }
            ]
        },
        {
            id: 11,
            name: "Sports - Outdoor Activities",
            link: "/shop/category/11",
            subcategories: [
                { name: "Sports Equipment", link: "/shop/category/11/sports-equipment" },
                { name: "Exercise - Fitness Equipment", link: "/shop/category/11/exercise-fitness" },
                { name: "Game Rooms - Outdoor Games", link: "/shop/category/11/game-rooms" },
                { name: "Outdoor Entertainment - Equipment", link: "/shop/category/11/outdoor-entertainment" },
                { name: "Golf", link: "/shop/category/11/golf" },
                { name: "Hunting", link: "/shop/category/11/hunting" },
                { name: "Cycling", link: "/shop/category/11/cycling" },
                { name: "Fishing - Boating", link: "/shop/category/11/fishing-boating" }
            ]
        },
        {
            id: 12,
            name: "Food Grocery",
            link: "/shop/category/12",
            subcategories: [
                { name: "Gourmet Food", link: "/shop/category/12/gourmet" }
            ]
        },
        {
            id: 13,
            name: "Pets Supplies",
            link: "/shop/category/13",
            subcategories: [
                { name: "Cat Food", link: "/shop/category/13/cat-food" },
                { name: "Cat Supplies", link: "/shop/category/13/cat-supplies" },
                { name: "Dog Food", link: "/shop/category/13/dog-food" },
                { name: "Dog Supplies", link: "/shop/category/13/dog-supplies" },
                { name: "Bird Food", link: "/shop/category/13/bird-food" },
                { name: "Bird Supplies", link: "/shop/category/13/bird-supplies" },
                { name: "Fish Aquatic Supplies", link: "/shop/category/13/fish-supplies" },
                { name: "Other Animal Supplies", link: "/shop/category/13/other-animals" }
            ]
        },
        {
            id: 14,
            name: "Entertainment",
            link: "/shop/category/14",
            subcategories: [
                { name: "Video Games", link: "/shop/category/14/video-games" },
                { name: "Home Entertainment System", link: "/shop/category/14/home-entertainment" },
                { name: "VR - Virtual Reality", link: "/shop/category/14/vr" }
            ]
        },
        {
            id: 15,
            name: "Handmade",
            link: "/shop/category/15",
            subcategories: [
                { name: "Arts - Crafts - Sewing", link: "/shop/category/15/arts-crafts" }
            ]
        },
        {
            id: 20,
            name: "Bags - Luggage",
            link: "/shop/category/20",
            subcategories: [
                { name: "Handbags", link: "/shop/category/20/handbags" },
                { name: "Shoulder Bags", link: "/shop/category/20/shoulder-bags" },
                { name: "Luggage", link: "/shop/category/20/luggage" }
            ]
        }
    ];

    // Dropdown wrapper component for consistent behavior
    const DropdownItem = ({ dropdownKey, linkTo, linkText, children }) => {
        return (
            <li
                className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                onMouseEnter={() => handleMouseEnter(dropdownKey)}
                onMouseLeave={() => handleMouseLeave(dropdownKey)}
            >
                <div className="ecommerce-nav-link-wrapper">
                    <Link
                        to={linkTo}
                        className="ecommerce-nav-link ecommerce-nav-link-main"
                        onClick={handleLinkClick}
                    >
                        {linkText}
                    </Link>
                    <button
                        className="ecommerce-nav-arrow-btn"
                        onClick={(e) => handleMobileDropdownToggle(dropdownKey, e)}
                        aria-label={`Toggle ${linkText} menu`}
                    >
                        <ChevronDown size={16} className={isDropdownOpen(dropdownKey) ? 'rotate-180' : ''} />
                    </button>
                </div>
                
                <div 
                    className={`ecommerce-nav-dropdown ${isDropdownOpen(dropdownKey) ? 'ecommerce-nav-dropdown-active' : ''}`}
                    onMouseEnter={() => handleMouseEnter(dropdownKey)}
                    onMouseLeave={() => handleMouseLeave(dropdownKey)}
                >
                    <ul className="ecommerce-nav-dropdown-menu">
                        {children}
                    </ul>
                </div>
            </li>
        );
    };

    return (
        <nav className="ecommerce-nav" ref={navRef}>
            <div className="ecommerce-nav-top">
                <div className="ecommerce-nav-container">
                    <div className="ecommerce-nav-logo">
                        <Link to="/" onClick={handleLinkClick}>
                            <img src={shamSuperStoreLogo} alt="Sham Super Store" className="ecommerce-nav-logo-img" />
                        </Link>
                    </div>

                    <div className="ecommerce-nav-top-items">
                        <div className="ecommerce-nav-email" onClick={handleEmailClick}>
                            <Mail size={16} />
                            <span>support@shamsuperstore.com</span>
                        </div>

                        <div className="ecommerce-nav-login" onClick={handleLoginClick}>
                            <User size={16} />
                            <span>Login</span>
                        </div>

                        <button className="ecommerce-nav-seller-btn" onClick={handleSellerClick}>
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
                            <Link to="/" className="ecommerce-nav-link" onClick={handleLinkClick}>
                                Home
                            </Link>
                        </li>

                        <DropdownItem dropdownKey="shop" linkTo="/shop" linkText="Shop">
                            <li><Link to="/shop" onClick={handleLinkClick}>All Categories</Link></li>
                            {shopCategories.map((category) => (
                                <li 
                                    key={category.id}
                                    className={category.subcategories.length > 0 ? "has-submenu" : ""}
                                    onMouseEnter={() => handleMouseEnter(`shop-cat-${category.id}`)}
                                    onMouseLeave={() => handleMouseLeave(`shop-cat-${category.id}`)}
                                >
                                    <div className="category-link-wrapper">
                                        <Link to={category.link} onClick={handleLinkClick}>
                                            {category.name}
                                        </Link>
                                        {category.subcategories.length > 0 && (
                                            <>
                                                <ChevronRight size={14} className="submenu-arrow desktop-only" />
                                                <button
                                                    className="mobile-submenu-toggle"
                                                    onClick={(e) => handleMobileDropdownToggle(`shop-cat-${category.id}`, e)}
                                                    aria-label={`Toggle ${category.name} submenu`}
                                                >
                                                    <ChevronDown size={14} className={isDropdownOpen(`shop-cat-${category.id}`) ? 'rotate-180' : ''} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    
                                    {category.subcategories.length > 0 && (
                                        <div 
                                            className={`submenu ${isDropdownOpen(`shop-cat-${category.id}`) ? 'submenu-active' : ''}`}
                                            onMouseEnter={() => handleMouseEnter(`shop-cat-${category.id}`)}
                                            onMouseLeave={() => handleMouseLeave(`shop-cat-${category.id}`)}
                                        >
                                            <ul>
                                                {category.subcategories.map((sub, index) => (
                                                    <li key={index}>
                                                        <Link to={sub.link} onClick={handleLinkClick}>
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                            <li><Link to="/shop/category/9" onClick={handleLinkClick}>Teen Supplies</Link></li>
                            <li><Link to="/shop/category/16" onClick={handleLinkClick}>School - Office Supplies</Link></li>
                            <li><Link to="/shop/category/17" onClick={handleLinkClick}>Books</Link></li>
                            <li><Link to="/shop/category/18" onClick={handleLinkClick}>Cars</Link></li>
                            <li><Link to="/shop/category/19" onClick={handleLinkClick}>Industrial Scientific Materials</Link></li>
                        </DropdownItem>

                        <DropdownItem dropdownKey="account" linkTo="/my-account" linkText="My Account">
                            <li><Link to="/my-account" onClick={handleLinkClick}>Dashboard</Link></li>
                            <li><Link to="/my-account" onClick={handleLinkClick}>Orders</Link></li>
                            <li><Link to="/my-account" onClick={handleLinkClick}>Order Tracking</Link></li>
                            <li><Link to="/my-account" onClick={handleLinkClick}>Downloads</Link></li>
                            <li><Link to="/my-account" onClick={handleLinkClick}>Addresses</Link></li>
                            <li><Link to="/my-account" onClick={handleLinkClick}>Payment Methods</Link></li>
                            <li><Link to="/my-account" onClick={handleLinkClick}>Account Details</Link></li>
                            <li><Link to="/my-account" onClick={handleLinkClick}>Wishlist</Link></li>
                            <li><Link to="/my-account" onClick={handleLinkClick}>Following</Link></li>
                            <li><Link to="/my-account" onClick={handleLinkClick}>Support Tickets</Link></li>
                            <li><Link to="/my-account" onClick={handleLinkClick}>Inquiries</Link></li>
                            <li><Link to="/my-account" onClick={handleLinkClick}>Lost Password</Link></li>
                        </DropdownItem>

                        <li className="ecommerce-nav-item">
                            <Link to="/about" className="ecommerce-nav-link" onClick={handleLinkClick}>
                                About
                            </Link>
                        </li>

                        <li className="ecommerce-nav-item">
                            <Link to="/contact" className="ecommerce-nav-link" onClick={handleLinkClick}>
                                Contact Us
                            </Link>
                        </li>

                        <DropdownItem dropdownKey="sellers" linkTo="/sellers" linkText="Sellers">
                            <li><Link to="/vendor-registration" onClick={handleLinkClick}>Vendor Registration</Link></li>
                            <li><Link to="/vendor-membership" onClick={handleLinkClick}>Vendor Membership</Link></li>
                            <li><Link to="/store-manager" onClick={handleLinkClick}>Store Manager</Link></li>
                            <li><Link to="/vendors-drivers-manager" onClick={handleLinkClick}>Vendors Drivers Manager</Link></li>
                            <li><Link to="/stores-list" onClick={handleLinkClick}>Stores List</Link></li>
                        </DropdownItem>

                        <DropdownItem dropdownKey="delivery" linkTo="/delivery-drivers" linkText="Delivery Drivers">
                            <li><Link to="/delivery-drivers" onClick={handleLinkClick}>Delivery Drivers</Link></li>
                            <li><Link to="/delivery-drivers-manager" onClick={handleLinkClick}>Delivery Drivers Manager</Link></li>
                            <li><Link to="/vendors-drivers-managers" onClick={handleLinkClick}>Vendors Drivers Managers</Link></li>
                            <li><Link to="/delivery-tracking" onClick={handleLinkClick}>Delivery Tracking</Link></li>
                            <li><Link to="/delivery-drivers-app" onClick={handleLinkClick}>Delivery Drivers App</Link></li>
                        </DropdownItem>

                        <li className="ecommerce-nav-item ecommerce-nav-item-cart">
                            <button 
                                onClick={handleCartClick}
                                className="ecommerce-nav-link ecommerce-nav-link-orange cart-btn"
                                aria-label={`Shopping cart with ${totalItems} items`}
                            >
                                <div className="cart-icon-wrapper">
                                    <ShoppingCart size={20} />
                                    {totalItems > 0 && (
                                        <span className="cart-badge">
                                            {totalItems > 99 ? '99+' : totalItems}
                                        </span>
                                    )}
                                </div>
                            </button>
                        </li>

                        <li
                            className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                            onMouseEnter={() => handleMouseEnter('language')}
                            onMouseLeave={() => handleMouseLeave('language')}
                        >
                            <div className="ecommerce-nav-link-wrapper orange-wrapper">
                                <button
                                    className="ecommerce-nav-link ecommerce-nav-link-orange ecommerce-nav-link-main"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
                                >
                                    English
                                </button>
                                <button
                                    className="ecommerce-nav-arrow-btn ecommerce-nav-arrow-btn-orange"
                                    onClick={(e) => handleMobileDropdownToggle('language', e)}
                                    aria-label="Toggle language menu"
                                >
                                    <ChevronDown size={16} className={isDropdownOpen('language') ? 'rotate-180' : ''} />
                                </button>
                            </div>
                            
                            <div 
                                className={`ecommerce-nav-dropdown ${isDropdownOpen('language') ? 'ecommerce-nav-dropdown-active' : ''}`}
                                onMouseEnter={() => handleMouseEnter('language')}
                                onMouseLeave={() => handleMouseLeave('language')}
                            >
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><Link to="/ar" onClick={handleLinkClick}>Arabic</Link></li>
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


