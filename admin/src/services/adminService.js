import adminModel from "../models/adminModel"
const adminService = {
    async getAdminByUsername({ username = "" }) {
        const user = await adminModel.findOne({ username }).lean()
        return user
    },
    async getAdmin({ username = "", password = "" }) {
        const user = await adminModel.findOne({ username, password }).lean()
        return user
    },
    async getAdminById({ id = "" }) {
        const user = await adminModel.findOne({ _id: id }).lean()
        return user
    },
    async getAdmins({ page = 1, perPage = 10 }) {
        const p = Math.max(parseInt(page), 1)
        const pp = parseInt(perPage)
        const data = await adminModel.find({}).skip((pp * p) - pp).limit(pp).lean()
        const total = await adminModel.countDocuments({})
        return { data, page, perPage, total }
    },
    async createNewAdmin({ username = "", name = "", password = "", email = "" }) {
        const admin = await adminModel.findOne({ username }).lean()
        if (admin) {
            throw new Error('Username already exists')
        }
        return await adminModel.create({ username, name, password, email })
    },
}

export default adminService