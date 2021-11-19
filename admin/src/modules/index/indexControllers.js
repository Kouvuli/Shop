import userService from '../../services/userService'

const indexControllers = {
    async index(req, res) {
        console.log({ user: req.user });

        res.render('index', { title: "Dashboard" })
    }
    ,
    async login(req, res) {
        res.render('users/login')
    }
}

export default indexControllers