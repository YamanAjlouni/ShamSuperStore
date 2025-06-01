import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mail, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.scss';
import shamSuperStoreLogo from '../../assets/images/shamSuperStoreLogo.jpg'

const Navbar = () => {
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
        // Clear all timeouts first
        clearAllTimeouts();

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
    }, [clearAllTimeouts]);

    const handleMouseLeave = useCallback((dropdownKey) => {
        // Immediate close - no timeout
        setOpenDropdowns(prev => {
            const newState = { ...prev };
            delete newState[dropdownKey];
            return newState;
        });
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

    // Dropdown component for reusability
    const DropdownItem = ({ href, children, dropdownKey, onMouseEnter, onMouseLeave, onClick, hasSubmenu = false, submenu = null }) => (
        <li
            className={hasSubmenu ? "ecommerce-nav-dropdown-item-has-submenu" : ""}
            onMouseEnter={() => hasSubmenu && onMouseEnter(dropdownKey)}
            onMouseLeave={() => hasSubmenu && onMouseLeave(dropdownKey)}
        >
            <a
                href={href}
                onClick={(e) => hasSubmenu && onClick(dropdownKey, e)}
            >
                {children}
                {hasSubmenu && <ChevronDown size={14} className="ecommerce-nav-arrow-right" />}
            </a>
            {hasSubmenu && submenu && (
                <div className={`ecommerce-nav-submenu ${isDropdownOpen(dropdownKey) ? 'ecommerce-nav-submenu-active' : ''}`}>
                    {submenu}
                </div>
            )}
        </li>
    );

    // Nested dropdown component
    const NestedDropdownItem = ({ href, children, dropdownKey, onMouseEnter, onMouseLeave, onClick, nestedSubmenu = null }) => (
        <li
            className="ecommerce-nav-submenu-item-has-submenu"
            onMouseEnter={() => onMouseEnter(dropdownKey)}
            onMouseLeave={() => onMouseLeave(dropdownKey)}
        >
            <a
                href={href}
                onClick={(e) => onClick(dropdownKey, e)}
            >
                {children}
                <ChevronDown size={12} className="ecommerce-nav-arrow-right" />
            </a>
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
                        <img src={shamSuperStoreLogo} alt="Sham Super Store" className="ecommerce-nav-logo-img" />
                    </div>

                    <div className="ecommerce-nav-top-items">
                        <div className="ecommerce-nav-email">
                            <Mail size={16} />
                            <span>support@shamsuperstore.com</span>
                        </div>

                        <div className="ecommerce-nav-login">
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
                            <a href="/" className="ecommerce-nav-link">Home</a>
                        </li>

                        <li
                            className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                            onMouseEnter={() => handleMouseEnter('shop')}
                            onMouseLeave={() => handleMouseLeave('shop')}
                        >
                            <a
                                href="/shop"
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('shop', e)}
                            >
                                Shop <ChevronDown size={16} />
                            </a>
                            <div className={`ecommerce-nav-dropdown ${isDropdownOpen('shop') ? 'ecommerce-nav-dropdown-active' : ''}`}>
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><a href="/categories">All Categories</a></li>

                                    <DropdownItem
                                        href="/computer"
                                        dropdownKey="computer"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/desktop-computer">Desktop Computer</a></li>
                                                <li><a href="/tablet-pc">Tablet PC</a></li>
                                                <li><a href="/computer-monitor">Computer Monitor</a></li>
                                                <li><a href="/mouse-keyboard">Computer Mouse - Keyboard</a></li>
                                                <li><a href="/computer-software">Computer Software</a></li>
                                                <li><a href="/computer-accessories">Computer Accessories</a></li>

                                                <NestedDropdownItem
                                                    href="/computer-components"
                                                    dropdownKey="computer-components"
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={handleMobileDropdownClick}
                                                    nestedSubmenu={
                                                        <ul>
                                                            <li><a href="/cpu">CPU</a></li>
                                                            <li><a href="/motherboard">Motherboard</a></li>
                                                            <li><a href="/harddisk">Hard Disk</a></li>
                                                            <li><a href="/memory">Memory</a></li>
                                                            <li><a href="/graphic-card">Graphic Card</a></li>
                                                            <li><a href="/power-supply">Power Supply</a></li>
                                                            <li><a href="/computer-case">Computer Case</a></li>
                                                        </ul>
                                                    }
                                                >
                                                    Computer Components
                                                </NestedDropdownItem>
                                            </ul>
                                        }
                                    >
                                        Computer
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/electronics"
                                        dropdownKey="electronics"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/mobile-smartphone">Mobile - Smart Phone</a></li>

                                                <NestedDropdownItem
                                                    href="/wearable-technology"
                                                    dropdownKey="wearable"
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={handleMobileDropdownClick}
                                                    nestedSubmenu={
                                                        <ul>
                                                            <li><a href="/smart-watches">Smart Watches</a></li>
                                                            <li><a href="/headphones">Headphones</a></li>
                                                        </ul>
                                                    }
                                                >
                                                    Wearable Technology
                                                </NestedDropdownItem>

                                                <li><a href="/tv-video">TV and Video</a></li>
                                                <li><a href="/speakers">Speakers</a></li>
                                                <li><a href="/cameras-pictures">Cameras - Pictures</a></li>
                                                <li><a href="/movies-music">Movies - Music</a></li>
                                                <li><a href="/musical-instruments">Musical Instruments</a></li>

                                                <NestedDropdownItem
                                                    href="/electronic-office"
                                                    dropdownKey="electronic-office"
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={handleMobileDropdownClick}
                                                    nestedSubmenu={
                                                        <ul>
                                                            <li><a href="/copiers-printers-ink">Copiers - Printers - Ink</a></li>
                                                        </ul>
                                                    }
                                                >
                                                    Electronic Office Equipment
                                                </NestedDropdownItem>
                                            </ul>
                                        }
                                    >
                                        Electronics
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/smart-home"
                                        dropdownKey="smart-home"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/smart-lock">Smart Lock</a></li>
                                                <li><a href="/smart-lighting">Smart Lighting</a></li>
                                                <li><a href="/vacuums-mops">Vacuums - Mops</a></li>
                                                <li><a href="/plugs-outlets">Plugs - Outlets</a></li>
                                                <li><a href="/wifi-networking">WiFi - Networking</a></li>
                                                <li><a href="/detectors-sensors">Detectors - Sensors</a></li>
                                                <li><a href="/security-cameras">Security Cameras - Systems</a></li>
                                            </ul>
                                        }
                                    >
                                        Smart Home
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/furniture"
                                        dropdownKey="furniture"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/chair">Chair</a></li>
                                                <li><a href="/sofa">Sofa</a></li>
                                                <li><a href="/living-room">Living Room</a></li>
                                                <li><a href="/guest-room">Guest Room</a></li>
                                                <li><a href="/kids-room">Kids - Children Room</a></li>
                                                <li><a href="/dining-room">Dining Room</a></li>

                                                <NestedDropdownItem
                                                    href="/bedroom"
                                                    dropdownKey="bedroom"
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={handleMobileDropdownClick}
                                                    nestedSubmenu={
                                                        <ul>
                                                            <li><a href="/mattress">Mattress</a></li>
                                                        </ul>
                                                    }
                                                >
                                                    Bedroom
                                                </NestedDropdownItem>

                                                <li><a href="/study-office">Study - Home Office</a></li>
                                                <li><a href="/outdoor-furniture">Outdoor Furniture</a></li>
                                                <li><a href="/antiques">Antiques - Fine Arts</a></li>
                                            </ul>
                                        }
                                    >
                                        Furniture
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/clothes"
                                        dropdownKey="clothes"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/womens-clothing">Women's Clothing</a></li>
                                                <li><a href="/mens-clothing">Men's Clothing</a></li>
                                                <li><a href="/girls-clothing">Girl's Clothing</a></li>
                                                <li><a href="/boys-clothing">Boy's Clothing</a></li>
                                                <li><a href="/childrens-clothing">Children's Clothing</a></li>
                                                <li><a href="/baby-clothing">Infant's - Baby's Clothing</a></li>
                                            </ul>
                                        }
                                    >
                                        Clothes
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/shoes"
                                        dropdownKey="shoes"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/womens-shoes">Women's Shoes</a></li>
                                                <li><a href="/mens-shoes">Men's Shoes</a></li>
                                                <li><a href="/girls-shoes">Girl's Shoes</a></li>
                                                <li><a href="/boys-shoes">Boy's Shoes</a></li>
                                                <li><a href="/childrens-shoes">Children's Shoes</a></li>
                                            </ul>
                                        }
                                    >
                                        Shoes
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/home-garden"
                                        dropdownKey="home-garden"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/home-appliances">Home Appliances - Electrical Tools</a></li>

                                                <NestedDropdownItem
                                                    href="/kitchen"
                                                    dropdownKey="kitchen"
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={handleMobileDropdownClick}
                                                    nestedSubmenu={
                                                        <ul>
                                                            <li><a href="/cooking-appliances">Cooking Appliances</a></li>
                                                            <li><a href="/kitchen-dining-appliances">Kitchen - Dining Room Appliances</a></li>
                                                            <li><a href="/kitchen-supplies">Kitchen Other Supplies</a></li>
                                                        </ul>
                                                    }
                                                >
                                                    Kitchen
                                                </NestedDropdownItem>

                                                <NestedDropdownItem
                                                    href="/bath"
                                                    dropdownKey="bath"
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={handleMobileDropdownClick}
                                                    nestedSubmenu={
                                                        <ul>
                                                            <li><a href="/bathroom-fixtures">Bathroom Fixtures</a></li>
                                                            <li><a href="/bathroom-supplies">Bathroom Supplies</a></li>
                                                        </ul>
                                                    }
                                                >
                                                    Bath
                                                </NestedDropdownItem>

                                                <li><a href="/laundry-supplies">Laundry Supplies</a></li>
                                                <li><a href="/heating-cooling">Heating - Cooling</a></li>
                                                <li><a href="/lighting">Lighting</a></li>
                                                <li><a href="/home-audio-video">Home Audio - Video Systems</a></li>
                                                <li><a href="/storage-organization">Storage - Organization Supplies</a></li>

                                                <NestedDropdownItem
                                                    href="/home-repair"
                                                    dropdownKey="home-repair"
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={handleMobileDropdownClick}
                                                    nestedSubmenu={
                                                        <ul>
                                                            <li><a href="/hand-power-tools">Hand and Power Tools</a></li>
                                                            <li><a href="/lamps-lighting">Lamps - Lighting - Fixtures</a></li>
                                                            <li><a href="/paints">Paints</a></li>
                                                            <li><a href="/building-supplies">Home Building Supplies</a></li>
                                                        </ul>
                                                    }
                                                >
                                                    Home Repair Tools
                                                </NestedDropdownItem>

                                                <li><a href="/lawn-garden">Lawn - Garden</a></li>
                                                <li><a href="/garden-supplies">Garden Supplies - Outdoor Activities</a></li>
                                            </ul>
                                        }
                                    >
                                        Home - Garden
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/sports"
                                        dropdownKey="sports"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/sports-equipment">Sports Equipment</a></li>
                                                <li><a href="/exercise-fitness">Exercise - Fitness Equipment</a></li>
                                                <li><a href="/game-rooms">Game Rooms - Outdoor Games</a></li>
                                                <li><a href="/outdoor-entertainment">Outdoor Entertainment - Equipment</a></li>
                                                <li><a href="/golf">Golf</a></li>
                                                <li><a href="/hunting">Hunting</a></li>
                                                <li><a href="/cycling">Cycling</a></li>
                                                <li><a href="/fishing-boating">Fishing - Boating</a></li>
                                            </ul>
                                        }
                                    >
                                        Sports - Outdoor Activities
                                    </DropdownItem>

                                    <li><a href="/teen-supplies">Teen Supplies</a></li>

                                    <DropdownItem
                                        href="/babies-kids"
                                        dropdownKey="babies-kids"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/babies-supplies">Babies Supplies</a></li>
                                                <li><a href="/kids-supplies">Kids - Children Supplies</a></li>
                                                <li><a href="/children-toys">Children Toys</a></li>
                                                <li><a href="/baby-diapers">Baby Diapers</a></li>
                                            </ul>
                                        }
                                    >
                                        Babies - Kids - Children Supplies
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/beauty-health"
                                        dropdownKey="beauty-health"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/cosmetics-accessories">Cosmetics Accessories</a></li>
                                                <li><a href="/skin-care">Specialized Skin Care</a></li>
                                                <li><a href="/salon-spa">Salon - Spa Products</a></li>
                                                <li><a href="/vitamins">Vitamins - Other Nutrients</a></li>
                                                <li><a href="/mens-cosmetics">Men's Cosmetics Skin Care</a></li>
                                                <li><a href="/jewelry">Jewelry</a></li>
                                                <li><a href="/sunglasses">Sunglasses</a></li>
                                                <li><a href="/watches">Watches</a></li>
                                            </ul>
                                        }
                                    >
                                        Beauty and Health
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/bags-luggage"
                                        dropdownKey="bags-luggage"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/handbags">Handbags</a></li>
                                                <li><a href="/shoulder-bags">Shoulder Bags</a></li>
                                                <li><a href="/luggage">Luggage</a></li>
                                            </ul>
                                        }
                                    >
                                        Bags - Luggage
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/entertainment"
                                        dropdownKey="entertainment"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/video-games">Video Games</a></li>
                                                <li><a href="/home-entertainment">Home Entertainment System</a></li>
                                                <li><a href="/vr">VR - Virtual Reality</a></li>
                                            </ul>
                                        }
                                    >
                                        Entertainment
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/food-grocery"
                                        dropdownKey="food-grocery"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/gourmet-food">Gourmet Food</a></li>
                                            </ul>
                                        }
                                    >
                                        Food and Grocery
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/handmade"
                                        dropdownKey="handmade"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/arts-crafts">Arts - Crafts - Sewing</a></li>
                                            </ul>
                                        }
                                    >
                                        Handmade
                                    </DropdownItem>

                                    <DropdownItem
                                        href="/pets"
                                        dropdownKey="pets"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleMobileDropdownClick}
                                        hasSubmenu={true}
                                        submenu={
                                            <ul>
                                                <li><a href="/cat-food">Cat Food</a></li>
                                                <li><a href="/cat-supplies">Cat Supplies</a></li>
                                                <li><a href="/dog-food">Dog Food</a></li>
                                                <li><a href="/dog-supplies">Dog Supplies</a></li>
                                                <li><a href="/bird-food">Bird Food</a></li>
                                                <li><a href="/bird-supplies">Bird Supplies</a></li>
                                                <li><a href="/fish-supplies">Fish Aquatic Supplies</a></li>
                                                <li><a href="/other-animal-supplies">Other Animal Supplies</a></li>
                                            </ul>
                                        }
                                    >
                                        Pets Supplies
                                    </DropdownItem>

                                    <li><a href="/school-office">School - Office Supplies</a></li>
                                    <li><a href="/books">Books</a></li>
                                    <li><a href="/cars">Cars</a></li>
                                    <li><a href="/industrial">Industrial Scientific Materials</a></li>
                                </ul>
                            </div>
                        </li>

                        <li
                            className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                            onMouseEnter={() => handleMouseEnter('account')}
                            onMouseLeave={() => handleMouseLeave('account')}
                        >
                            <a
                                href="/my-account"
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('account', e)}
                            >
                                My Account <ChevronDown size={16} />
                            </a>
                            <div className={`ecommerce-nav-dropdown ${isDropdownOpen('account') ? 'ecommerce-nav-dropdown-active' : ''}`}>
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><a href="/account-details">Account Details</a></li>
                                    <li><a href="/addresses">Addresses</a></li>
                                    <li><a href="/payment-methods">Payment Methods</a></li>
                                    <li><a href="/wishlist">Wishlist</a></li>
                                    <li><a href="/saved-for-later">Saved For Later</a></li>
                                    <li><a href="/orders">Orders</a></li>
                                    <li><a href="/order-tracking">Order Tracking</a></li>
                                    <li><a href="/download">Download</a></li>
                                    <li><a href="/lost-password">Lost Password</a></li>
                                </ul>
                            </div>
                        </li>

                        <li className="ecommerce-nav-item">
                            <a href="/about" className="ecommerce-nav-link">About</a>
                        </li>

                        <li className="ecommerce-nav-item">
                            <a href="/contact" className="ecommerce-nav-link">Contact Us</a>
                        </li>

                        <li
                            className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                            onMouseEnter={() => handleMouseEnter('sellers')}
                            onMouseLeave={() => handleMouseLeave('sellers')}
                        >
                            <a
                                href="/sellers"
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('sellers', e)}
                            >
                                Sellers <ChevronDown size={16} />
                            </a>
                            <div className={`ecommerce-nav-dropdown ${isDropdownOpen('sellers') ? 'ecommerce-nav-dropdown-active' : ''}`}>
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><a href="/vendor-registration">Vendor Registration</a></li>
                                    <li><a href="/vendor-membership">Vendor Membership</a></li>
                                    <li><a href="/store-manager">Store Manager</a></li>
                                    <li><a href="/vendors-drivers-manager">Vendors Drivers Manager</a></li>
                                    <li><a href="/stores-list">Stores List</a></li>
                                </ul>
                            </div>
                        </li>

                        <li
                            className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                            onMouseEnter={() => handleMouseEnter('delivery')}
                            onMouseLeave={() => handleMouseLeave('delivery')}
                        >
                            <a
                                href="/delivery-drivers"
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('delivery', e)}
                            >
                                Delivery Drivers <ChevronDown size={16} />
                            </a>
                            <div className={`ecommerce-nav-dropdown ${isDropdownOpen('delivery') ? 'ecommerce-nav-dropdown-active' : ''}`}>
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><a href="/delivery-drivers">Delivery Drivers</a></li>
                                    <li><a href="/delivery-drivers-manager">Delivery Drivers Manager</a></li>
                                    <li><a href="/vendors-drivers-managers">Vendors Drivers Managers</a></li>
                                    <li><a href="/delivery-tracking">Delivery Tracking</a></li>
                                    <li><a href="/delivery-drivers-app">Delivery Drivers App</a></li>
                                </ul>
                            </div>
                        </li>

                        <li className="ecommerce-nav-item ecommerce-nav-item-cart">
                            <a href="/cart" className="ecommerce-nav-link ecommerce-nav-link-orange">
                                <ShoppingCart size={20} />
                            </a>
                        </li>

                        <li
                            className="ecommerce-nav-item ecommerce-nav-item-dropdown"
                            onMouseEnter={() => handleMouseEnter('language')}
                            onMouseLeave={() => handleMouseLeave('language')}
                        >
                            <a
                                href="#"
                                className="ecommerce-nav-link ecommerce-nav-link-orange"
                                onClick={(e) => handleMobileDropdownClick('language', e)}
                            >
                                English <ChevronDown size={16} />
                            </a>
                            <div className={`ecommerce-nav-dropdown ${isDropdownOpen('language') ? 'ecommerce-nav-dropdown-active' : ''}`}>
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><a href="/ar">Arabic</a></li>
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