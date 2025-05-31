import React, { useState, useRef, useEffect } from 'react';
import { Mail, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.scss';
import shamSuperStoreLogo from '../../assets/images/shamSuperStoreLogo.jpg'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const timeoutRef = useRef(null);
    const navRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            setActiveDropdown(null);
        }
    };

    const clearHoverTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleMouseEnter = (dropdownName) => {
        clearHoverTimeout();
        setActiveDropdown(dropdownName);
    };

    const handleMouseLeave = () => {
        clearHoverTimeout();
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 150);
    };

    const handleSubmenuMouseEnter = (e, submenuName) => {
        e.stopPropagation();
        clearHoverTimeout();
        setActiveDropdown(submenuName);
    };

    const handleSubmenuMouseLeave = () => {
        clearHoverTimeout();
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 150);
    };

    const handleMobileDropdownClick = (dropdownPath, event) => {
        if (window.innerWidth <= 768) {
            event.preventDefault();
            setActiveDropdown(activeDropdown === dropdownPath ? null : dropdownPath);
        }
    };

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
                            onMouseLeave={handleMouseLeave}
                        >
                            <a 
                                href="/shop" 
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('shop', e)}
                            >
                                Shop <ChevronDown size={16} />
                            </a>
                            <div className={`ecommerce-nav-dropdown ${activeDropdown && activeDropdown.startsWith('shop') ? 'ecommerce-nav-dropdown-active' : ''}`}>
                                <ul className="ecommerce-nav-dropdown-menu">
                                    <li><a href="/categories">All Categories</a></li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-computer')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/computer"
                                            onClick={(e) => handleMobileDropdownClick('shop-computer', e)}
                                        >
                                            Computer
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown && activeDropdown.startsWith('shop-computer') ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/desktop-computer">Desktop Computer</a></li>
                                                <li><a href="/tablet-pc">Tablet PC</a></li>
                                                <li><a href="/computer-monitor">Computer Monitor</a></li>
                                                <li><a href="/mouse-keyboard">Computer Mouse - Keyboard</a></li>
                                                <li><a href="/computer-software">Computer Software</a></li>
                                                <li><a href="/computer-accessories">Computer Accessories</a></li>

                                                <li
                                                    className="ecommerce-nav-submenu-item-has-submenu"
                                                    onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-computer-components')}
                                                    onMouseLeave={handleSubmenuMouseLeave}
                                                >
                                                    <a 
                                                        href="/computer-components"
                                                        onClick={(e) => handleMobileDropdownClick('shop-computer-components', e)}
                                                    >
                                                        Computer Components
                                                        <ChevronDown size={12} className="ecommerce-nav-arrow-right" />
                                                    </a>
                                                    <div className={`ecommerce-nav-submenu-nested ${activeDropdown === 'shop-computer-components' ? 'ecommerce-nav-submenu-nested-active' : ''}`}>
                                                        <ul>
                                                            <li><a href="/cpu">CPU</a></li>
                                                            <li><a href="/motherboard">Motherboard</a></li>
                                                            <li><a href="/harddisk">Hard Disk</a></li>
                                                            <li><a href="/memory">Memory</a></li>
                                                            <li><a href="/graphic-card">Graphic Card</a></li>
                                                            <li><a href="/power-supply">Power Supply</a></li>
                                                            <li><a href="/computer-case">Computer Case</a></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-electronics')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/electronics"
                                            onClick={(e) => handleMobileDropdownClick('shop-electronics', e)}
                                        >
                                            Electronics
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown && activeDropdown.startsWith('shop-electronics') ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/mobile-smartphone">Mobile - Smart Phone</a></li>

                                                <li
                                                    className="ecommerce-nav-submenu-item-has-submenu"
                                                    onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-electronics-wearable')}
                                                    onMouseLeave={handleSubmenuMouseLeave}
                                                >
                                                    <a 
                                                        href="/wearable-technology"
                                                        onClick={(e) => handleMobileDropdownClick('shop-electronics-wearable', e)}
                                                    >
                                                        Wearable Technology
                                                        <ChevronDown size={12} className="ecommerce-nav-arrow-right" />
                                                    </a>
                                                    <div className={`ecommerce-nav-submenu-nested ${activeDropdown === 'shop-electronics-wearable' ? 'ecommerce-nav-submenu-nested-active' : ''}`}>
                                                        <ul>
                                                            <li><a href="/smart-watches">Smart Watches</a></li>
                                                            <li><a href="/headphones">Headphones</a></li>
                                                        </ul>
                                                    </div>
                                                </li>

                                                <li><a href="/tv-video">TV and Video</a></li>
                                                <li><a href="/speakers">Speakers</a></li>
                                                <li><a href="/cameras-pictures">Cameras - Pictures</a></li>
                                                <li><a href="/movies-music">Movies - Music</a></li>
                                                <li><a href="/musical-instruments">Musical Instruments</a></li>

                                                <li
                                                    className="ecommerce-nav-submenu-item-has-submenu"
                                                    onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-electronics-office')}
                                                    onMouseLeave={handleSubmenuMouseLeave}
                                                >
                                                    <a 
                                                        href="/electronic-office"
                                                        onClick={(e) => handleMobileDropdownClick('shop-electronics-office', e)}
                                                    >
                                                        Electronic Office Equipment
                                                        <ChevronDown size={12} className="ecommerce-nav-arrow-right" />
                                                    </a>
                                                    <div className={`ecommerce-nav-submenu-nested ${activeDropdown === 'shop-electronics-office' ? 'ecommerce-nav-submenu-nested-active' : ''}`}>
                                                        <ul>
                                                            <li><a href="/copiers-printers-ink">Copiers - Printers - Ink</a></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-smarthome')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/smart-home"
                                            onClick={(e) => handleMobileDropdownClick('shop-smarthome', e)}
                                        >
                                            Smart Home
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown === 'shop-smarthome' ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/smart-lock">Smart Lock</a></li>
                                                <li><a href="/smart-lighting">Smart Lighting</a></li>
                                                <li><a href="/vacuums-mops">Vacuums - Mops</a></li>
                                                <li><a href="/plugs-outlets">Plugs - Outlets</a></li>
                                                <li><a href="/wifi-networking">WiFi - Networking</a></li>
                                                <li><a href="/detectors-sensors">Detectors - Sensors</a></li>
                                                <li><a href="/security-cameras">Security Cameras - Systems</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-furniture')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/furniture"
                                            onClick={(e) => handleMobileDropdownClick('shop-furniture', e)}
                                        >
                                            Furniture
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown && activeDropdown.startsWith('shop-furniture') ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/chair">Chair</a></li>
                                                <li><a href="/sofa">Sofa</a></li>
                                                <li><a href="/living-room">Living Room</a></li>
                                                <li><a href="/guest-room">Guest Room</a></li>
                                                <li><a href="/kids-room">Kids - Children Room</a></li>
                                                <li><a href="/dining-room">Dining Room</a></li>

                                                <li
                                                    className="ecommerce-nav-submenu-item-has-submenu"
                                                    onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-furniture-bedroom')}
                                                    onMouseLeave={handleSubmenuMouseLeave}
                                                >
                                                    <a 
                                                        href="/bedroom"
                                                        onClick={(e) => handleMobileDropdownClick('shop-furniture-bedroom', e)}
                                                    >
                                                        Bedroom
                                                        <ChevronDown size={12} className="ecommerce-nav-arrow-right" />
                                                    </a>
                                                    <div className={`ecommerce-nav-submenu-nested ${activeDropdown === 'shop-furniture-bedroom' ? 'ecommerce-nav-submenu-nested-active' : ''}`}>
                                                        <ul>
                                                            <li><a href="/mattress">Mattress</a></li>
                                                        </ul>
                                                    </div>
                                                </li>

                                                <li><a href="/study-office">Study - Home Office</a></li>
                                                <li><a href="/outdoor-furniture">Outdoor Furniture</a></li>
                                                <li><a href="/antiques">Antiques - Fine Arts</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-clothes')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/clothes"
                                            onClick={(e) => handleMobileDropdownClick('shop-clothes', e)}
                                        >
                                            Clothes
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown === 'shop-clothes' ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/womens-clothing">Women's Clothing</a></li>
                                                <li><a href="/mens-clothing">Men's Clothing</a></li>
                                                <li><a href="/girls-clothing">Girl's Clothing</a></li>
                                                <li><a href="/boys-clothing">Boy's Clothing</a></li>
                                                <li><a href="/childrens-clothing">Children's Clothing</a></li>
                                                <li><a href="/baby-clothing">Infant's - Baby's Clothing</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-shoes')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/shoes"
                                            onClick={(e) => handleMobileDropdownClick('shop-shoes', e)}
                                        >
                                            Shoes
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown === 'shop-shoes' ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/womens-shoes">Women's Shoes</a></li>
                                                <li><a href="/mens-shoes">Men's Shoes</a></li>
                                                <li><a href="/girls-shoes">Girl's Shoes</a></li>
                                                <li><a href="/boys-shoes">Boy's Shoes</a></li>
                                                <li><a href="/childrens-shoes">Children's Shoes</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-home-garden')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/home-garden"
                                            onClick={(e) => handleMobileDropdownClick('shop-home-garden', e)}
                                        >
                                            Home - Garden
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown && activeDropdown.startsWith('shop-home-garden') ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/home-appliances">Home Appliances - Electrical Tools</a></li>

                                                <li
                                                    className="ecommerce-nav-submenu-item-has-submenu"
                                                    onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-home-garden-kitchen')}
                                                    onMouseLeave={handleSubmenuMouseLeave}
                                                >
                                                    <a 
                                                        href="/kitchen"
                                                        onClick={(e) => handleMobileDropdownClick('shop-home-garden-kitchen', e)}
                                                    >
                                                        Kitchen
                                                        <ChevronDown size={12} className="ecommerce-nav-arrow-right" />
                                                    </a>
                                                    <div className={`ecommerce-nav-submenu-nested ${activeDropdown === 'shop-home-garden-kitchen' ? 'ecommerce-nav-submenu-nested-active' : ''}`}>
                                                        <ul>
                                                            <li><a href="/cooking-appliances">Cooking Appliances</a></li>
                                                            <li><a href="/kitchen-dining-appliances">Kitchen - Dining Room Appliances</a></li>
                                                            <li><a href="/kitchen-supplies">Kitchen Other Supplies</a></li>
                                                        </ul>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ecommerce-nav-submenu-item-has-submenu"
                                                    onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-home-garden-bath')}
                                                    onMouseLeave={handleSubmenuMouseLeave}
                                                >
                                                    <a 
                                                        href="/bath"
                                                        onClick={(e) => handleMobileDropdownClick('shop-home-garden-bath', e)}
                                                    >
                                                        Bath
                                                        <ChevronDown size={12} className="ecommerce-nav-arrow-right" />
                                                    </a>
                                                    <div className={`ecommerce-nav-submenu-nested ${activeDropdown === 'shop-home-garden-bath' ? 'ecommerce-nav-submenu-nested-active' : ''}`}>
                                                        <ul>
                                                            <li><a href="/bathroom-fixtures">Bathroom Fixtures</a></li>
                                                            <li><a href="/bathroom-supplies">Bathroom Supplies</a></li>
                                                        </ul>
                                                    </div>
                                                </li>

                                                <li><a href="/laundry-supplies">Laundry Supplies</a></li>
                                                <li><a href="/heating-cooling">Heating - Cooling</a></li>
                                                <li><a href="/lighting">Lighting</a></li>
                                                <li><a href="/home-audio-video">Home Audio - Video Systems</a></li>
                                                <li><a href="/storage-organization">Storage - Organization Supplies</a></li>

                                                <li
                                                    className="ecommerce-nav-submenu-item-has-submenu"
                                                    onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-home-garden-repair')}
                                                    onMouseLeave={handleSubmenuMouseLeave}
                                                >
                                                    <a 
                                                        href="/home-repair"
                                                        onClick={(e) => handleMobileDropdownClick('shop-home-garden-repair', e)}
                                                    >
                                                        Home Repair Tools
                                                        <ChevronDown size={12} className="ecommerce-nav-arrow-right" />
                                                    </a>
                                                    <div className={`ecommerce-nav-submenu-nested ${activeDropdown === 'shop-home-garden-repair' ? 'ecommerce-nav-submenu-nested-active' : ''}`}>
                                                        <ul>
                                                            <li><a href="/hand-power-tools">Hand and Power Tools</a></li>
                                                            <li><a href="/lamps-lighting">Lamps - Lighting - Fixtures</a></li>
                                                            <li><a href="/paints">Paints</a></li>
                                                            <li><a href="/building-supplies">Home Building Supplies</a></li>
                                                        </ul>
                                                    </div>
                                                </li>

                                                <li><a href="/lawn-garden">Lawn - Garden</a></li>
                                                <li><a href="/garden-supplies">Garden Supplies - Outdoor Activities</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-sports')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/sports"
                                            onClick={(e) => handleMobileDropdownClick('shop-sports', e)}
                                        >
                                            Sports - Outdoor Activities
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown === 'shop-sports' ? 'ecommerce-nav-submenu-active' : ''}`}>
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
                                        </div>
                                    </li>

                                    <li><a href="/teen-supplies">Teen Supplies</a></li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-babies-kids')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/babies-kids"
                                            onClick={(e) => handleMobileDropdownClick('shop-babies-kids', e)}
                                        >
                                            Babies - Kids - Children Supplies
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown === 'shop-babies-kids' ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/babies-supplies">Babies Supplies</a></li>
                                                <li><a href="/kids-supplies">Kids - Children Supplies</a></li>
                                                <li><a href="/children-toys">Children Toys</a></li>
                                                <li><a href="/baby-diapers">Baby Diapers</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-beauty-health')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/beauty-health"
                                            onClick={(e) => handleMobileDropdownClick('shop-beauty-health', e)}
                                        >
                                            Beauty and Health
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown === 'shop-beauty-health' ? 'ecommerce-nav-submenu-active' : ''}`}>
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
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-bags-luggage')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/bags-luggage"
                                            onClick={(e) => handleMobileDropdownClick('shop-bags-luggage', e)}
                                        >
                                            Bags - Luggage
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown === 'shop-bags-luggage' ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/handbags">Handbags</a></li>
                                                <li><a href="/shoulder-bags">Shoulder Bags</a></li>
                                                <li><a href="/luggage">Luggage</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-entertainment')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/entertainment"
                                            onClick={(e) => handleMobileDropdownClick('shop-entertainment', e)}
                                        >
                                            Entertainment
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown === 'shop-entertainment' ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/video-games">Video Games</a></li>
                                                <li><a href="/home-entertainment">Home Entertainment System</a></li>
                                                <li><a href="/vr">VR - Virtual Reality</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-food-grocery')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/food-grocery"
                                            onClick={(e) => handleMobileDropdownClick('shop-food-grocery', e)}
                                        >
                                            Food and Grocery
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown === 'shop-food-grocery' ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/gourmet-food">Gourmet Food</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-handmade')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/handmade"
                                            onClick={(e) => handleMobileDropdownClick('shop-handmade', e)}
                                        >
                                            Handmade
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown === 'shop-handmade' ? 'ecommerce-nav-submenu-active' : ''}`}>
                                            <ul>
                                                <li><a href="/arts-crafts">Arts - Crafts - Sewing</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        className="ecommerce-nav-dropdown-item-has-submenu"
                                        onMouseEnter={(e) => handleSubmenuMouseEnter(e, 'shop-pets')}
                                        onMouseLeave={handleSubmenuMouseLeave}
                                    >
                                        <a 
                                            href="/pets"
                                            onClick={(e) => handleMobileDropdownClick('shop-pets', e)}
                                        >
                                            Pets Supplies
                                            <ChevronDown size={14} className="ecommerce-nav-arrow-right" />
                                        </a>
                                        <div className={`ecommerce-nav-submenu ${activeDropdown === 'shop-pets' ? 'ecommerce-nav-submenu-active' : ''}`}>
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
                                        </div>
                                    </li>

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
                            onMouseLeave={handleMouseLeave}
                        >
                            <a 
                                href="/my-account" 
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('account', e)}
                            >
                                My Account <ChevronDown size={16} />
                            </a>
                            <div className={`ecommerce-nav-dropdown ${activeDropdown === 'account' ? 'ecommerce-nav-dropdown-active' : ''}`}>
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
                            onMouseLeave={handleMouseLeave}
                        >
                            <a 
                                href="/sellers" 
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('sellers', e)}
                            >
                                Sellers <ChevronDown size={16} />
                            </a>
                            <div className={`ecommerce-nav-dropdown ${activeDropdown === 'sellers' ? 'ecommerce-nav-dropdown-active' : ''}`}>
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
                            onMouseLeave={handleMouseLeave}
                        >
                            <a 
                                href="/delivery-drivers" 
                                className="ecommerce-nav-link"
                                onClick={(e) => handleMobileDropdownClick('delivery', e)}
                            >
                                Delivery Drivers <ChevronDown size={16} />
                            </a>
                            <div className={`ecommerce-nav-dropdown ${activeDropdown === 'delivery' ? 'ecommerce-nav-dropdown-active' : ''}`}>
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
                            onMouseLeave={handleMouseLeave}
                        >
                            <a 
                                href="#" 
                                className="ecommerce-nav-link ecommerce-nav-link-orange"
                                onClick={(e) => handleMobileDropdownClick('language', e)}
                            >
                                English <ChevronDown size={16} />
                            </a>
                            <div className={`ecommerce-nav-dropdown ${activeDropdown === 'language' ? 'ecommerce-nav-dropdown-active' : ''}`}>
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