import './SixthHighlights.scss'
import laptop from '../../../assets/images/home/sixthHighlights/laptop.png'
import homeMade from '../../../assets/images/home/sixthHighlights/homeMade.png'
import baby from '../../../assets/images/home/sixthHighlights/baby.png'

export const SixthHighlights = () => {
    return (
        <div className="sixthHighlights-out-container">
            <div className='sixthHighlights-container'>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            New Look
                        </h5>
                        <h3>
                            Best Sellers in Computers
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
                            New Look
                        </h5>
                        <h3>
                            Shop Homemade Products
                        </h3>
                        <button>
                            Shop
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={homeMade} alt="" />
                    </div>
                </div>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            On Sale
                        </h5>
                        <h3>
                            Baby Supplies
                        </h3>
                        <button>
                            Shop
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={baby} alt="tea" />
                    </div>
                </div>
            </div>
        </div>
    )
}
