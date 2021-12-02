import _ from 'lodash'
import adminService from '../../services/adminService'
import bcrypt from 'bcryptjs'
const userControllers = {
    async index(req, res) {
        const { page = 1, perPage = 10 } = req.query

        const { data, total } = await adminService.getAdmins({ page, perPage })
        const state = {
            title: 'Danh sách quản trị',
            page,
            total,
            perPage,
            data,
            header: ["Tên người dùng", "Tên đăng nhập", "Email", "Ngày tạo"]
        }
        res.render('admin/index', { ...state, pagination: { page, limit: Math.ceil(total / perPage), perPage: perPage } })
    },

    async createAdmin(req, res) {
        const { exist = false, success = false } = req.query
        try {
            if (!_.isEmpty(req.body)) {
                const { username, password, email, name } = req.body
                await adminService.createNewAdmin({ username, name, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)), email })
                return res.redirect('create?success=true')

            }
            res.render('admin/create', { exist, success })
        } catch (e) {
            return res.redirect('create?exist=true')
        }
    }


}

export default userControllers