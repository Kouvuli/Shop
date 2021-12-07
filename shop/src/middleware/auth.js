import userService from '../services/userService'
const auth = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const user = await userService.getUserById({ id: req.user })
        res.locals.user = user
        next()
    } else {
        next()
    }
}

export const authRedirect = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/auth/login')
    }
}

export default auth