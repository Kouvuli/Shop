import userModel from "../models/userModel"
const userService = {
    async getUserByUsername({ username = "" }) {
        const user = await userModel.findOne({ username })
        return user
    },
    async getUser({ username = "", password = "" }) {
        const user = await userModel.findOne({ username, password })
        return user
    },
    async getUserById({ id = "" }) {
        const user = await userModel.findOne({ _id: id }).lean()
        return user
    },
    async getUsers({ page = 1, perPage = 10 }) {
        const p = Math.max(parseInt(page), 1)
        const pp = Math.max(parseInt(perPage), 10)
        const data = await userModel.find({}).skip((pp * p) - pp).limit(pp).lean()
        const total = await userModel.countDocuments({})
        return { data, page, perPage, total }
    },
    async createNewUser({ username = "", name = "", password = "", email = "", address = "", birthday = "" }) {
        return await userModel.create({ username, name, password, email, address, birthday })
    },
}

export default userService