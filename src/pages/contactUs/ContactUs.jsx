import { useState } from 'react';
import { Phone, Mail, Building, Facebook, Instagram, MessageCircle, PhoneCall } from 'lucide-react';
import './ContactUs.scss';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                {/* Contact Info Cards Section */}
                <div className="contact-info-section">
                    <div className="contact-info-grid">
                        {/* Phone Card */}
                        <a href='tel:10012345678' className="contact-info-card">
                            <div className="info-icon">
                                <Phone size={40} />
                            </div>
                            <h3 className="info-title">1-001-234-5678</h3>
                            <p className="info-subtitle">Mon-Sat: 8:00 - 21:00</p>
                        </a>

                        {/* Email Card */}
                        <div className="contact-info-card">
                            <div className="info-icon">
                                <Mail size={40} />
                            </div>
                            <h3 className="info-title">support@shamsuperstore.com</h3>
                            <p className="info-subtitle">24/7 Customer support</p>
                        </div>

                        {/* Address Card */}
                        <div className="contact-info-card">
                            <div className="info-icon">
                                <Building size={40} />
                            </div>
                            <h3 className="info-title">3 Rockaway St., New Rochelle, NY 10801</h3>
                            <p className="info-subtitle">Main office location</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="contact-form-section">
                    <div className="form-header">
                        <h2 className="form-title">Questions?</h2>
                        <p className="form-description">
                            If you have any question, please don't hesitate to contact us
                        </p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">
                                Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="name"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Email <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Message"
                                className="form-textarea"
                                rows="6"
                            />
                        </div>

                        <button type="submit" className="form-submit-btn">
                            Send
                        </button>
                    </form>
                </div>

                {/* Social Media Section */}
                <div className="social-media-section">
                    <div className="social-icons">
                        <a href="#" className="social-icon facebook">
                            <Facebook size={24} />
                        </a>
                        <a href="#" className="social-icon instagram">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="social-icon whatsapp">
                            <MessageCircle size={24} />
                        </a>
                        <a href="tel:10012345678" className="social-icon phone">
                            <PhoneCall size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;