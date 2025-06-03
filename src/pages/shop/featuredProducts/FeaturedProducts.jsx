import './FeaturedProducts.scss'

export const FeaturedProducts = () => {
    const featuredProducts = [
        {
            id: 1,
            name: "Sedlempu 1",
            image: "/api/placeholder/60/60",
            price: "$440.00"
        },
        {
            id: 2,
            name: "Quisquam",
            image: "/api/placeholder/60/60",
            price: "$800.00"
        }
    ];

    return (
        <div className="featured-products">
            <h3 className="section-title">Featured products</h3>
            <div className="products-list">
                {featuredProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <h4 className="product-name">{product.name}</h4>
                            <div className="product-pricing">
                                <span className="price">{product.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default FeaturedProducts;