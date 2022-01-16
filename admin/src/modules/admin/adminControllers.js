import _ from "lodash";
import adminService from "../../services/adminService";
import bcrypt from "bcryptjs";
import firebaseService from "../../services/firebaseService";

const adminControllers = {
    async index(req, res) {
        const { page = 1, perPage = 10 } = req.query;

        const { data, total } = await adminService.getAdmins({ page, perPage });
        const state = {
            title: "Danh sách quản trị",
            page,
            total,
            perPage,
            data,
            header: ["Tên quản trị", "Tên đăng nhập", "Email", "Ngày tạo"],
        };
        res.render("admin/index", {
            ...state,
            pagination: {
                page,
                limit: Math.ceil(total / perPage),
                perPage: perPage,
            },
        });
    },

    async createAdmin(req, res) {
        const { exist = false, success = false } = req.query;
        const title = "Thêm quản trị viên";
        try {
            if (!_.isEmpty(req.body)) {
                const { username, password, email, name } = req.body;
                const avatar = await firebaseService.uploadFile(req.file);
                await adminService.createNewAdmin({
                    username,
                    name,
                    password,
                    email,
                    avatar,
                });
                return res.redirect("create?success=true");
            }
            res.render("admin/create", { exist, success, title });
        } catch (e) {
            return res.redirect("create?exist=true");
        }
    },
    async getById(req, res) {
        const { id } = req.params;
        const data = await adminService.getAdminById({ id });
        res.render("admin/detail", { data, title: data.name });
    },
    async editAdmin(req, res) {
        const { exist = false, success = false } = req.query;
        const title = "Chỉnh sửa thông tin cá nhân";
        try {
            const data = await adminService.getAdminById({ id: req.user });

            if (!_.isEmpty(req.body)) {
                const { username, password, email, name } = req.body;
                const avatar = req.file
                    ? await firebaseService.uploadFile(req.file)
                    : "";
                await adminService.updateAdminById({
                    id: data?._id,
                    username,
                    name,
                    password,
                    email,
                    avatar,
                });
                return res.redirect("edit?success=true");
            }

            res.render("admin/edit", { exist, success, title, data });
        } catch (e) {
            return res.redirect("edit?exist=true");
        }
    },
};

export default adminControllers;
