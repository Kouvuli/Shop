import adminModel from "../models/adminModel";
import bcrypt from "bcryptjs";
const adminService = {
    async getAdminByUsername({ username = "" }) {
        const user = await adminModel.findOne({ username }).lean();
        return user;
    },
    async getAdminById({ id = "" }) {
        const user = await adminModel.findOne({ _id: id }).lean();
        return user;
    },
    async getAdmins({ page = 1, perPage = 10 }) {
        const p = Math.max(parseInt(page), 1);
        const pp = parseInt(perPage);
        const data = await adminModel
            .find({})
            .skip(pp * p - pp)
            .limit(pp)
            .lean();
        const total = await adminModel.countDocuments({});
        return { data, page, perPage, total };
    },
    async createNewAdmin({
        username = "",
        name = "",
        password = "",
        email = "",
        avatar = "",
    }) {
        const admin = await adminModel.findOne({ username }).lean();
        if (admin) {
            throw new Error("Username already exists");
        }
        return await adminModel.create({
            username,
            name,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            email,
            avatar,
        });
    },
    async updateAdminById({
        id = "",
        username = "",
        name = "",
        email = "",
        avatar = "",
        password = "",
    }) {
        let newData = {};
        if (username) {
            newData.username = username;
        }
        if (name) {
            newData.name = name;
        }
        if (email) {
            newData.email = email;
        }
        if (avatar) {
            newData.avatar = avatar;
        }
        if (password) {
            newData.password = bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(10)
            );
        }
        return await adminModel.findByIdAndUpdate(id, newData);
    },
};

export default adminService;
