import express from "express";
import indexRoutes from './routes/indexRoutes'
import userRoutes from './modules/auth/userRoutes'
import productRoutes from './modules/product/productRoutes'
import orderRoutes from './modules/order/orderRoutes'
import discountRoutes from './modules/discount/discountRoutes'
const routes = express.Router()

routes.use('/', indexRoutes)
routes.use('/users', userRoutes)
routes.use('/products', productRoutes)
routes.use('/orders', orderRoutes)
routes.use('/discounts', discountRoutes)
//Catch not found ***Place end of file**
routes.use((req, res) => {
    res.render('error/index', { layout: 'layouts/main' })
})

export default routes
