import express from "express";

const routes = express.Router()



routes.get('/', (req, res) => {

    const { page = 1, per_page = 10 } = req.query
    const state = {
        title: 'Sản phẩm',
        page: page,
        perPage: per_page,
        data: Array.from({ length: 10 }, (_, index) => index + 1),
        header: ["Hình ảnh", "Tên sản phẩm", "Danh mục", "Hãng sản xuất", "Giá nhập", "Giá bán", "Mô tả"]
    }

    res.render('products/index', { ...state, layout: 'layouts/main' })
})

routes.get('/top', (req, res) => {

    const { page = 1, per_page = 10 } = req.query
    const state = {
        title: 'Top 10 sản phẩm bán chạy nhất',
        page: page,
        perPage: per_page,
        data: Array.from({ length: 10 }, (_, index) => index + 1),
        header: ["Hình ảnh", "Tên sản phẩm", "Danh mục", "Hãng sản xuất", "Giá nhập", "Giá bán", "Mô tả"]
    }

    res.render('products/top', { ...state, layout: 'layouts/main' })
})

export default routes