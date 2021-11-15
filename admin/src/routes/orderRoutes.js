import express from "express";

const routes = express.Router()


routes.get('/', (req, res) => {

    const { page = 1, per_page = 10 } = req.query
    const state = {
        title: 'Đơn hàng',
        page: page,
        perPage: per_page,
        data: Array.from({ length: 10 }, (_, index) => index + 1),
        header: ["Mã đơn hàng", "Tên người mua", "Đơn giá", "Khuyến mãi", "Phải thanh toán", "Tình trạng"]
    }

    res.render('orders/index', { ...state, layout: 'layouts/main' })
})

export default routes