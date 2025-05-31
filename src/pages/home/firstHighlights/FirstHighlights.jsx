import './FirstHighlights.scss'
import bicycle from '../../../assets/images/home/firstHighlights/bicycle.png'
import laptop from '../../../assets/images/home/firstHighlights/laptop.png'
import art from '../../../assets/images/home/firstHighlights/art.png'

export const FirstHighlights = () => {
    return (
        <div className="firstHighlights-out-container">
            <div className='firstHighlights-container'>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            New Look
                        </h5>
                        <h3>
                            Best in bicycles
                        </h3>
                        <button>
                            Shop
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={bicycle} alt="" />
                    </div>
                </div>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            40% off
                        </h5>
                        <h3>
                            Laptop andcomputers
                        </h3>
                        <button>
                            Shop
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={laptop} alt="" />
                    </div>
                </div>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            Latest products
                        </h5>
                        <h3>
                            Arts and Accessories
                        </h3>
                        <button>
                            Shop
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={art} alt="tea" />
                    </div>
                </div>
            </div>
        </div>
    )
}
