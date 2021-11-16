import express from "express";
import userModel from '../models/userModel'
import productModel from '../models/productModel'
import cartModel from "../models/cartModel";
import orderModel from "../models/orderModel";
import discountModel from "../models/discountModel";

const routes = express.Router()

routes.get('/', async (req, res) => {
    // res.redirect('/login')

    // const users = await userModel.find({})
    // const products = await productModel.find({})

    // for (const user of users) {
    //     const idx = parseInt(Math.random() * products.length)
    //     const product = products[idx]
    //     const quantity = parseInt(Math.random() * product.quantity)
    //     await cartModel.create({
    //         sessionId: user._id,
    //         items: [
    //             {
    //                 productId: product._id,
    //                 price: product.currentPrice,
    //                 quantity: parseInt(Math.random() * product.quantity)
    //             }
    //         ]
    //     })
    //     await orderModel.create({
    //         userId: user._id,
    //         products: [
    //             {
    //                 productId: product._id,
    //                 price: product.currentPrice,
    //                 quantity: quantity
    //             }
    //         ],
    //         address: "Tp. Hồ Chí Minh",
    //         status: Math.random() > 0.5 ? 'pending' : 'delivered',
    //         shippedAt: new Date(),
    //         discounts: [
    //             {
    //                 name: '20/11',
    //                 value: 10,
    //             }
    //         ],
    //         totalCost: product.currentPrice * quantity * (1 - 10 / 100),
    //         payment: {}
    //     })
    // }
    // console.log({ users, products });
    // await discountModel.create({ name: "Giảm giá 30/4", value: 15, expiry: new Date(), userId: "" })
    // await discountModel.create({ name: "Giảm giá 1/5", value: 5, expiry: new Date(), userId: "" })
    // await discountModel.create({ name: "Giảm giá nhập học", value: 10, expiry: new Date(), userId: "" })
    res.render('index', { layout: 'layouts/main', title: "Dashboard" })
})

routes.get('/login', (req, res) => {

    res.render('login/index', { layout: 'layouts/main' })
})

routes.post('/login', (req, res) => {
    const { username, password } = req.body

    res.render('login/index', { layout: 'layouts/main' })
})



export default routes