import logModel from "../models/logModel";
import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
const userService = {
    async getUserByUsername({ username = "" }) {
        const user = await userModel.findOne({ username }).lean();
        return user;
    },
    async getUserByEmail({ email = "" }) {
        const user = await userModel.findOne({ email }).lean();
        return user;
    },
    async getUserById({ id = "" }) {
        const user = await userModel.findOne({ _id: id }).lean();
        delete user.password;
        return user;
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
                resetPassword: bcrypt.hashSync(
                    resetPassword,
                    bcrypt.genSaltSync(10)
                ),
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
