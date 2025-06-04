import './FifthHighlights.scss';
import kitchen from '../../../assets/images/home/fifthHighlights/kitchen.png'
import DIY from '../../../assets/images/home/fifthHighlights/DIY.png'
import girl from '../../../assets/images/home/fifthHighlights/girl.png'


const FifthHighlight = () => {
    return (
        <div className="fifth-highlights-wrapper">
            <div className="fifth-highlights-main">
                <div className="fifth-left-column">
                    <div className="fifth-card-container fifth-top-left">
                        <div className="fifth-content-area">
                            <h5>Smart Technology</h5>
                            <h3>Latest Gadgets</h3>
                            <button>Shop</button>
                        </div>
                        <div className="fifth-image-area">
                            <img
                                src={kitchen}
                                alt="Smart Technology"
                                className="fifth-product-image"
                            />
                        </div>
                    </div>

                    <div className="fifth-card-container fifth-bottom-left">
                        <div className="fifth-content-area">
                            <h5>Home Essentials</h5>
                            <h3>Comfort Living</h3>
                            <button>Shop</button>
                        </div>
                        <div className="fifth-image-area">
                            <img
                                src={DIY}
                                alt="Home Essentials"
                                className="fifth-product-image"
                            />
                        </div>
                    </div>
                </div>

                <div className="fifth-card-container fifth-right-large">
                    <div className="fifth-content-area">
                        <h5>Premium Collection</h5>
                        <h3>Luxury Fashion</h3>
                        <button>Shop</button>
                    </div>
                    <div className="fifth-image-area">
                        <img
                            src={girl}
                            alt="Premium Collection"
                            className="fifth-product-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FifthHighlight;