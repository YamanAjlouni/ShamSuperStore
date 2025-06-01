import BestSellerClothing from './bestSellerClothing/BestSellerClothing'
import BestSellerComputers from './bestSellerComputers/BestSellerComputers'
import Categories from './categories/Categories'
import FeaturedProducts from './featuredProducts/FeaturedProducts'
import { FirstHighlights } from './firstHighlights/FirstHighlights'
import { Intro } from './intro/Intro'
import NewProducts from './newProducts/NewProducts'
import { SecondHighlights } from './secondHighlights/SecondHighlights'
import TopRatedProducts from './topRatedProducts/TopRatedProducts'

export const Home = () => {
    return (
        <div>
            <Intro />
            <NewProducts />
            <Categories />
            <FirstHighlights />
            <BestSellerClothing />
            <BestSellerComputers />
            <SecondHighlights />
            <FeaturedProducts />
            <TopRatedProducts />
        </div>
    )
}
