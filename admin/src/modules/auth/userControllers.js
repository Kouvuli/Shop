import userService from '../../services/userService'
const userControllers = {
    async index(req, res) {
        const { page = 1, perPage = 4 } = req.query

        const { data, total } = await userService.getUsers({ page, perPage })
        const state = {
            title: 'Người dùng',
            page,
            total,
            perPage,
            data,
            header: ["Tên người dùng", "Tên đăng nhập", "Email", "Địa chỉ", "Ngày sinh"]
        }
        res.render('users/index', { ...state, pagination: { page, limit: Math.ceil(total / perPage), perPage: perPage } })
    },

    async login(req, res) {

        res.render('users/login')
    }
}

export default userControllers