import userService from '../../services/userService'
const userControllers = {
    async index(req, res) {
        const { page = 1, per_page = 10 } = req.query

        const { data, total } = await userService.getUsers({ page, perPage: per_page })
        const state = {
            title: 'Người dùng',
            page,
            total,
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