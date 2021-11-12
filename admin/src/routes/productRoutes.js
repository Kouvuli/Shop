import express from "express";

const routes = express.Router()



routes.get('/', (req, res) => {

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

export default routes