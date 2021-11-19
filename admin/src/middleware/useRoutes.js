import indexRoutes from '../modules/index/indexRoutes'
import userRoutes from '../modules/auth/userRoutes'
import productRoutes from '../modules/product/productRoutes'
import orderRoutes from '../modules/order/orderRoutes'
import discountRoutes from '../modules/discount/discountRoutes'
import auth from "../middleware/auth";

const useRoutes = (app) => {
    app.use('/', indexRoutes)
    app.use('/users', auth, userRoutes)
    app.use('/products', auth, productRoutes)
    app.use('/orders', auth, orderRoutes)
    app.use('/discounts', auth, discountRoutes)
    //Catch not found ***Place end of file**
    app.use((req, res) => {
        res.render('error/index')
    })
}



export default useRoutes
