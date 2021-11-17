import userModel from "../../models/userModel";

const userControllers = {
    async index(req, res) {
        const { page = 1, per_page = 10 } = req.query

        const data = await userModel.find({})
        const state = {
            title: 'Người dùng',
            page: page,
            perPage: per_page,
            data,
            header: ["Tên người dùng", "Tên đăng nhập", "Email", "Địa chỉ", "Ngày sinh"]
        }
        res.render('users/index', { ...state, layout: 'layouts/main' })
    },

    async login(req, res) {

        res.render('users/login', { layout: 'layouts/main' })
    }
}

export default userControllers