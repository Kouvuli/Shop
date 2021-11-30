import indexRoutes from '../modules/index/indexRoutes'
import userRoutes from '../modules/auth/userRoutes'
import productRoutes from '../modules/product/productRoutes'
import orderRoutes from '../modules/order/orderRoutes'
import discountRoutes from '../modules/discount/discountRoutes'
import auth from "../middleware/auth";

const useRoutes = (app) => {
    app.use('/', indexRoutes)
    app.use('/users', userRoutes)
    app.use('/products', productRoutes)
    app.use('/orders', orderRoutes)
    app.use('/discounts', discountRoutes)
    //Catch not found ***Place end of file**
    app.use((req, res) => {
        res.render('error/index')
    })
}



export default useRoutes
