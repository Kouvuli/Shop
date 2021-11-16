import express from "express";
const routes = express.Router()


routes.get('/discount', async (req, res) => {


    const state = {
        title: 'Đơn hàng',
    }


    res.render('creator/discount', { ...state, layout: 'layouts/main' })
})

routes.get('/product', async (req, res) => {


    const state = {
        title: 'Đơn hàng',
    }


    res.render('creator/product', { ...state, layout: 'layouts/main' })
})

export default routes