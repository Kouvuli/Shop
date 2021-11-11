import express from "express";

const routes = express.Router()


routes.get('/', (req, res) => {

    res.render('index')
})
routes.get('/users', (req, res) => {
    const { page = 1, per_page = 10 } = req.query
    const state = {
        title: 'Người dùng',
        page: page,
        perPage: per_page,
        data: Array.from({ length: 600 }, (_, index) => index + 1),
        header: ["Tên người dùng", "Tên đăng nhập", "Email", "Giới tính", "Địa chỉ"]
    }

    res.render('users/index', { ...state })
})

routes.get('/products', (req, res) => {

    const { page = 1, per_page = 10 } = req.query
    const state = {
        title: 'Sản phẩm',
        page: page,
        perPage: per_page,
        data: Array.from({ length: 600 }, (_, index) => index + 1),
        header: ["Hình ảnh", "Tên sản phẩm", "Danh mục", "Hãng sản xuất", "Giá nhập", "Giá bán", "Mô tả"]
    }

    res.render('products/index', { ...state })
})
routes.get('/orders', (req, res) => {

    const { page = 1, per_page = 10 } = req.query
    const state = {
        title: 'Đơn hàng',
        page: page,
        perPage: per_page,
        data: Array.from({ length: 600 }, (_, index) => index + 1),
        header: ["Mã đơn hàng", "Tên người mua", "Đơn giá", "Khuyến mãi", "Phải thanh toán", "Tình trạng"]
    }

    res.render('orders/index', { ...state })
})
export default routes