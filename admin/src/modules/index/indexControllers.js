import adminService from '../../services/adminService'
const indexControllers = {
    async index(req, res) {
        res.render('index', { title: "Dashboard" })
    }
    ,
    async login(req, res) {
        const { failure = false } = req.query
        res.render('users/login', { failure })
    }
}

export default indexControllers