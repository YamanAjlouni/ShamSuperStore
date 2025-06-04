import './FourthHighlights.scss'

export const FourthHighlights = () => {
    return (
        <div className="fourthHighlights-out-container">
            <div className='fourthHighlights-container'>
                <div className='product-out-container left-section'>
                    <div className='content-overlay right-content'>
                        <h2>Up to 50% off</h2>
                        <h3>Items on Sale</h3>
                        <div>
                            <button>Shop now</button>
                        </div>
                    </div>
                </div>
                <div className='product-out-container right-section'>
                    <div className='content-overlay left-content'>
                        <h2>Up to 50% off</h2>
                        <h3>Items on Sale</h3>
                        <div>
                            <button>Shop now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FourthHighlights;