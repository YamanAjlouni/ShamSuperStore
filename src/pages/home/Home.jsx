import Categories from './categories/Categories'
import { FirstHighlights } from './firstHighlights/FirstHighlights'
import { Intro } from './intro/Intro'
import NewProducts from './newProducts/NewProducts'

export const Home = () => {
    return (
        <div>
            <Intro />
            <NewProducts />
            <Categories />
            <FirstHighlights />
        </div>
    )
}
