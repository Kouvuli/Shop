import express from "express";
import indexRoutes from './routes/indexRoutes'
import userRoutes from '../src/routes/userRoutes'
import productRoutes from '../src/routes/productRoutes'
import orderRoutes from '../src/routes/orderRoutes'
import creatorRoutes from '../src/routes/creatorRoutes'

const routes = express.Router()

routes.use('/', indexRoutes)
routes.use('/users', userRoutes)
routes.use('/products', productRoutes)
routes.use('/orders', orderRoutes)
routes.use('/creator', creatorRoutes)

//Catch not found ***Place end of file**
routes.use((req, res) => {
    res.render('error/index', { layout: 'layouts/main' })
})

export default routes
