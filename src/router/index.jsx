import {createHashRouter} from 'react-router-dom';
import TopBar from '../layouts/TopBar';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import ProductPage from '../pages/ProductPage';
import About from '../pages/About';

const index=createHashRouter([
    {
        path:'/',
        element: <TopBar></TopBar>,
        children:[
            {
                path:'',
                element: <HomePage></HomePage>
            },
            {
                path:'products',
                element: <ProductPage></ProductPage>
            },
            {
                path:'carts',
                element: <CartPage></CartPage>
            },
            {
                path:'about',
                element: <About></About>
            }
        ]
    }
])

export default index;