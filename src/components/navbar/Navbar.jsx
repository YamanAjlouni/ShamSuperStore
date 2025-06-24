import { useState, useRef, useEffect } from 'react';
import { Mail, User, ShoppingCart, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartReducer';
import shamSuperStoreLogo from '../../assets/images/shamSuperStoreLogo.jpg';
import './Navbar.scss';

const Navbar = () => {
    const navigate = useNavigate();
    const { toggleCart, getTotalItems } = useCart();
    const totalItems = getTotalItems();
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const navRef = useRef(null);
    const hoverTimeoutRef = useRef(null);

    // Shop categories data
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

    // Additional categories without subcategories
    const additionalCategories = [
        { name: "Teen Supplies", link: "/shop/category/9" },
        { name: "School - Office Supplies", link: "/shop/category/16" },
        { name: "Books", link: "/shop/category/17" },
        { name: "Cars", link: "/shop/category/18" },
        { name: "Industrial Scientific Materials", link: "/shop/category/19" }
    ];

    // Navigation data
    const accountLinks = [
        { name: "Dashboard", link: "/my-account" },
        { name: "Orders", link: "/my-account" },
        { name: "Order Tracking", link: "/my-account" },
        { name: "Downloads", link: "/my-account" },
        { name: "Addresses", link: "/my-account" },
        { name: "Payment Methods", link: "/my-account" },
        { name: "Account Details", link: "/my-account" },
        { name: "Wishlist", link: "/my-account" },
        { name: "Following", link: "/my-account" },
        { name: "Support Tickets", link: "/my-account" },
        { name: "Inquiries", link: "/my-account" },
        { name: "Lost Password", link: "/my-account" }
    ];

    const sellersLinks = [
        { name: "Vendor Registration", link: "/vendor-registration" },
        { name: "Vendor Membership", link: "/vendor-membership" },
        { name: "Store Manager", link: "/store-manager" },
        { name: "Vendors Drivers Manager", link: "/vendors-drivers-manager" },
        { name: "Stores List", link: "/stores-list" }
    ];

    const deliveryLinks = [
        { name: "Delivery Drivers", link: "/delivery-drivers" },
        { name: "Delivery Drivers Manager", link: "/delivery-drivers-manager" },
        { name: "Vendors Drivers Managers", link: "/vendors-drivers-managers" },
        { name: "Delivery Tracking", link: "/delivery-tracking" },
        { name: "Delivery Drivers App", link: "/delivery-drivers-app" }
    ];

    // Event handlers
    const handleDropdownToggle = (dropdownName) => {
        if (window.innerWidth < 1024) {
            setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
            setActiveSubMenu(null);
        }
    };

    const handleSubMenuToggle = (subMenuName) => {
        if (window.innerWidth < 1024) {
            setActiveSubMenu(activeSubMenu === subMenuName ? null : subMenuName);
        }
    };

    // Desktop hover handlers
    const handleDropdownHover = (dropdownName) => {
        if (window.innerWidth >= 1024) {
            clearTimeout(hoverTimeoutRef.current);
            setActiveDropdown(dropdownName);
            setActiveSubMenu(null);
        }
    };

    const handleDropdownLeave = () => {
        if (window.innerWidth >= 1024) {
            hoverTimeoutRef.current = setTimeout(() => {
                setActiveDropdown(null);
                setActiveSubMenu(null);
            }, 100);
        }
    };

    const handleCategoryHover = (categoryId) => {
        if (window.innerWidth >= 1024) {
            clearTimeout(hoverTimeoutRef.current);
            setActiveSubMenu(`shop-${categoryId}`);
        }
    };

    const handleCategoryLeave = () => {
        if (window.innerWidth >= 1024) {
            hoverTimeoutRef.current = setTimeout(() => {
                setActiveSubMenu(null);
            }, 100);
        }
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setActiveDropdown(null);
        setActiveSubMenu(null);
    };

    const handleLinkClick = () => {
        clearTimeout(hoverTimeoutRef.current);
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
        setActiveSubMenu(null);
    };

    const handleNavigation = (path) => {
        navigate(path);
        handleLinkClick();
    };

    const handleCartClick = () => {
        toggleCart();
        handleLinkClick();
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                clearTimeout(hoverTimeoutRef.current);
                setActiveDropdown(null);
                setActiveSubMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            clearTimeout(hoverTimeoutRef.current);
        };
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                clearTimeout(hoverTimeoutRef.current);
                setIsMobileMenuOpen(false);
                setActiveDropdown(null);
                setActiveSubMenu(null);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(hoverTimeoutRef.current);
        };
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
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
    }, [isMobileMenuOpen]);

    return (
        <nav className={`navbar ${isMobileMenuOpen ? 'menu-open' : ''}`} ref={navRef}>
            {/* Top Bar */}
            <div className="navbar-top">
                <div className="navbar-container">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
                        <img src={shamSuperStoreLogo} alt="Sham Super Store" />
                    </Link>

                    {/* Top Actions (Desktop Only) */}
                    <div className="navbar-actions">
                        <button 
                            className="action-btn"
                            onClick={() => handleNavigation('/contact')}
                        >
                            <Mail size={16} />
                            <span>support@shamsuperstore.com</span>
                        </button>
                        
                        <button 
                            className="action-btn"
                            onClick={() => handleNavigation('/my-account')}
                        >
                            <User size={16} />
                            <span>Login</span>
                        </button>
                        
                        <button 
                            className="seller-btn"
                            onClick={() => handleNavigation('/sellers')}
                        >
                            Become a seller
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button 
                        className="mobile-toggle"
                        onClick={handleMobileMenuToggle}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="navbar-main">
                <div className="navbar-container">
                    <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                        {/* Home */}
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={handleLinkClick}>
                                Home
                            </Link>
                        </li>

                        {/* Shop Mega Menu */}
                        <li 
                            className="nav-item mega-dropdown"
                            onMouseEnter={() => handleDropdownHover('shop')}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <button 
                                className="nav-link dropdown-toggle"
                                onClick={() => handleDropdownToggle('shop')}
                            >
                                Shop
                                <ChevronDown 
                                    size={16} 
                                    className={activeDropdown === 'shop' ? 'rotated' : ''} 
                                />
                            </button>
                            
                            <div className={`mega-menu ${activeDropdown === 'shop' ? 'active' : ''}`}>
                                <div className="mega-menu-content">
                                    {/* Categories List */}
                                    <div className="categories-list">
                                        <Link 
                                            to="/shop" 
                                            className="category-item featured"
                                            onClick={handleLinkClick}
                                        >
                                            All Categories
                                        </Link>
                                        
                                        {shopCategories.map((category) => (
                                            <div 
                                                key={category.id}
                                                className={`category-item ${activeSubMenu === `shop-${category.id}` ? 'active' : ''}`}
                                                onMouseEnter={() => handleCategoryHover(category.id)}
                                                onMouseLeave={handleCategoryLeave}
                                                onClick={() => handleSubMenuToggle(`shop-${category.id}`)}
                                            >
                                                <Link 
                                                    to={category.link}
                                                    className="category-link"
                                                    onClick={handleLinkClick}
                                                >
                                                    {category.name}
                                                </Link>
                                                {category.subcategories.length > 0 && (
                                                    <ChevronRight size={16} className="category-arrow" />
                                                )}
                                            </div>
                                        ))}
                                        
                                        {additionalCategories.map((category, index) => (
                                            <Link 
                                                key={index}
                                                to={category.link} 
                                                className="category-item"
                                                onClick={handleLinkClick}
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>
                                    
                                    {/* Subcategories Panel */}
                                    <div className="subcategories-panel">
                                        {shopCategories.map((category) => (
                                            <div 
                                                key={category.id}
                                                className={`subcategories-content ${activeSubMenu === `shop-${category.id}` ? 'active' : ''}`}
                                            >
                                                <h3 className="subcategories-title">{category.name}</h3>
                                                <div className="subcategories-grid">
                                                    {category.subcategories.map((sub, index) => (
                                                        <Link 
                                                            key={index}
                                                            to={sub.link} 
                                                            className="subcategory-item"
                                                            onClick={handleLinkClick}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* My Account Dropdown */}
                        <li 
                            className="nav-item dropdown"
                            onMouseEnter={() => handleDropdownHover('account')}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <button 
                                className="nav-link dropdown-toggle"
                                onClick={() => handleDropdownToggle('account')}
                            >
                                My Account
                                <ChevronDown 
                                    size={16} 
                                    className={activeDropdown === 'account' ? 'rotated' : ''} 
                                />
                            </button>
                            
                            <div className={`dropdown-menu ${activeDropdown === 'account' ? 'active' : ''}`}>
                                {accountLinks.map((link, index) => (
                                    <Link 
                                        key={index}
                                        to={link.link} 
                                        className="dropdown-item"
                                        onClick={handleLinkClick}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </li>

                        {/* About */}
                        <li className="nav-item">
                            <Link to="/about" className="nav-link" onClick={handleLinkClick}>
                                About
                            </Link>
                        </li>

                        {/* Contact */}
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link" onClick={handleLinkClick}>
                                Contact Us
                            </Link>
                        </li>

                        {/* Sellers Dropdown */}
                        <li 
                            className="nav-item dropdown"
                            onMouseEnter={() => handleDropdownHover('sellers')}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <button 
                                className="nav-link dropdown-toggle"
                                onClick={() => handleDropdownToggle('sellers')}
                            >
                                Sellers
                                <ChevronDown 
                                    size={16} 
                                    className={activeDropdown === 'sellers' ? 'rotated' : ''} 
                                />
                            </button>
                            
                            <div className={`dropdown-menu ${activeDropdown === 'sellers' ? 'active' : ''}`}>
                                {sellersLinks.map((link, index) => (
                                    <Link 
                                        key={index}
                                        to={link.link} 
                                        className="dropdown-item"
                                        onClick={handleLinkClick}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </li>

                        {/* Delivery Drivers Dropdown */}
                        <li 
                            className="nav-item dropdown"
                            onMouseEnter={() => handleDropdownHover('delivery')}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <button 
                                className="nav-link dropdown-toggle"
                                onClick={() => handleDropdownToggle('delivery')}
                            >
                                Delivery Drivers
                                <ChevronDown 
                                    size={16} 
                                    className={activeDropdown === 'delivery' ? 'rotated' : ''} 
                                />
                            </button>
                            
                            <div className={`dropdown-menu ${activeDropdown === 'delivery' ? 'active' : ''}`}>
                                {deliveryLinks.map((link, index) => (
                                    <Link 
                                        key={index}
                                        to={link.link} 
                                        className="dropdown-item"
                                        onClick={handleLinkClick}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </li>

                        {/* Cart */}
                        <li className="nav-item cart">
                            <button className="cart-btn" onClick={handleCartClick}>
                                <div className="cart-icon">
                                    <ShoppingCart size={20} />
                                    {totalItems > 0 && (
                                        <span className="cart-badge">
                                            {totalItems > 99 ? '99+' : totalItems}
                                        </span>
                                    )}
                                </div>
                            </button>
                        </li>

                        {/* Language Dropdown */}
                        <li 
                            className="nav-item dropdown"
                            onMouseEnter={() => handleDropdownHover('language')}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <button 
                                className="nav-link dropdown-toggle orange"
                                onClick={() => handleDropdownToggle('language')}
                            >
                                English
                                <ChevronDown 
                                    size={16} 
                                    className={activeDropdown === 'language' ? 'rotated' : ''} 
                                />
                            </button>
                            
                            <div className={`dropdown-menu ${activeDropdown === 'language' ? 'active' : ''}`}>
                                <Link 
                                    to="/ar" 
                                    className="dropdown-item"
                                    onClick={handleLinkClick}
                                >
                                    العربية (Arabic)
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;