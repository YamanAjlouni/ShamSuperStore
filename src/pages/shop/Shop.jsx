import Categories from "./categories/Categories";
import FeaturedProducts from "./featuredProducts/FeaturedProducts";
import ProductsOnSale from "./productsOnSale/ProductsOnSale";
import './Shop.scss'

const Shop = () => {
    return (
        <div className="shop-page">
            <div className="sidebar">
                <ProductsOnSale />
                <FeaturedProducts />
            </div>
            <div className="main-content">
                <Categories />
            </div>
        </div>
    );
};

export default Shop;
