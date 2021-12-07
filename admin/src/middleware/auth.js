import adminService from "../services/adminService";
const auth = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const user = await adminService.getAdminById({ id: req.user })
        res.locals.user = user
        next()
    } else {
        res.redirect('/login')
    }
}

export default auth