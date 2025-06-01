import './SecondHighlights.scss'

export const SecondHighlights = () => {
    return (
        <div className="secondHighlights-out-container">
            <div className='secondHighlights-container'>
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