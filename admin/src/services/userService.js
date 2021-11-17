import userModel from "../models/userModel"
const userService = {

    async getUser({ username = "", password = "" }) {
        const user = await userModel.find({ username, password })
        return user
    },
    async getUserById({ id = "" }) {
        const user = await userModel.findById(id).lean()
        return user
    },
    async getUsers({ page = 1, perPage = 10 }) {
        const p = parseInt(page)
        const pp = parseInt(perPage)
        const data = await userModel.find({}).skip((pp * p) - pp).limit(pp).lean()
        const total = await userModel.countDocuments({})
        return { data, page, perPage, total }
    },
    async createNewUser({ username = "", name = "", password = "", email = "", address = "", birthday = "" }) {
        return await userModel.create({ username, name, password, email, address, birthday })
    },
}

export default userService