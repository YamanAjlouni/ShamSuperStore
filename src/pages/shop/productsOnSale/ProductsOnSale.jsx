import './ProductsOnSale.scss';

export const ProductsOnSale = () => {
    const saleProducts = [
        {
            id: 1,
            name: "Computer Case B-650",
            image: "/api/placeholder/60/60",
            originalPrice: "$169.00",
            salePrice: "$79.99"
        },
        {
            id: 2,
            name: "Computer Case B-18",
            image: "/api/placeholder/60/60",
            originalPrice: "$149.00",
            salePrice: "$69.00"
        },
        {
            id: 3,
            name: "Numquam eius",
            image: "/api/placeholder/60/60",
            originalPrice: "$500.00",
            salePrice: "$350.00"
        },
        {
            id: 4,
            name: "Et molestiae",
            image: "/api/placeholder/60/60",
            originalPrice: "$750.00",
            salePrice: "$500.00"
        },
        {
            id: 5,
            name: "Architecto beatae",
            image: "/api/placeholder/60/60",
            originalPrice: "$400.00",
            salePrice: "$350.00"
        }
    ];

    return (
        <div className="products-on-sale">
            <h3 className="section-title">Products on-sale</h3>
            <div className="products-list">
                {saleProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <h4 className="product-name">{product.name}</h4>
                            <div className="product-pricing">
                                <span className="original-price">{product.originalPrice}</span>
                                <span className="sale-price">{product.salePrice}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsOnSale;