import express from "express";

const routes = express.Router()


routes.get('/', (req, res) => {
    const { page = 1, per_page = 10 } = req.query
    const state = {
        title: 'Người dùng',
        page: page,
        perPage: per_page,
        data: Array.from({ length: 10 }, (_, index) => index + 1),
        header: ["Tên người dùng", "Tên đăng nhập", "Email", "Giới tính", "Địa chỉ"]
    }

    res.render('users/index', { ...state, layout: 'layouts/main' })
})

export default routes