import userModel from "../models/userModel"
const userService = {
    async getUserByUsername({ username = "" }) {
        const user = await userModel.findOne({ username }).lean()
        return user
    },
    async getUserByEmail({ email = "" }) {
        const user = await userModel.findOne({ email }).lean()
        return user
    },
    async getUser({ username = "", password = "" }) {
        const user = await userModel.findOne({ username, password })
        return user
    },
    async getUserById({ id = "" }) {
        const user = await userModel.findOne({ _id: id }).lean()
        delete user.password
        return user
    },
    async getUsers({ page = 1, perPage = 10 }) {
        const p = Math.max(parseInt(page), 1)
        const pp = parseInt(perPage)
        const data = await userModel.find({}).skip((pp * p) - pp).limit(pp).lean()
        const total = await userModel.countDocuments({})
        return { data, page, perPage, total }
    },
    async createNewUser({ username = "", name = "", password = "", email = "", address = "", birthday = "" }) {
        return await userModel.create({ username, name, password, email, address, birthday })
    },
    async updateResetPassword({ id = "", resetPassword = "" }) {
        return await userModel.updateOne({ _id: id, }, { resetPassword })
    },
    async updatePassword({ id = "", password = "" }) {
        return await userModel.updateOne({ _id: id, }, { password })
    },
}

export default userService