import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
const userService = {
    async getUserByUsername({ username = "" }) {
        const user = await userModel.findOne({ username }).lean();
        return user;
    },
    async getUserById({ id = "" }) {
        const user = await userModel.findOne({ _id: id }).lean();
        return user;
    },
    async getUsers({ page = 1, perPage = 10 }) {
        const p = Math.max(parseInt(page), 1);
        const pp = parseInt(perPage);
        const data = await userModel
            .find({})
            .skip(pp * p - pp)
            .limit(pp)
            .lean();
        const total = await userModel.countDocuments({});
        return { data, page, perPage, total };
    },
    async blockToggleByUserId(id) {
        const prev = await userModel.findById(id);
        prev.active = !prev.active;
        await prev.save();
        const user = await userModel.findById(id);
        return user;
    },
};

export default userService;
