import logModel from "../models/logModel";
import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
const userService = {
    async getUserByUsername({ username = "" }) {
        const user = await userModel.findOne({ username, active: true }).lean();
        return user;
    },
    async activeById({ id }) {
        return await userModel.findByIdAndUpdate(id, { active: true });
    },
    async getUserByEmail({ email = "" }) {
        const user = await userModel.findOne({ email }).lean();
        return user;
    },
    async getUserById({ id = "" }) {
        try {
            const user = await userModel.findOne({ _id: id }).lean();
            return user;
        } catch (e) {
            return null;
        }
    },
    async createNewUser({
        username = "",
        name = "",
        password = "",
        email = "",
        address = "",
        birthday = "",
    }) {
        return await userModel.create({
            username,
            name,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            email,
            address,
            birthday,
        });
    },
    async updateResetPassword({ id = "", resetPassword = "" }) {
        return await userModel.updateOne(
            { _id: id },
            {
                resetPassword,
            }
        );
    },
    async updatePassword({ id = "", password = "" }) {
        return await userModel.updateOne({ _id: id }, { password });
    },

    async updateUser({
        id = "",
        name = "",
        username = "",
        email = "",
        address = "",
        birthday = "",
    }) {
        await userModel.updateOne(
            { _id: id },
            {
                name: name,
                username: username,
                email: email,
                address: address,
                birthday: birthday,
            }
        );
        return { name, username, email, birthday, address };
    },
};

export default userService;
